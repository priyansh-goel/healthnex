"use client";

import {CheckIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import PatientHistory from "@/components/PatientHistory";
import Diagnosis from "@/components/Diagnosis";
import Prescription from "@/components/Prescription";

const steps = [
    {id: "01", name: "Patient History", status: "complete"},
    {id: "02", name: "Diagnosis", status: "current"},
    {id: "03", name: "Prescription", status: "upcoming"},
];

export default function Slug() {
    const searchParams = useSearchParams();
    const [selected, setSelected] = useState<number>(1);
    const [completedSteps, setCompletedSteps] = useState<boolean[]>([
        true,
        false,
        false,
    ]);
    const router = useRouter();

    useEffect(() => {
        const stepParam = searchParams.get("step");
        if (stepParam) {
            const stepIndex = Number(stepParam) - 1;
            setSelected(stepIndex + 1);
            markStepComplete(stepIndex);
        }
    }, [searchParams]);

    // Mark a step as complete when clicked
    const markStepComplete = (stepIndex: number) => {
        setCompletedSteps((prev) => {
            const updatedSteps = [...prev];
            updatedSteps[stepIndex] = true;
            return updatedSteps;
        });
    };

    // Handle step click
    const handleStepClick = (stepIndex: number) => {
        setSelected(stepIndex + 1);
        markStepComplete(stepIndex);
    };

    const handleStageButtonClick = () => {
        if (selected + 1 <= 3) {
            setSelected(selected + 1);
            markStepComplete(selected);
        } else {
            router.push("/appointments");
        }
    };

    const renderComponent = () => {
        switch (selected) {
            case 1:
                return <PatientHistory/>;
            case 2:
                return <Diagnosis/>;
            case 3:
                return <Prescription/>;
            default:
                return <div>Select a step</div>;
        }
    };

    return (
        <div>
            <div className={"w-full shadow-lg rounded-md p-8 bg-white flex-row"}>
                <nav aria-label="Progress">
                    <ol
                        role="list"
                        className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
                    >
                        {steps.map((step, stepIdx) => (
                            <li key={step.name} className="relative md:flex md:flex-1">
                                {completedSteps[stepIdx] || stepIdx + 1 === selected ? (
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleStepClick(stepIdx);
                                        }}
                                        className="group flex w-full items-center"
                                    >
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                        <CheckIcon
                            aria-hidden="true"
                            className="h-6 w-6 text-white"
                        />
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-900">
                        {step.name}
                      </span>
                    </span>
                                    </a>
                                ) : stepIdx + 1 === selected ? (
                                    <a
                                        aria-current="step"
                                        className="flex items-center px-6 py-4 text-sm font-medium"
                                    >
                    <span
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                      <span className="text-indigo-600">{step.id}</span>
                    </span>
                                        <span className="ml-4 text-sm font-medium text-indigo-600">
                      {step.name}
                    </span>
                                    </a>
                                ) : (
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleStepClick(stepIdx);
                                        }}
                                        className="group flex items-center"
                                    >
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span
                          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                        <span className="text-gray-500 group-hover:text-gray-900">
                          {step.id}
                        </span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                        {step.name}
                      </span>
                    </span>
                                    </a>
                                )}

                                {stepIdx !== steps.length - 1 && (
                                    <div
                                        aria-hidden="true"
                                        className="absolute right-0 top-0 hidden h-full w-5 md:block"
                                    >
                                        <svg
                                            fill="none"
                                            viewBox="0 0 22 80"
                                            preserveAspectRatio="none"
                                            className="h-full w-full text-gray-300"
                                        >
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                stroke="currentcolor"
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="mt-8">{renderComponent()}</div>

                <div className="flex sm:mt-8 sm:flex-none justify-end">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-4 py-3 text-center text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleStageButtonClick}
                    >
                        Complete Stage
                    </button>
                </div>
            </div>
        </div>
    );
}
