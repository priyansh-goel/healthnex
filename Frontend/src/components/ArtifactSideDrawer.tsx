import {Dialog, DialogPanel, DialogTitle} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Dispatch, ReactNode, SetStateAction} from "react";

type ArtifactSideDrawerProps = {
    isDrawerOpen: boolean;
    setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
    selectedArtifact: any;
};
export default function ArtifactSideDrawer({
                                               isDrawerOpen,
                                               setIsDrawerOpen,
                                               selectedArtifact,
                                           }: ArtifactSideDrawerProps) {
    return (
        <Dialog
            open={isDrawerOpen}
            onClose={setIsDrawerOpen}
            className="relative"
        >
            <div className="fixed inset-0"/>
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <DialogPanel
                            transition
                            className="mt-16 pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                        >
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                                            {selectedArtifact.name}
                                        </DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => setIsDrawerOpen(false)}
                                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                                            >
                                                <span className="absolute -inset-2.5"/>
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="h-6 w-6"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Main */}
                                <div className="divide-y divide-gray-200">
                                    {/* Artifact Information */}
                                    <div className="px-4 py-5 sm:px-0 sm:py-0">
                                        <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                    Category
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                    {selectedArtifact.category}
                                                </dd>
                                            </div>
                                            <div className="sm:flex sm:px-6 sm:py-5">
                                                <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                    Details
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                    {selectedArtifact.detail}
                                                </dd>
                                            </div>

                                            {/* Conditional Rendering Based on Artifact Type */}
                                            {selectedArtifact.category === "Medicine" && (
                                                <>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Composition
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.composition.primary_salt} (
                                                            {selectedArtifact.composition.salt_synonyms.join(
                                                                ", ",
                                                            )}
                                                            )
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Side Effects
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.side_effects.join(", ")}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Instructions
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.instructions}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Warnings
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            <ul>
                                                                {Object.entries(selectedArtifact.warnings).map(
                                                                    ([key, value]) => (
                                                                        <li key={key}>
                                                                            {key} - {value as ReactNode}
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Substitutes
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            <ul>
                                                                {selectedArtifact.substitutes.map(
                                                                    (substitute: any) => (
                                                                        <li key={substitute.name}>
                                                                            {substitute.name}
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </dd>
                                                    </div>
                                                </>
                                            )}

                                            {selectedArtifact.category === "Research Paper" && (
                                                <>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Author
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.author}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Publication
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.publication}
                                                        </dd>
                                                    </div>
                                                </>
                                            )}

                                            {selectedArtifact.category === "Dataset" && (
                                                <>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Data Types
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.data_type.join(", ")}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Dataset Size
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.dataset_size}
                                                        </dd>
                                                    </div>
                                                </>
                                            )}

                                            {selectedArtifact.category === "Book" && (
                                                <>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Author
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.author}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Publisher
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.publisher}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            ISBN
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.isbn}
                                                        </dd>
                                                    </div>
                                                </>
                                            )}

                                            {selectedArtifact.category === "Medical Journal" && (
                                                <>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Editor in Chief
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.editor_in_chief}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Publisher
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.publisher}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            ISSN
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.issn}
                                                        </dd>
                                                    </div>
                                                </>
                                            )}

                                            {selectedArtifact.category === "Neuroscience Dataset" && (
                                                <>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Organization
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.organization}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Focus Area
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.focus_area}
                                                        </dd>
                                                    </div>
                                                    <div className="sm:flex sm:px-6 sm:py-5">
                                                        <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48">
                                                            Dataset Size
                                                        </dt>
                                                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:ml-6 sm:mt-0">
                                                            {selectedArtifact.dataset_size}
                                                        </dd>
                                                    </div>
                                                </>
                                            )}
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
