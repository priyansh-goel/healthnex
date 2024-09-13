import asyncio

import httpx
from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base, Practitioner, Patient
from app.schemas.patient import Gender
from app.schemas.practitioner import Speciality

# DATABASE_URL = "postgresql://rDGJeEDqAz:XsPQhCoEfOQZueDjsILetLDUvbvSxAMnrVtgVZpmdcSssUgbvs@localhost:5455/default_db"
DATABASE_URL = "postgresql://healthnex:healthnex123@139.59.40.43:5432/healthnex"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

user_ids = []


async def register_user(email: str, password: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"http://127.0.0.1:8000/auth/register",
            json={"email": email, "password": password},
        )
        if response.status_code == 201:
            print(f"User {email} registered successfully.")
            user_id = response.json()["user_id"]
            user_ids.append(user_id)
        else:
            print(f"Failed to register user {email}: {response.json()}")


async def register_all_users():
    users = [
        "naadkd@gmail.com",
        "shreshthurohit@gmail.com",
        "priyanshgoel05@gmail.com",
        "lala@gmail.com",
        "shivangbirla9999@gmail.com",
        "dikshaverma@gmail.com",
        "sauravkumar@gmail.com",
        "aakashmehta@yahoo.com",
        "smitasharma@outlook.com",
        "rohitgupta@gmail.com",
        "kiranbhatia@yahoo.com",
        "ankitverma@gmail.com",
        "nikhilrana@hotmail.com",
        "purnimajain@gmail.com",
        "adityakumar@yahoo.com",
        "arvindsharma@outlook.com",
        "tanvigupta@gmail.com",
        "manishpatel@yahoo.com",
        "sonalmittal@gmail.com",
        "mukeshraj@gmail.com",
    ]

    # Run all user registration tasks concurrently
    await asyncio.gather(*[register_user(email, "password") for email in users])


# Adding Doctors
def add_doctors():
    doctors = [
        Practitioner(
            contact="7722087410",
            name="Dr. John Doe",
            gender=Gender.M,
            address="123 Elm Street",
            date_of_birth=datetime(1980, 1, 1),
            speciality=Speciality.CARDIOLOGY,
            deceased=False,
            user_id=user_ids[0],
        ),
        Practitioner(
            contact="0987654321",
            name="Dr. Jane Smith",
            gender=Gender.F,
            address="456 Oak Avenue",
            date_of_birth=datetime(1975, 5, 15),
            speciality=Speciality.DERMATOLOGY,
            deceased=False,
            user_id=user_ids[1],
        ),
        Practitioner(
            contact="5555555555",
            name="Dr. Emily Davis",
            gender=Gender.F,
            address="789 Maple Lane",
            date_of_birth=datetime(1983, 7, 25),
            speciality=Speciality.PEDIATRICS,
            deceased=False,
            user_id=user_ids[2],
        ),
        Practitioner(
            contact="6666666666",
            name="Dr. Michael Brown",
            gender=Gender.M,
            address="101 Oak Avenue",
            date_of_birth=datetime(1978, 11, 30),
            speciality=Speciality.ORTHOPEDICS,
            deceased=False,
            user_id=user_ids[3],
        ),
        Practitioner(
            contact="7777777777",
            name="Dr. Sarah Lee",
            gender=Gender.F,
            address="202 Birch Road",
            date_of_birth=datetime(1985, 5, 12),
            speciality=Speciality.GASTROENTEROLOGY,
            deceased=False,
            user_id=user_ids[4],
        ),
    ]

    session.add_all(doctors)
    session.commit()
    print("Doctors added.")


# Adding Patients
def add_patients():
    patients = [
        Patient(
            contact="5555555555",
            name="Alice Johnson",
            gender=Gender.F,
            address="789 Pine Road",
            deceased=False,
            date_of_birth=datetime(1990, 8, 22),
            user_id=user_ids[5],
        ),
        Patient(
            contact="4444444444",
            name="Bob Brown",
            gender=Gender.M,
            address="321 Maple Lane",
            deceased=False,
            date_of_birth=datetime(1985, 3, 10),
            user_id=user_ids[6],
        ),
        Patient(
            contact="3333333333",
            name="Carol White",
            gender=Gender.F,
            address="123 Oak Street",
            deceased=False,
            date_of_birth=datetime(1992, 6, 17),
            user_id=user_ids[7],
        ),
        Patient(
            contact="2222222222",
            name="David Green",
            gender=Gender.M,
            address="456 Pine Road",
            deceased=False,
            date_of_birth=datetime(1988, 12, 25),
            user_id=user_ids[8],
        ),
        Patient(
            contact="1111111111",
            name="Eva Black",
            gender=Gender.F,
            address="789 Elm Street",
            deceased=False,
            date_of_birth=datetime(1995, 4, 7),
            user_id=user_ids[9],
        ),
        Patient(
            contact="0000000000",
            name="Frank Gray",
            gender=Gender.M,
            address="101 Maple Lane",
            deceased=False,
            date_of_birth=datetime(1982, 9, 15),
            user_id=user_ids[10],
        ),
        Patient(
            contact="9999999999",
            name="Grace Adams",
            gender=Gender.F,
            address="202 Oak Avenue",
            deceased=False,
            date_of_birth=datetime(1991, 11, 11),
            user_id=user_ids[11],
        ),
        Patient(
            contact="8888888888",
            name="Henry Evans",
            gender=Gender.M,
            address="303 Pine Road",
            deceased=False,
            date_of_birth=datetime(1984, 2, 28),
            user_id=user_ids[12],
        ),
        Patient(
            contact="7777777777",
            name="Ivy Harris",
            gender=Gender.F,
            address="404 Birch Road",
            deceased=False,
            date_of_birth=datetime(1996, 7, 22),
            user_id=user_ids[13],
        ),
        Patient(
            contact="6666666666",
            name="Jack Lewis",
            gender=Gender.M,
            address="505 Elm Street",
            deceased=False,
            date_of_birth=datetime(1987, 3, 5),
            user_id=user_ids[14],
        ),
    ]

    session.add_all(patients)
    session.commit()
    print("Patients added.")


if __name__ == "__main__":
    Base.metadata.create_all(engine)  # Create tables if not already created

    # Register users and wait for it to complete
    asyncio.run(register_all_users())

    # After registration, add doctors and patients
    add_doctors()
    add_patients()

# Close the session
session.close()
