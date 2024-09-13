import {Appointment, Base} from "@/types/MedicationTypes";

export interface Diagnosis extends Base {
    id: string;
    description: string;
    appointment_id: string;
    appointment: Appointment;
    condition: Condition[];
}

export interface Condition extends Base {
    id: string;
    clinical_status: ClinicalStatus;
    severity: Severity;
    body_site: BodySite;
    stage?: number;
    note?: string;
    recorded_date: Date;
    diagnosis_id: string;
    diagnosis: Diagnosis;
}

// ClinicalStatus Enum
export enum ClinicalStatus {
    ACTIVE = "active",
    RECURRENCE = "recurrence",
    RELAPSE = "relapse",
    INACTIVE = "inactive",
    REMISSION = "remission",
    RESOLVED = "resolved",
    UNKNOWN = "unknown",
}

// Severity Enum
export enum Severity {
    LOW = "low",
    MODERATE = "moderate",
    HIGH = "high",
}

// BodySite Enum
export enum BodySite {
    HEAD = "head",
    NECK = "neck",
    CHEST = "chest",
    ABDOMEN = "abdomen",
    BACK = "back",
    PELVIS = "pelvis",
    ARMS = "arms",
    LEGS = "legs",
    HANDS = "hands",
    FEET = "feet",
    SHOULDERS = "shoulders",
    KNEES = "knees",
    ELBOWS = "elbows",
    JOINTS = "joints",
    SKIN = "skin",
    ORAL = "oral",
    EYES = "eyes",
    EARS = "ears",
    NOSE = "nose",
    THROAT = "throat",
    LUNGS = "lungs",
    HEART = "heart",
    LIVER = "liver",
    KIDNEYS = "kidneys",
    BLADDER = "bladder",
    BOWELS = "bowels",
    PROSTATE = "prostate",
    OVARIES = "ovaries",
    UTERUS = "uterus",
    TESTICLES = "testicles",
    OTHER = "other",
}

// Gender Enum

// Speciality Enum
