export interface Appointment {
    id: string;
    status: string;
    speciality: string;
    practitioner_id: string;
    practitioner: string;
    patient_id: string;
    patient: string;
    diagnosis: string;
}

export enum AppointmentStatus {
    PENDING = "pending",
    BOOKED = "booked",
    PROPOSED = "proposed",
    ARRIVED = "arrived",
    FULFILLED = "fulfilled",
    CANCELLED = "cancelled",
    NO_SHOW = "noshow",
    ENTERED_IN_ERROR = "entered-in-error",
    CHECKED_IN = "checked-in",
    WAITLIST = "waitlist",
}

// AppointmentType Enum
export enum AppointmentType {
    ROUTINE = "routine",
    WALK_IN = "walk in",
    CHECKUP = "checkup",
    FOLLOW_UP = "follow up",
    EMERGENCY = "emergency",
}

export interface Prescription {
    id: number;
    medication: string;
    dosage: string;
    duration: string;
}
