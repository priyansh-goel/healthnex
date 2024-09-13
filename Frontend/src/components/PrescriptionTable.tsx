"use client";
import React, {useState} from "react";
import {TrashIcon} from "@heroicons/react/24/solid";
import {Prescription} from "@/types/AppointmentTypes";
import {medicines} from "@/SampleData";

const PrescriptionTable: React.FC = () => {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

    const [newPrescription, setNewPrescription] = useState<Partial<Prescription>>(
        {
            medication: "",
            dosage: "",
            duration: "",
        },
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewPrescription((prevState) => ({...prevState, [name]: value}));
    };

    const handleAddPrescription = (medicine: string) => {
        const newId = prescriptions.length
            ? Math.max(...prescriptions.map((p) => p.id)) + 1
            : 1;
        setPrescriptions([
            ...prescriptions,
            {id: newId, medication: medicine, dosage: "50mg", duration: "5 days"},
        ]);
    };

    const handleEditPrescription = (id: number, name: string, value: string) => {
        setPrescriptions((prev) =>
            prev.map((prescription) =>
                prescription.id === id
                    ? {...prescription, [name]: value}
                    : prescription,
            ),
        );
    };

    const handleRemovePrescription = (id: number) => {
        setPrescriptions((prev) =>
            prev.filter((prescription) => prescription.id !== id),
        );
    };

    const isDrugHarmful = (medication: string) => {
        const currentMedicine = medicines.find((med) => med.name === medication);
        if (!currentMedicine) return false;

        return prescriptions.some((prescription) =>
            currentMedicine.isHarmfulWith.includes(prescription.medication),
        );
    };

    return (
        <div className="bg-white rounded-lg p-4">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Adding a Prescription
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the prescriptions including medication, dosage, and
                        duration.
                    </p>
                </div>
                <div className="inline-flex justify-between gap-4 relative mt-4 sm:mt-0 sm:ml-4">
                    <input
                        type="text"
                        placeholder="Search medicine"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowDropdown(true);
                        }}
                        className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        style={{backgroundColor: "#f3f4f6", color: "#333"}}
                    />
                    {showDropdown && searchTerm && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 shadow-lg mt-12 max-h-64 overflow-y-scroll">
                            {medicines
                                .filter((medicine) =>
                                    medicine.name
                                        .toLowerCase()
                                        .includes(searchTerm.toLowerCase()),
                                )
                                .map((medicine) => (
                                    <li
                                        key={medicine.id}
                                        className="flex justify-between p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <span>{medicine.name}</span>
                                        <button
                                            onClick={() => {
                                                handleAddPrescription(medicine.name);
                                                setSearchTerm("");
                                                setShowDropdown(false);
                                            }}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Add
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="relative">
                            <table className="min-w-full table-fixed divide-y divide-gray-300">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th
                                        scope="col"
                                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Medication
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Dosage
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Duration
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                                    >
                                        <span className="sr-only">Remove</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {prescriptions.map((prescription) => (
                                    <tr
                                        key={prescription.id}
                                        className={
                                            isDrugHarmful(prescription.medication)
                                                ? "bg-red-200"
                                                : ""
                                        }
                                    >
                                        <td className="relative px-7 sm:w-12 sm:px-6">
                                            <input
                                                type="checkbox"
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {prescription.medication}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <input
                                                type="text"
                                                value={prescription.dosage}
                                                onChange={(e) =>
                                                    handleEditPrescription(
                                                        prescription.id,
                                                        "dosage",
                                                        e.target.value,
                                                    )
                                                }
                                                className="block w-full rounded-md border-gray-300 p-1 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <input
                                                type="text"
                                                value={prescription.duration}
                                                onChange={(e) =>
                                                    handleEditPrescription(
                                                        prescription.id,
                                                        "duration",
                                                        e.target.value,
                                                    )
                                                }
                                                className="block w-full rounded-md border-gray-300 p-1 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                            <button
                                                onClick={() =>
                                                    handleRemovePrescription(prescription.id)
                                                }
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <TrashIcon className="h-5 w-5" aria-hidden="true"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionTable;
