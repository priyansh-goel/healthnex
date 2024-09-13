import csv
import json

import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import (
    Medication,
    SideEffect,
    DrugInteraction,
    Manufacturer,
    DrugSubstitution,
)


DATABASE_URL = "postgresql://rDGJeEDqAz:XsPQhCoEfOQZueDjsILetLDUvbvSxAMnrVtgVZpmdcSssUgbvs@localhost:5455/default_db"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

data2_path = "../data/updated_medicine_dataset.csv"
data2 = csv.DictReader(open(data2_path))


def search_csv(file_path, column_name, search_value):
    df = pd.read_csv(file_path)
    result = df.loc[df[column_name] == search_value]

    if not result.empty:
        return result
    else:
        return None


def add_medication_data(file_path):
    # Set to keep track of unique product names
    processed_products = set()
    new_medications = []  # List to batch insert medications later

    # Read CSV file
    with open(file_path, "r") as file:
        reader = csv.DictReader(file)

        for i, row in enumerate(reader):
            manufacturer_id = get_manufacturer_id(row["product_manufactured"])
            side_effects = get_side_effects(row["side_effects"])
            drug_interaction = get_drug_interactions(row["drug_interactions"])
            product_name = row["product_name"].strip()
            drug_subs = get_substitutions(product_name)

            product_price = (
                float(row["product_price"][1:]) if row["product_price"] != "" else 0.0
            )

            # Search for habit_forming value in the secondary dataset
            search_result = search_csv(data2_path, "name", product_name)

            # If no result is found, default the habit_forming to False or handle as needed
            habit_forming = (
                search_result["Habit Forming"].iloc[0]
                if search_result is not None
                else False
            )

            if product_name in processed_products:
                print(f"Skipping duplicate: {product_name}")
                continue

            # Create Medication instance
            new_med = Medication(
                product_name=product_name,
                salt_composition=row["salt_composition"],
                product_price=product_price,
                habit_forming=habit_forming,  # Use the habit_forming value
                manufacturer_id=manufacturer_id,
            )

            # Add manufacturer and medication to the session
            manufacturer = session.get(Manufacturer, manufacturer_id)
            if manufacturer:
                new_med.manufacturer = (
                    manufacturer  # Associate with existing manufacturer
                )

            # Add side effects, drug interactions, and substitutions
            new_med.side_effects = side_effects
            new_med.drug_interactions = drug_interaction
            new_med.substitutions = drug_subs

            # Add medication to the session
            session.add(new_med)

            processed_products.add(product_name)
            print(f"Added medication: {product_name} ({i})")

        # Commit all changes
        session.commit()
        print(f"Added {len(processed_products)} medications.")


def get_manufacturer_id(manufacturer_name):
    """Get manufacturer_id from the name, or create a new one if it doesn't exist."""
    manufacturer = session.query(Manufacturer).filter_by(name=manufacturer_name).first()
    if not manufacturer:
        # Create a new manufacturer
        new_manufacturer = Manufacturer(name=manufacturer_name)
        session.add(new_manufacturer)
        session.commit()
        return new_manufacturer.id
    return manufacturer.id


def get_side_effects(side_effects_string):
    """Get side effect IDs from the comma-separated string."""
    side_effects_list = side_effects_string.split(",")
    side_effects = []
    for effect in side_effects_list:
        effect = effect.strip()  # Trim any extra spaces
        side_effect = session.query(SideEffect).filter_by(description=effect).first()
        if not side_effect:
            new_side_effect = SideEffect(description=effect)
            session.add(new_side_effect)
            session.commit()
            side_effects.append(new_side_effect)
        else:
            side_effects.append(side_effect)
    return side_effects


def get_drug_interactions(drug_interactions_string):
    """Get drug interaction IDs from the JSON string."""
    interactions = json.loads(drug_interactions_string)
    drug_interactions = []
    for interaction_desc in interactions["drug"]:
        interaction = (
            session.query(DrugInteraction)
            .filter_by(interaction_description=interaction_desc)
            .first()
        )
        if not interaction:
            # Create a new drug interaction
            new_interaction = DrugInteraction(interaction_description=interaction_desc)
            session.add(new_interaction)
            session.commit()
            drug_interactions.append(new_interaction)
        else:
            drug_interactions.append(interaction)
    return drug_interactions


def get_substitutions(product_name):
    """Get substitution IDs from the JSON string."""
    row = search_csv(data2_path, "name", product_name)

    if row is None:
        return []

    substitutions = row["Substitutions"].split(",")
    new_subs = list()

    for sub in substitutions:
        new_sub = DrugSubstitution(name=product_name)
        new_sub.medications = get_medications(sub)
        new_subs.append(DrugSubstitution(name=product_name))

    return new_subs


def get_medications(name):
    """Get Medication objects based on the name."""
    medications = session.query(Medication).filter_by(product_name=name).all()
    return medications


if __name__ == "__main__":
    add_medication_data("../data/medicine_data.csv")
