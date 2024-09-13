import {Base} from "@/types/MedicationTypes";
import {Practitioner} from "@/types/PractitionerTypes";
import {Patient} from "@/types/PatientTypes";

export interface UserAccount extends Base {
    user_id: string;
    email: string;
    hashed_password: string;
    refresh_tokens: RefreshToken[];
    doctors: Practitioner[];
    patients: Patient[];
}

export interface RefreshToken extends Base {
    id: number;
    refresh_token: string;
    used: boolean;
    exp: number;
    user_id: string;
    user: UserAccount;
}

export enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other",
}
