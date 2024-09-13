"use client";

import {useState} from "react";
import {MedicalHistoryTab} from "@/types";
import PractitionerProfileSection from "@/components/PractitionerProfileSection";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<MedicalHistoryTab>(
        MedicalHistoryTab.MEDICAL_HISTORY,
    );
    return <PractitionerProfileSection/>;
}
