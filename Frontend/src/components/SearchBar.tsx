import {useState} from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

interface SearchBarProps {
    placeholder?: string;
}

export default function SearchBar({placeholder = "Search"}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <div className="h-8 bg-gray-200 flex flex-row rounded-full w-50 items-center p-2">
            <MagnifyingGlassIcon height={24} color={"grey"}/>
            <input
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                }
                placeholder={placeholder}
                className="outline-none border-none bg-transparent focus:border-none focus:ring-0 rounded-full"
            />
        </div>
    );
}
