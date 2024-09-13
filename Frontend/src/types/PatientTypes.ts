import {Appointment, Base, Prescription} from "@/types/MedicationTypes";
import {Gender, UserAccount} from "@/types/UserTypes";

export interface Patient extends Base {
    contact: string;
    name: string;
    gender: Gender;
    address: string;
    deceased: boolean;
    date_of_birth: Date;
    user_id: string;
    user: UserAccount;
    appointments: Appointment[];
    reports: Report[];
    prescriptions: Prescription[];
}

export enum BloodGroup {
    Aplus = "A+",
    Aminus = "A-",
    Bplus = "B+",
    Bminus = "B-",
    ABplus = "AB+",
    ABminus = "AB-",
    Oplus = "O+",
    Ominus = "O-",
}
