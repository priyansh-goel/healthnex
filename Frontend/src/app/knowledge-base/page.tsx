"use client";

import {useLayoutEffect, useRef, useState} from "react";

import {ChevronDownIcon, MagnifyingGlassIcon,} from "@heroicons/react/20/solid";
import ArtifactSideDrawer from "@/components/ArtifactSideDrawer";

const artifacts: any[] = [
    {
        id: "1",
        name: "Calpol 650 + Tablet",
        category: "Medicine",
        detail:
            "A common over-the-counter pain reliever and fever reducer. Contains paracetamol as the active ingredient. Safe for most adults and children, but consult a doctor for children under 2 years old.",
        trust_score: 89,
        marketer: "Glaxo SmithKline Pharmaceuticals Ltd",
        composition: {
            primary_salt: "Paracetamol (650mg)",
            salt_synonyms: ["Acetaminophen"],
        },
        storage: "Store below 30°C",
        usage: ["Pain relief", "Treatment of fever"],
        side_effects: ["Stomach pain", "Nausea", "Vomiting"],
        instructions:
            "Take with food as advised by your doctor. Do not chew or crush the tablet.",
        warnings: {
            alcohol: "Unsafe",
            pregnancy: "Consult your doctor",
            breastfeeding: "Safe if prescribed",
            kidney: "Use with caution, consult your doctor",
            liver: "Use with caution, consult your doctor",
        },
        substitutes: [
            {name: "Dolo 650 Tablet", price_per_unit: "₹1.93"},
            {name: "P 650 Tablet", price_per_unit: "₹1.99"},
        ],
        price_per_tablet: "₹2.13",
        therapeutic_class: "Pain Analgesics",
        interactions: ["Nimesulide", "Oxyphenbutazone", "Metamizole"],
    },
    {
        id: "2",
        name: "Ibuprofen 400mg Tablet",
        category: "Medicine",
        detail:
            "popular pain reliever and anti-inflammatory drug. Can be used for headaches, muscle aches, and fever. However, it can cause stomach upset, so take it with food or milk.",
        trust_score: 67,
        marketer: "Cipla Ltd",
        composition: {
            primary_salt: "Ibuprofen (400mg)",
            salt_synonyms: ["Advil", "Motrin"],
        },
        storage: "Store below 25°C",
        usage: ["Pain relief", "Anti-inflammatory", "Fever reducer"],
        side_effects: ["Stomach upset", "Dizziness", "Nausea"],
        instructions:
            "Take with food or milk to avoid stomach upset. Do not exceed the recommended dose.",
        warnings: {
            alcohol: "Unsafe",
            pregnancy: "Consult your doctor",
            breastfeeding: "Consult your doctor",
            kidney: "Use with caution, consult your doctor",
            liver: "Use with caution, consult your doctor",
        },
        substitutes: [
            {name: "Brufen 400mg Tablet", price_per_unit: "₹1.50"},
            {name: "Ibugesic 400mg Tablet", price_per_unit: "₹1.40"},
        ],
        price_per_tablet: "₹1.60",
        therapeutic_class: "Pain Analgesics",
        interactions: ["Warfarin", "Aspirin", "Corticosteroids"],
    },
    {
        id: "3",
        name: "Neurobiology of Pain",
        category: "Medical Journal",
        detail:
            "A scholarly journal that focuses on the scientific study of pain. It covers topics such as pain pathways, neuroinflammation, chronic pain, and neuropathic pain. This journal is highly respected in the field of neuroscience.",
        trust_score: 85,
        publisher: "Elsevier",
        focus_area: "Neuroscience",
        topics: [
            "Pain pathways",
            "Neuroinflammation",
            "Chronic pain",
            "Neuropathic pain",
        ],
        impact_factor: 4.5,
        publication_frequency: "Quarterly",
        editor_in_chief: "Dr. Sarah Miller",
        open_access: "No",
        issn: "2452-073X",
        doi_prefix: "10.1016",
    },
    {
        id: "4",
        name: "Principles of Neural Science",
        category: "Book",
        detail:
            "A classic textbook on neuroscience that provides a comprehensive overview of the nervous system. It covers topics such as neuroanatomy, synaptic transmission, sensory systems, and motor systems. This book is widely used in university courses.",
        trust_score: 54,
        author: "Eric R. Kandel",
        publisher: "McGraw-Hill Education",
        focus_area: "Neuroscience",
        edition: "5th",
        isbn: "9780071390118",
        topics: [
            "Neuroanatomy",
            "Synaptic transmission",
            "Sensory systems",
            "Motor systems",
        ],
        publication_year: 2012,
        price: "₹7,500",
        language: "English",
        availability: "In stock",
    },
    {
        id: "5",
        name: "Dopaminergic Regulation of Reward Pathways",
        category: "Research Paper",
        detail:
            "A scientific study that investigates the role of dopamine in the brain's reward system. Dopamine is a neurotransmitter involved in pleasure and motivation. This research has implications for understanding addiction and mental health disorders.",
        trust_score: 81,
        author: "Dr. Emma Thompson",
        publication: "Journal of Neuroscience Research",
        doi: "10.1002/jnr.24539",
        year_published: 2020,
        abstract:
            "This paper explores the role of dopamine in regulating reward circuits, focusing on its implications in addiction and mental health disorders.",
        keywords: ["Dopamine", "Reward pathways", "Addiction", "Mental health"],
        citations: 85,
        open_access: "Yes",
    },
    {
        id: "6",
        name: "Human Connectome Project",
        category: "Neuroscience Dataset",
        detail:
            "A large-scale research initiative that aims to map the human brain's connections. It involves collecting MRI scans, behavioral data, and genetic data from thousands of participants. This dataset is a valuable resource for neuroscientists studying brain structure and function.",
        trust_score: 70,
        focus_area: "Brain connectivity mapping",
        organization: "Washington University",
        data_type: ["MRI scans", "Behavioral data", "Genetic data"],
        dataset_size: "2TB",
        access_link: "https://www.humanconnectome.org",
        downloadable: "Yes",
        license: "Open Access",
        citation: "Van Essen et al., 2012",
    },
];

export default function KnowledgeBasePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const checkbox = useRef<HTMLInputElement | null>(null);
    const [checked, setChecked] = useState(false);
    const [selectedArtifacts, setSelectedArtifacts] = useState<any[]>([]);
    const [selectedArtifact, setSelectedArtifact] = useState<any>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

    useLayoutEffect(() => {
        const isIndeterminate =
            selectedArtifacts.length > 0 &&
            selectedArtifacts.length < artifacts.length;
        setChecked(selectedArtifacts.length === artifacts.length);
        setIndeterminate(isIndeterminate);
        if (checkbox.current) {
            checkbox.current.indeterminate = isIndeterminate;
        }
    }, [selectedArtifacts]);

    function toggleAll() {
        setSelectedArtifacts(checked || indeterminate ? [] : artifacts);
        setChecked(!checked && !indeterminate);
        setIndeterminate(false);
    }

    const filteredArtifacts = artifacts
        .filter((artifact) =>
            artifact.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => {
            if (sortDirection === "asc") {
                return a.name.localeCompare(b.name);
            }
            return b.name.localeCompare(a.name);
        });

    const openDrawer = (artifact: any) => {
        setSelectedArtifact(artifact);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div className="w-full min-h-full p-8 shadow-lg rounded-lg bg-white">
            <h2 className="text-2xl font-bold leading-6 text-gray-900">
                Knowledge Base
            </h2>

            {/* Search Bar */}
            <div className="mt-6 flex items-center">
                <div className="relative flex items-center">
                    <MagnifyingGlassIcon
                        className="absolute left-3 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                    />
                    <input
                        type="text"
                        className="block w-full pl-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search artifacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Artifacts Table */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                    <input
                                        type="checkbox"
                                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        ref={checkbox}
                                        checked={checked}
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    <a href="#" className="group inline-flex">
                                        ID
                                        <span
                                            className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                        />
                      </span>
                                    </a>
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    <a href="#" className="group inline-flex">
                                        Name
                                        <span
                                            className="ml-2 flex-none rounded bg-gray-100 text-gray-900 group-hover:bg-gray-200">
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                        />
                      </span>
                                    </a>
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    <a href="#" className="group inline-flex">
                                        Type
                                        <span
                                            className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible"
                        />
                      </span>
                                    </a>
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredArtifacts.map((artifact) => (
                                <tr key={artifact.id}>
                                    <td className="relative px-7 sm:w-12 sm:px-6">
                                        {selectedArtifacts.includes(artifact) && (
                                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"/>
                                        )}
                                        <input
                                            type="checkbox"
                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            value={artifact.id}
                                            checked={selectedArtifacts.includes(artifact)}
                                            onChange={(e) =>
                                                setSelectedArtifacts(
                                                    e.target.checked
                                                        ? [...selectedArtifacts, artifact]
                                                        : selectedArtifacts.filter((a) => a !== artifact),
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {artifact.id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {artifact.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {artifact.category}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                                        <button
                                            onClick={() => openDrawer(artifact)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Side Drawer */}
            <ArtifactSideDrawer
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                selectedArtifact={selectedArtifact}
            ></ArtifactSideDrawer>
        </div>
    );
}
