import {Dispatch, SetStateAction} from "react";

export default function TextInputBox({
                                         label,
                                         value,
                                         placeholder,
                                         setValue,
                                     }: {
    label?: string;
    placeholder?: string;
    value?: string;
    setValue: Dispatch<SetStateAction<string>>;
}) {
    return (
        <div>
            {label && (
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-left text-gray-900"
                >
                    {label}
                </label>
            )}
            <div className="mt-1">
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value ?? ""}
                    placeholder={placeholder ?? ""}
                    className="px-2 block w-full rounded-md focus:outline-none focus:ring-none border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
}
