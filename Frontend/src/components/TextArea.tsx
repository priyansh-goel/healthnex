import {useState} from "react";

interface TextAreaProps {
    label?: string;
    rows?: number;
    placeholder?: string;
    onChange?: (value: string) => void;
}

export default function TextArea({
                                     label = "Add your comment",
                                     rows = 4,
                                     placeholder = "Add you comment...",
                                     onChange,
                                 }: TextAreaProps) {
    const [text, setText] = useState<string>("");

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setText(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <div>
            {label && (
                <label
                    htmlFor="textarea"
                    className="block text-md font-bold leading-6 text-gray-900"
                >
                    {label}
                </label>
            )}
            <div className="mt-2">
        <textarea
            id="textarea"
            name="textarea"
            rows={rows}
            className="block w-full rounded-md border-0 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={text}
            onChange={handleTextChange}
            placeholder={placeholder}
        />
            </div>
        </div>
    );
}
