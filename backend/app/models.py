import uuid
from pytz import timezone
from datetime import datetime, UTC

from sqlalchemy import (
    BigInteger,
    Boolean,
    DateTime,
    ForeignKey,
    String,
    Uuid,
    Enum,
    Date,
    Integer,
    Table,
    Column,
    Float,
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
    declared_attr,
)

from app.schemas.appointment import AppointmentStatus
from app.schemas.condition import ClinicalStatus, Severity, BodySite
from app.schemas.patient import Gender
from app.schemas.practitioner import Speciality


class Base(DeclarativeBase):
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), onupdate=datetime.now(UTC)
    )


# Association Tables

# Association table for Medication and SideEffect (Many-to-Many)
medication_side_effect_association_table = Table(
    "medication_side_effect_association",
    Base.metadata,
    Column("medication_id", ForeignKey("medication_table.id"), primary_key=True),
    Column("side_effect_id", ForeignKey("side_effect_table.id"), primary_key=True),
)

# Association table for Medication and DrugInteraction (Many-to-Many)
medication_drug_interaction_association_table = Table(
    "medication_drug_interaction_association",
    Base.metadata,
    Column("medication_id", ForeignKey("medication_table.id"), primary_key=True),
    Column(
        "drug_interaction_id", ForeignKey("drug_interaction_table.id"), primary_key=True
    ),
)

# Association table for Medication and Medication Substitution (Many-to-Many)
medication_substitution_association_table = Table(
    "medication_substitution_association",
    Base.metadata,
    Column("medication_id", ForeignKey("medication_table.id"), primary_key=True),
    Column(
        "substitution_id", ForeignKey("drug_substitution_table.id"), primary_key=True
    ),
)

medication_prescription_association_table = Table(
    "medication_prescription_association",
    Base.metadata,
    Column("medication_id", ForeignKey("medication_table.id"), primary_key=True),
    Column("prescription_id", ForeignKey("prescription_table.id"), primary_key=True),
)


class User(Base):
    __tablename__ = "user_account"

    user_id: Mapped[str] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    email: Mapped[str] = mapped_column(
        String(256), nullable=False, unique=True, index=True
    )
    hashed_password: Mapped[str] = mapped_column(String(128), nullable=False)
    refresh_tokens: Mapped[list["RefreshToken"]] = relationship(back_populates="user")
    doctors: Mapped[list["Practitioner"]] = relationship(back_populates="user")
    patients: Mapped[list["Patient"]] = relationship(back_populates="user")


class RefreshToken(Base):
    __tablename__ = "refresh_token"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    refresh_token: Mapped[str] = mapped_column(
        String(512), nullable=False, unique=True, index=True
    )
    used: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    exp: Mapped[int] = mapped_column(BigInteger, nullable=False)
    user_id: Mapped[str] = mapped_column(
        ForeignKey("user_account.user_id", ondelete="CASCADE"),
    )
    user: Mapped["User"] = relationship(back_populates="refresh_tokens")


class Practitioner(Base):
    __tablename__ = "practitioner_table"
    contact: Mapped[str] = mapped_column(String(10), primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    gender: Mapped[Gender] = mapped_column(Enum(Gender), nullable=False)
    address: Mapped[str] = mapped_column(String(100), nullable=False)
    date_of_birth: Mapped[Date] = mapped_column(Date, nullable=False)
    speciality: Mapped[Speciality] = mapped_column(Enum(Speciality), nullable=False)
    deceased: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    user_id: Mapped[str] = mapped_column(
        ForeignKey("user_account.user_id", ondelete="CASCADE"),
    )
    user: Mapped["User"] = relationship(back_populates="doctors", lazy="joined")
    appointments: Mapped[list["Appointment"]] = relationship(
        back_populates="practitioner"
    )
    prescriptions: Mapped[list["Prescription"]] = relationship(
        back_populates="practitioner"
    )


class Patient(Base):
    __tablename__ = "patient_table"
    contact: Mapped[str] = mapped_column(String(10), primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    gender: Mapped[Gender] = mapped_column(Enum(Gender), nullable=False)
    address: Mapped[str] = mapped_column(String(100), nullable=False)
    deceased: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    date_of_birth: Mapped[Date] = mapped_column(Date, nullable=False)

    user_id: Mapped[str] = mapped_column(
        ForeignKey("user_account.user_id", ondelete="CASCADE"),
    )
    user: Mapped["User"] = relationship(back_populates="patients", lazy="joined")
    appointments: Mapped[list["Appointment"]] = relationship(back_populates="patient")
    reports: Mapped[list["Report"]] = relationship(back_populates="patient")
    prescriptions: Mapped[list["Prescription"]] = relationship(back_populates="patient")


class Appointment(Base):
    __tablename__ = "appointment_table"
    id: Mapped[str] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    status: Mapped[AppointmentStatus] = mapped_column(
        Enum(AppointmentStatus), nullable=False
    )
    speciality: Mapped[Speciality] = mapped_column(Enum(Speciality), nullable=False)
    notes: Mapped[str] = mapped_column(String(500), nullable=True)

    practitioner_id: Mapped[str] = mapped_column(
        ForeignKey("practitioner_table.contact", ondelete="CASCADE"),
    )
    practitioner: Mapped["Practitioner"] = relationship(back_populates="appointments")

    patient_id: Mapped[str] = mapped_column(
        ForeignKey("patient_table.contact", ondelete="CASCADE"),
    )
    patient: Mapped["Patient"] = relationship(back_populates="appointments")

    diagnosis: Mapped[list["Diagnosis"]] = relationship(back_populates="appointment")
    prescription: Mapped[list["Prescription"]] = relationship(
        back_populates="appointment"
    )


class Diagnosis(Base):
    __tablename__ = "diagnosis_table"
    id: Mapped[str] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    description: Mapped[str] = mapped_column(String(100), nullable=False)

    appointment_id: Mapped[str] = mapped_column(
        ForeignKey("appointment_table.id", ondelete="CASCADE"),
    )
    appointment: Mapped["Appointment"] = relationship(back_populates="diagnosis")

    condition: Mapped[list["Condition"]] = relationship(back_populates="diagnosis")


class Condition(Base):
    __tablename__ = "condition_table"
    id: Mapped[str] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    clinical_status: Mapped[ClinicalStatus] = mapped_column(
        Enum(ClinicalStatus), nullable=False, default=ClinicalStatus.ACTIVE
    )
    severity: Mapped[Severity] = mapped_column(
        Enum(Severity), nullable=False, default=Severity.low
    )
    body_site: Mapped[BodySite] = mapped_column(Enum(BodySite), nullable=False)
    stage: Mapped[int] = mapped_column(Integer, nullable=True)
    note: Mapped[str] = mapped_column(String(500), nullable=True)
    recorded_date: Mapped[Date] = mapped_column(Date, nullable=False)

    diagnosis_id: Mapped[str] = mapped_column(
        ForeignKey("diagnosis_table.id", ondelete="CASCADE")
    )
    diagnosis: Mapped["Diagnosis"] = relationship(back_populates="condition")


class Medication(Base):
    __tablename__ = "medication_table"

    id: Mapped[str] = mapped_column(
        Uuid(as_uuid=False), primary_key=True, default=lambda _: str(uuid.uuid4())
    )
    product_name: Mapped[str] = mapped_column(String(200), nullable=False, unique=True)
    salt_composition: Mapped[str] = mapped_column(String(300), nullable=False)
    product_price: Mapped[float] = mapped_column(Float, nullable=True)
    habit_forming: Mapped[bool] = mapped_column(Boolean, nullable=True)
    # medicine_desc: Mapped[str] = mapped_column(String(5000), nullable=False)

    manufacturer_id: Mapped[int] = mapped_column(ForeignKey("manufacturer_table.id"))
    manufacturer: Mapped["Manufacturer"] = relationship(back_populates="medications")

    side_effects: Mapped[list["SideEffect"]] = relationship(
        secondary=medication_side_effect_association_table, back_populates="medications"
    )
    drug_interactions: Mapped[list["DrugInteraction"]] = relationship(
        secondary=medication_drug_interaction_association_table,
        back_populates="medications",
    )
    substitutions: Mapped[list["DrugSubstitution"]] = relationship(
        secondary=medication_substitution_association_table,
        back_populates="medications",
    )


class SideEffect(Base):
    __tablename__ = "side_effect_table"

    id: Mapped[int] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    description: Mapped[str] = mapped_column(String(1000), nullable=False)

    medications: Mapped[list["Medication"]] = relationship(
        secondary=medication_side_effect_association_table,
        back_populates="side_effects",
    )


class DrugInteraction(Base):
    __tablename__ = "drug_interaction_table"

    id: Mapped[int] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    interaction_description: Mapped[str] = mapped_column(String(1000), nullable=False)

    medications: Mapped[list["Medication"]] = relationship(
        secondary=medication_drug_interaction_association_table,
        back_populates="drug_interactions",
    )


class DrugSubstitution(Base):
    __tablename__ = "drug_substitution_table"

    id: Mapped[int] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    name: Mapped[str] = mapped_column(String(200), nullable=False)

    medications: Mapped[list["Medication"]] = relationship(
        secondary=medication_substitution_association_table,
        back_populates="substitutions",
    )


class Manufacturer(Base):
    __tablename__ = "manufacturer_table"

    id: Mapped[int] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    name: Mapped[str] = mapped_column(String, nullable=False, unique=True)

    medications: Mapped[list["Medication"]] = relationship(
        back_populates="manufacturer"
    )


class Report(Base):
    __tablename__ = "report_table"

    id: Mapped[str] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )

    patient_id: Mapped[str] = mapped_column(
        ForeignKey("patient_table.contact", ondelete="CASCADE")
    )
    patient: Mapped["Patient"] = relationship(back_populates="reports")
    report_url: Mapped[str] = mapped_column(String, nullable=False)

    parameters: Mapped[list["ReportParameter"]] = relationship(back_populates="report")


class ReportParameter(Base):
    __tablename__ = "report_parameter_table"

    id: Mapped[str] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    parameter: Mapped[str] = mapped_column(String, nullable=False)
    results: Mapped[str] = mapped_column(String, nullable=False)
    units: Mapped[str] = mapped_column(String, nullable=False)
    ranges: Mapped[str] = mapped_column(String, nullable=False)
    report_id: Mapped[str] = mapped_column(
        ForeignKey("report_table.id", ondelete="CASCADE")
    )
    report: Mapped["Report"] = relationship(back_populates="parameters")


class Prescription(Base):
    __tablename__ = "prescription_table"

    id: Mapped[str] = mapped_column(
        Uuid(as_uuid=True), primary_key=True, default=lambda: str(uuid.uuid4())
    )

    patient_id: Mapped[str] = mapped_column(
        ForeignKey("patient_table.contact", ondelete="CASCADE")
    )
    patient: Mapped["Patient"] = relationship(back_populates="prescriptions")

    practitioner_id: Mapped[str] = mapped_column(
        ForeignKey("practitioner_table.contact", ondelete="CASCADE")
    )
    practitioner: Mapped["Practitioner"] = relationship(back_populates="prescriptions")
    appointment_id: Mapped[str] = mapped_column(
        ForeignKey("appointment_table.id", ondelete="CASCADE")
    )
    appointment: Mapped["Appointment"] = relationship(back_populates="prescription")

    medications: Mapped[list["Medication"]] = relationship(
        secondary=medication_prescription_association_table
    )
