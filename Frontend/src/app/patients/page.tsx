"use client";

import PatientsSection from "@/components/PatientsSection";
import React from "react";

const page = () => {
    return (
        <div className="flex flex-col gap-6">
            {/*<div className={"grid grid-cols-3 h-64 gap-8"}>*/}
            {/*  <div className={"flex bg-white shadow-md rounded-lg"}></div>*/}
            {/*  <div className={"flex bg-white shadow-md rounded-lg"}></div>*/}
            {/*  <div className={"flex bg-white shadow-md rounded-lg"}></div>*/}
            {/*</div>*/}
            <PatientsSection/>
        </div>
    );
};

export default page;
