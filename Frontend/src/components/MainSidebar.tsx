"use client";
import {Menu, MenuItem, Sidebar} from "react-pro-sidebar";
import {CalendarIcon, ChartBarIcon, PencilSquareIcon, QueueListIcon, UserIcon,} from "@heroicons/react/24/outline";
import {useState} from "react";
import Link from "next/link";

export default function MainSidebar() {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <Sidebar
            collapsed={!openSidebar}
            onMouseEnter={() => setOpenSidebar(true)}
            onMouseLeave={() => setOpenSidebar(false)}
            width={"300px"}
            className="shadow-lg h-screen fixed top-0 left-0 bg-white text-black z-50"
            transitionDuration={400}
        >
            <Link className="p-4 flex items-start justify-start" href={"/"}>
                <h1 className="text-2xl font-bold transition text-start justify-start">
                    {openSidebar ? "HealthNex" : "HN"}
                </h1>
            </Link>
            <Menu>

                {/*<MenuItem*/}
                {/*    icon={<ChartBarIcon className="h-6 w-6 text-gray-600"/>}*/}
                {/*    component={<Link href={"/dashboard"}/>}*/}
                {/*    className="hover:bg-gray-100"*/}
                {/*>*/}
                {/*    Dashboard*/}
                {/*</MenuItem>*/}

                <MenuItem
                    icon={<PencilSquareIcon className="h-6 w-6 text-gray-600"/>}
                    component={<Link href={"/patients"}/>}
                    className="hover:bg-gray-100"
                >
                    Patients
                </MenuItem>

                <MenuItem
                    icon={<QueueListIcon className="h-6 w-6 text-gray-600"/>}
                    component={<Link href={"/appointments"}/>}
                    className="hover:bg-gray-100"
                >
                    Appointments
                </MenuItem>

                <MenuItem
                    icon={<ChartBarIcon className="h-6 w-6 text-gray-600"/>}
                    component={<Link href={"/knowledge-base"}/>}
                    className="hover:bg-gray-100"
                >
                    Medical Knowledge Base
                </MenuItem>

                <MenuItem
                    icon={<CalendarIcon className="h-6 w-6 text-gray-600"/>}
                    component={<Link href={"/schedule"}/>}
                    className="hover:bg-gray-100"
                >
                    Schedule
                </MenuItem>

                <MenuItem
                    icon={<UserIcon className="h-6 w-6 text-gray-600"/>}
                    component={<Link href={"/profile"}/>}
                    className="hover:bg-gray-100"
                >
                    Profile
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}
