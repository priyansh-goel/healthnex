"use client";

import {useState} from "react";
import CreateAppointmentModal from "@/components/CreateAppointmentModal";

export default function CreateAppointmentButton() {
    const [createAppointment, setCreateAppointment] = useState<boolean>(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setCreateAppointment(true)}
                className="block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add appointment
            </button>
            <CreateAppointmentModal
                open={createAppointment}
                setOpen={setCreateAppointment}
            />
        </>
    );
}
