"use client";

import MedicalInformationTabs from "@/components/MedicalInformationTabs";
import MedicalHistoryTable from "@/components/MedicalHistoryTable";
import {useState} from "react";
import AllergiesTable from "@/components/AllergiesTable";
import {MedicalHistoryTab} from "@/types";
import PastSurgeriesTable from "@/components/PastSurgeriesTable";
import TreatmentsTable from "@/components/TreatmentsTable";
import {patients} from "@/SampleData";
import {useParams} from "next/navigation";
import PastConsultationsTable from "@/components/PastConsultationsTable";

export default function PatientViewPage() {
    const [activeTab, setActiveTab] = useState<MedicalHistoryTab>(
        MedicalHistoryTab.MEDICAL_HISTORY,
    );

    const {id} = useParams();
    const selectedPatient = patients.find((patient) => patient.uuid === id);
    return (
        <div className={"divide-y-2 flex flex-col gap-4"}>
            <div className={"bg-white rounded-lg  p-8"}>
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Personal Information
                    </h3>
                </div>
                <div className="mt-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-3">
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                {selectedPatient?.fullName}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Age
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                {selectedPatient?.age}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Gender
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                {selectedPatient?.gender}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                {selectedPatient?.email}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Phone number
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                {selectedPatient?.phone}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-2 sm:col-span-1 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Address
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                                {selectedPatient?.address}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className={"bg-white rounded-lg  p-8"}>
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
