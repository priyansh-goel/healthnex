import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {BellIcon, MagnifyingGlassIcon, UserCircleIcon,} from "@heroicons/react/24/outline";

export default function TopBar() {
    return (
        <div className="bg-white min-h-16 shadow-md flex items-center justify-between px-4 sticky top-0 z-50">
            {/* Left side - Search bar */}
            <div className="flex items-center space-x-4">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-500"/>
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white rounded-full px-4 py-2 w-64"
                />
            </div>

            {/*Right side - Notification and User Profile */}
            <div className="flex items-center space-x-6">
                {/* Notifications Dropdown */}
                <Menu as="div" className="relative">
                    <MenuButton className="relative">
                        <BellIcon className="h-6 w-6 text-gray-600"/>
                        {/* Notification Badge */}
                        <span
                            className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"/>
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg py-1 z-10">
                        <MenuItem>
                            <div
                                className={"mx-2 my-1 rounded-md p-2 text-sm hover:bg-gray-300"}
                            >
                                You have 3 new notifications!
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div
                                className={"mx-2 my-1 rounded-md p-2 text-sm hover:bg-gray-300"}
                            >
                                Meeting reminder in 10 mins
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div
                                className={"mx-2 my-1 rounded-md p-2 text-sm hover:bg-gray-300"}
                            >
                                New patient booking confirmed
                            </div>
                        </MenuItem>
                    </MenuItems>
                </Menu>

                {/* User Profile Dropdown */}
                <Menu as="div" className="relative">
                    <MenuButton>
                        <UserCircleIcon
                            height={36}
                            width={36}
                            className="stroke-gray-600"
                        />
                    </MenuButton>
                    <MenuItems className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-10">
                        <MenuItem>
                            <div
                                className={"mx-2 my-1 rounded-md p-2 text-sm hover:bg-gray-300"}
                            >
                                Profile
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div
                                className={"mx-2 my-1 rounded-md p-2 text-sm hover:bg-gray-300"}
                            >
                                Settings
                            </div>
                        </MenuItem>
                        <MenuItem>
                            <div
                                className={"mx-2 my-1 rounded-md p-2 text-sm hover:bg-gray-300"}
                            >
                                Logout
                            </div>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}
