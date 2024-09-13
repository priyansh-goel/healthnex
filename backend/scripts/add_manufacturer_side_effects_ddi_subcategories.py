import csv
import uuid
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import (
    SideEffect,
    DrugInteraction,
    Manufacturer,
)  # Assuming these are your ORM models

# Initialize database connection (update with your actual DB connection)
DATABASE_URL = "postgresql://rDGJeEDqAz:XsPQhCoEfOQZueDjsILetLDUvbvSxAMnrVtgVZpmdcSssUgbvs@localhost:5455/default_db"  # Replace with your actual database URL
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()


# Function to process the CSV and insert data into the database
def process_csv_and_insert(csv_file_path):
    # Open the CSV file
    with open(csv_file_path, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        side_effects_set = set()
        drug_interactions_set = set()
        subcategories_set = set()
        manufacturers_set = set()

        # Iterate through each row of the CSV
        for row in reader:
            # Gather subcategory
            subcategories_set.add(row["sub_category"])

            # Gather manufacturer
            manufacturers_set.add(row["product_manufactured"])

            # Parse side effects (they are comma-separated)
            side_effects_list = row["side_effects"].split(",")
            for effect in side_effects_list:
                side_effects_set.add(effect.strip())

            # Parse drug interactions (they are stored in JSON-like format in the CSV)
            drug_interactions = eval(row["drug_interactions"])
            for drug in drug_interactions["drug"]:
                drug_interactions_set.add(drug.strip())

        # Insert the data into the database
        add_side_effects(side_effects_set)
        add_drug_interactions(drug_interactions_set)
        add_manufacturers(manufacturers_set)


# Helper Functions for Database Insertion
def add_side_effects(side_effects_set):
    for effect in side_effects_set:
        existing_effect = (
            session.query(SideEffect).filter_by(description=effect).first()
        )
        if not existing_effect:
            new_effect = SideEffect(id=str(uuid.uuid4()), description=effect)
            session.add(new_effect)
    session.commit()
    print(f"Inserted {len(side_effects_set)} side effects.")


def add_drug_interactions(interactions_set):
    for interaction in interactions_set:
        existing_interaction = (
            session.query(DrugInteraction)
            .filter_by(interaction_description=interaction)
            .first()
        )
        if not existing_interaction:
            new_interaction = DrugInteraction(
                id=str(uuid.uuid4()), interaction_description=interaction
            )
            session.add(new_interaction)
    session.commit()
    print(f"Inserted {len(interactions_set)} drug interactions.")


def add_manufacturers(manufacturers_set):
    for manufacturer in manufacturers_set:
        existing_manufacturer = (
            session.query(Manufacturer).filter_by(name=manufacturer).first()
        )
        if not existing_manufacturer:
            new_manufacturer = Manufacturer(name=manufacturer)
            session.add(new_manufacturer)
    session.commit()
    print(f"Inserted {len(manufacturers_set)} manufacturers.")


# Call the function with the path to your CSV file
csv_file_path = "../data/medicine_data.csv"
process_csv_and_insert(csv_file_path)
