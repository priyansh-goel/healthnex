"use client";

import MedicalInformationTabs from "@/components/MedicalInformationTabs";
import {MedicalHistoryTab} from "@/types";
import MedicalHistoryTable from "@/components/MedicalHistoryTable";
import AllergiesTable from "@/components/AllergiesTable";
import PastSurgeriesTable from "@/components/PastSurgeriesTable";
import TreatmentsTable from "@/components/TreatmentsTable";
import {useState} from "react";
import PastConsultationsTable from "@/components/PastConsultationsTable";
import {useParams} from "next/navigation";
import {appointments} from "@/SampleData";

export default function PatientHistory() {
    const {patientContact} = useParams();
    const selectedPatient = appointments.find(
        (appointment) => appointment.patientContact == patientContact,
    );
    const [activeTab, setActiveTab] = useState<MedicalHistoryTab>(
        MedicalHistoryTab.MEDICAL_HISTORY,
    );

    return (
        <div className="divide-zinc-200 divide-y">
            {/* Patient Details */}
            <div className={"bg-white rounded-lg px-4"}>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Personal Information
                    </h3>
                </div>
                <div className="mt-4 px-8">
                    <dl className="grid grid-cols-1 sm:grid-cols-3">
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                Rahul Sharma
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Age
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                24
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Gender
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                Male
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Blood Group
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                O+
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Organ Donor
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                Yes
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                margotfoster@example.com
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Phone number
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                9182371232
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Address
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                House no. 1821, Sector-33, Gurugram
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* Medical Information */}
            <div className={"bg-white rounded-lg mt-4 px-4"}>
                <div>
                    <div className="px-4 sm:px-0 mt-8">
                        <h3 className="text-base font-semibold leading-7 text-gray-900 mb-4">
                            Medical Information
                        </h3>
                    </div>
                    <MedicalInformationTabs
                        setActiveTab={setActiveTab}
                        activeTab={activeTab}
                    />
                    <div className="mt-6">
                        {activeTab === MedicalHistoryTab.MEDICAL_HISTORY && (
                            <MedicalHistoryTable/>
                        )}
                        {activeTab === MedicalHistoryTab.ALLERGIES && (
                            <AllergiesTable/>
                        )}
                        {activeTab === MedicalHistoryTab.PAST_SURGERIES && (
                            <PastSurgeriesTable/>
                        )}
                        {activeTab === MedicalHistoryTab.TREATMENTS && (
                            <TreatmentsTable/>
                        )}
                        {activeTab === MedicalHistoryTab.PREVIOUS_CONSULTATIONS && (
                            <PastConsultationsTable/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
