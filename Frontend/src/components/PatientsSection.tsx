"use client";

import {useEffect, useState} from "react";
import {patients, PatientSample} from "@/SampleData";
import PatientsTable from "@/components/PatientsTable";

export default function PatientsSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [patientSuggestions, setPatientSuggestions] = useState<PatientSample[]>(
        [],
    );
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setPatientSuggestions(patients);
        } else {
            const filteredPatients = patients.filter((patient) =>
                patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setPatientSuggestions(filteredPatients);
        }
    }, [searchQuery]);

    return (
        <div className="bg-[#FFFFFF] pt-8 rounded-lg shadow-md">
            <div className="flex flex-row gap-6">
                <div className="flex flex-col gap-3 w-full">
                    <div className="relative px-8">
                        {" "}
                        {/* Add relative positioning */}
                        <div className="flex flex-row items-center justify-between gap-4">
                            <h2 className="text-2xl font-bold leading-6 text-gray-900">
                                Patients
                            </h2>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Search for patient...."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    className="p-2 border border-gray-200 rounded-lg max-h-12 w-64"
                                />
                                <button
                                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg max-h-12 font-semibold">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <PatientsTable patients={patientSuggestions}/>
                </div>
            </div>
        </div>
    );
}
