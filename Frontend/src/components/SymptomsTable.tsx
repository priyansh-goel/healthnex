import {useState} from "react";

export default function SymptomsTable() {
    const [symptoms, setSymptoms] = useState([
        {
            symptom: "Cough with mucus",
            duration: "2 weeks",
            severity: "Severe",
        },
        {
            symptom: "Shortness of breath",
            duration: "10 days",
            severity: "Moderate",
        },
        {
            symptom: "Fever and chills",
            duration: "1 week",
            severity: "Severe",
        },
        {
            symptom: "Chest pain",
            duration: "5 days",
            severity: "Moderate",
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSymptom, setNewSymptom] = useState({
        symptom: "",
        duration: "",
        severity: "",
    });

    const handleAddSymptom = () => {
        setSymptoms([...symptoms, newSymptom]);
        setIsModalOpen(false);
        setNewSymptom({symptom: "", duration: "", severity: ""});
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Symptoms
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the symptoms. Extracted from WhatsApp conversation
                        (from text and reports uploaded)
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Symptom
                    </button>
                </div>
            </div>

            {/* Modal for adding new symptom */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-lg font-medium text-gray-900">
                            Add New Symptom
                        </h2>
                        <div className="mt-4">
                            <input
                                type="text"
                                placeholder="Symptom"
                                value={newSymptom.symptom}
                                onChange={(e) =>
                                    setNewSymptom({...newSymptom, symptom: e.target.value})
                                }
                                className="block w-full border rounded-md p-2 mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Duration"
                                value={newSymptom.duration}
                                onChange={(e) =>
                                    setNewSymptom({...newSymptom, duration: e.target.value})
                                }
                                className="block w-full border rounded-md p-2 mb-2"
                            />
                            <select
                                value={newSymptom.severity}
                                onChange={(e) =>
                                    setNewSymptom({...newSymptom, severity: e.target.value})
                                }
                                className="block w-full border rounded-md p-2 mb-4"
                            >
                                <option value="">Select Severity</option>
                                <option value="Mild">Mild</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Severe">Severe</option>
                            </select>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleAddSymptom}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Symptom
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Duration
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Severity
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {symptoms.map((symptom, idx) => (
                                    <tr key={idx}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                            {symptom.symptom}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {symptom.duration}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {symptom.severity}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
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
}
