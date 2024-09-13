import AppointmentsTable from "@/components/AppointmentsTable";

export default function AppointmentsPage() {
    return (
        <div>
            <div className={"w-full shadow-lg p-4 py-8 bg-white rounded-lg"}>
                <AppointmentsTable/>
            </div>
        </div>
    );
}
