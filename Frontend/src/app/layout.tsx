import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React, {Suspense} from "react";
import MainSidebar from "@/components/MainSidebar";
import TopBar from "@/components/TopBar";
import LoadingAnimation from "@/components/LoadingAnimation";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "HealthNex AI",
    description: "Saving Lives one at a Time",
    icons: "favicon.ico",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <div className="flex bg-[#F6F7FA]">
            <MainSidebar/>
            <div className="flex flex-col w-full h-screen overflow-auto">
                <TopBar/>
                <Suspense fallback={<LoadingAnimation/>}>
                    <div className="p-8 flex-grow">{children}</div>
                </Suspense>
            </div>
        </div>
        </body>
        </html>
    );
}
