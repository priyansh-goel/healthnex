import {Dispatch, SetStateAction} from "react";
import {MedicalHistoryTab} from "@/types";

const tabs = [
    {
        name: "Medical History",
        href: "#",
        current: true,
        value: MedicalHistoryTab.MEDICAL_HISTORY,
    },
    {
        name: "Allergies",
        href: "#",
        current: false,
        value: MedicalHistoryTab.ALLERGIES,
    },
    {
        name: "Past Surgeries",
        href: "#",
        current: false,
        value: MedicalHistoryTab.PAST_SURGERIES,
    },
    {
        name: "Treatments",
        href: "#",
        current: false,
        value: MedicalHistoryTab.TREATMENTS,
    },
    {
        name: "Previous Consultations",
        href: "#",
        current: false,
        value: MedicalHistoryTab.PREVIOUS_CONSULTATIONS,
    },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function MedicalInformationTabs({
                                                   setActiveTab,
                                                   activeTab,
                                               }: {
    setActiveTab: Dispatch<SetStateAction<MedicalHistoryTab>>;
    activeTab: MedicalHistoryTab;
}) {
    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                    {tabs.map((tab) => (
                        <option key={tab.name} onClick={() => setActiveTab(tab.value)}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <div
                                onClick={() => setActiveTab(tab.value)}
                                key={tab.name}
                                aria-current={activeTab === tab.value ? "page" : undefined}
                                className={classNames(
                                    activeTab === tab.value
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer",
                                    "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium",
                                )}
                            >
                                {tab.name}
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
