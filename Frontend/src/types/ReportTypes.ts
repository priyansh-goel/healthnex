import {Base} from "@/types/MedicationTypes";
import {Patient} from "@/types/PatientTypes";

export interface Report extends Base {
    id: string;
    patient_id: string;
    patient: Patient;
    report_url: string;
    parameters: ReportParameter[];
}

export interface ReportParameter extends Base {
    id: string;
    parameter: string;
    results: string;
    units: string;
    ranges: string;
    report_id: string;
    report: Report;
}
