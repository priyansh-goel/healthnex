import {Patient} from "@/types/PatientTypes";
import {Diagnosis} from "@/types/ConditionTypes";
import {AppointmentStatus} from "@/types/AppointmentTypes";
import {Practitioner, Speciality} from "@/types/PractitionerTypes";

export interface Base {
    created_at: Date;
    updated_at: Date;
}

export interface Appointment extends Base {
    id: string;
    status: AppointmentStatus;
    speciality: Speciality;
    practitioner_id: string;
    practitioner: Practitioner;
    patient_id: string;
    patient: Patient;
    diagnosis: Diagnosis[];
    prescription: Prescription[];
}

export interface Medication extends Base {
    id: string;
    product_name: string;
    salt_composition: string;
    product_price?: number;
    habit_forming?: boolean;
    manufacturer_id: number;
    manufacturer: Manufacturer;
    side_effects: SideEffect[];
    drug_interactions: DrugInteraction[];
    substitutions: DrugSubstitution[];
}

export interface SideEffect extends Base {
    id: number;
    description: string;
    medications: Medication[];
}

export interface DrugInteraction extends Base {
    id: number;
    interaction_description: string;
    medications: Medication[];
}

export interface DrugSubstitution extends Base {
    id: number;
    name: string;
    medications: Medication[];
}

export interface Manufacturer extends Base {
    id: number;
    name: string;
    medications: Medication[];
}

export interface Prescription extends Base {
    id: string;
    patient_id: string;
    patient: Patient;
    practitioner_id: string;
    practitioner: Practitioner;
    appointment_id: string;
    appointment: Appointment;
    created_at: Date;
    medications: Medication[];
}

export interface Medicine {
    id: number;
    name: string;
    isHarmfulWith: string[]; // List of drugs that interact harmfully
}
