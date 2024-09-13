"use client";

import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";

type Appointment = {
    id: number;
    datetime: string;
    patientName: string;
    patientImage: string;
    location: string;
    reason: string;
};

const appointments: Appointment[] = [
    {
        id: 1,
        datetime: "2024-09-08T10:30",
        patientName: "John Doe",
        patientImage:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        location: "Clinic Room 3",
        reason: "Routine Checkup",
    },
    {
        id: 2,
        datetime: "2024-09-08T11:00",
        patientName: "Jane Smith",
        patientImage:
            "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        location: "Clinic Room 4",
        reason: "Flu Symptoms",
    },
    {
        id: 3,
        datetime: "2024-09-09T09:00",
        patientName: "Rahul Sharma",
        patientImage:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        location: "Clinic Room 2",
        reason: "Back Pain",
    },
    {
        id: 4,
        datetime: "2024-09-09T10:00",
        patientName: "Emily Davis",
        patientImage:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        location: "Clinic Room 5",
        reason: "Annual Physical Exam",
    },
    {
        id: 5,
        datetime: "2024-09-10T09:30",
        patientName: "Chris Johnson",
        patientImage:
            "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        location: "Clinic Room 1",
        reason: "Headache",
    },
    {
        id: 6,
        datetime: "2024-09-10T11:15",
        patientName: "Sarah Lee",
        patientImage:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        location: "Clinic Room 3",
        reason: "Allergy Consultation",
    },
    {
        id: 7,
        datetime: "2024-09-11T08:45",
        patientName: "Alex White",
        patientImage:
            "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
        location: "Clinic Room 2",
        reason: "Diabetes Follow-up",
    },
];

type Day = {
    date: string;
    isCurrentMonth?: boolean;
    isToday?: boolean;
};

const days: Day[] = [
    {date: "2024-08-26"},
    {date: "2024-08-27"},
    {date: "2024-08-28"},
    {date: "2024-08-29"},
    {date: "2024-08-30"},
    {date: "2024-08-31"},
    {date: "2024-09-01", isCurrentMonth: true},
    {date: "2024-09-02", isCurrentMonth: true},
    {date: "2024-09-03", isCurrentMonth: true},
    {date: "2024-09-04", isCurrentMonth: true},
    {date: "2024-09-05", isCurrentMonth: true},
    {date: "2024-09-06", isCurrentMonth: true},
    {date: "2024-09-07", isCurrentMonth: true},
    {date: "2024-09-08", isCurrentMonth: true},
    {date: "2024-09-09", isCurrentMonth: true, isToday: true},
    {date: "2024-09-10", isCurrentMonth: true},
    {date: "2024-09-11", isCurrentMonth: true},
    {date: "2024-09-12", isCurrentMonth: true},
    {date: "2024-09-13", isCurrentMonth: true},
    {date: "2024-09-14", isCurrentMonth: true},
    {date: "2024-09-15", isCurrentMonth: true},
    {date: "2024-09-16", isCurrentMonth: true},
    {date: "2024-09-17", isCurrentMonth: true},
    {date: "2024-09-18", isCurrentMonth: true},
    {date: "2024-09-19", isCurrentMonth: true},
    {date: "2024-09-20", isCurrentMonth: true},
    {date: "2024-09-21", isCurrentMonth: true},
    {date: "2024-09-22", isCurrentMonth: true},
    {date: "2024-09-23", isCurrentMonth: true},
    {date: "2024-09-24", isCurrentMonth: true},
    {date: "2024-09-25", isCurrentMonth: true},
    {date: "2024-09-26", isCurrentMonth: true},
    {date: "2024-09-27", isCurrentMonth: true},
    {date: "2024-09-28", isCurrentMonth: true},
    {date: "2024-09-29", isCurrentMonth: true},
    {date: "2024-09-30", isCurrentMonth: true},
    {date: "2024-09-31", isCurrentMonth: true},
    {date: "2024-10-01"},
    {date: "2024-10-02"},
    {date: "2024-10-03"},
    {date: "2024-10-04"},
    {date: "2024-10-05"},
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const formatDate = (datetime: string): string => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

const formatTime = (datetime: string): string => {
    const date = new Date(datetime);
    return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function DoctorSchedulePage() {
    const router = useRouter();

    const today = days.filter((day) => day.isToday == true)[0].date;
    const [selectedDate, setSelectedDate] = useState<string>(today);

    const filteredAppointments = appointments.filter(
        (appointment) => appointment.datetime.split("T")[0] === selectedDate,
    );

    return (
        <div className={"w-full min-h-full shadow-lg rounded-lg p-8 bg-white"}>
            <h2 className="text-2xl font-bold leading-6 text-gray-90">Schedule</h2>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                {/* Calender */}
                <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
                    <div className="flex items-center text-gray-900">
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                        <div className="flex-auto text-sm font-semibold">September</div>
                        <button
                            type="button"
                            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                        <div>S</div>
                    </div>
                    <div
                        className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                        {days.map((day, dayIdx) => (
                            <button
                                key={day.date}
                                type="button"
                                onClick={() => setSelectedDate(day.date)}
                                className={classNames(
                                    "py-1.5 hover:bg-gray-100 focus:z-10",
                                    day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                                    (day.isToday || day.date === selectedDate) && "font-semibold",
                                    day.date === selectedDate && "text-white",
                                    day.isCurrentMonth && !day.isToday && "text-gray-900",
                                    !day.isCurrentMonth && !day.isToday && "text-gray-400",
                                    day.isToday && day.date != selectedDate && "text-indigo-600",
                                    dayIdx === 0 && "rounded-tl-lg",
                                    dayIdx === 6 && "rounded-tr-lg",
                                    dayIdx === days.length - 7 && "rounded-bl-lg",
                                    dayIdx === days.length - 1 && "rounded-br-lg",
                                )}
                            >
                                <time
                                    dateTime={day.date}
                                    className={classNames(
                                        "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                                        !day.isToday && day.date === selectedDate && "bg-gray-900",
                                        day.isToday && day.date === selectedDate && "bg-indigo-600",
                                    )}
                                >
                                    {day.date.split("-").pop()?.replace(/^0/, "")}
                                </time>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Appointments List */}
                <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((appointment) => (
                            <li
                                key={appointment.id}
                                className="relative flex space-x-6 py-6 xl:static hover:cursor-pointer"
                                onClick={() =>
                                    router.push(`/appointments/9827131123`)
                                }
                            >
                                <Image
                                    src={appointment.patientImage}
                                    width={256}
                                    height={256}
                                    alt=""
                                    className="h-14 w-14 flex-none rounded-full"
                                />
                                <div className="flex-auto">
                                    <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                                        {appointment.patientName}
                                    </h3>
                                    <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                                        <div className="flex items-start space-x-3">
                                            <dt className="mt-0.5">
                                                <span className="sr-only">Date</span>
                                                <CalendarIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </dt>
                                            <dd>
                                                <time dateTime={appointment.datetime}>
                                                    {formatDate(appointment.datetime)} at{" "}
                                                    {formatTime(appointment.datetime)}
                                                </time>
                                            </dd>
                                        </div>
                                        <div
                                            className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                            <dt className="mt-0.5">
                                                <span className="sr-only">Location</span>
                                                <MapPinIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </dt>
                                            <dd>{appointment.location}</dd>
                                        </div>
                                        <div
                                            className="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                                            <dd>{appointment.reason}</dd>
                                        </div>
                                    </dl>
                                </div>
                                <Menu
                                    as="div"
                                    className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
                                >
                                    <div>
                                        <MenuButton
                                            className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                                            <span className="sr-only">Open options</span>
                                            <EllipsisHorizontalIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </MenuButton>
                                    </div>
                                    <MenuItems
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block mx-2 my-1 p-2 text-sm text-gray-700 rounded-md hover:bg-gray-300"
                                                >
                                                    View Details
                                                </a>
                                            </MenuItem>
                                            <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block mx-2 my-1 p-2 text-sm text-gray-700 rounded-md hover:bg-gray-300"
                                                >
                                                    Reschedule
                                                </a>
                                            </MenuItem>
                                            <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block mx-2 my-1 p-2 text-sm text-gray-700 rounded-md hover:bg-gray-300"
                                                >
                                                    Cancel Appointment
                                                </a>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No appointments for this day.</p>
                    )}
                </ol>
            </div>
        </div>
    );
}
