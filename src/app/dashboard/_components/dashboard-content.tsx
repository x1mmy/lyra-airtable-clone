"use client";

import { signOut } from "next-auth/react";
import type { User } from "next-auth";
import { useState } from "react";

interface DashboardContentProps {
    user: User;
}

interface Base {
    id: string;
    name: string;
    created: string;
    color: string;
    initials: string;
}

export function DashboardContent({ user }: DashboardContentProps) {
    const handleSignOut = () => {
        void signOut({ callbackUrl: "/signin" });
    };

    const [currentView, setCurrentView] = useState<"home" | "table">("home");
    const [selectedBase, setSelectedBase] = useState<Base | null>(null);
    const [bases, setBases] = useState<Base[]>([
        {
            id: "1",
            name: "Day 8!",
            created: "09/09/2025",
            color: "bg-orange-500",
            initials: "Da"
        }
    ]);

    const createNewBase = () => {
        const newBase: Base = {
            id: Date.now().toString(),
            name: `Base ${bases.length + 1}`,
            created: new Date().toLocaleDateString(),
            color: "bg-purple-500",
            initials: `B${bases.length + 1}`
        };
        setBases([...bases, newBase]);
    };

    const deleteBase = (baseId: string) => {
        setBases(bases.filter(base => base.id !== baseId));
    };

    const openBase = (base: Base) => {
        setSelectedBase(base);
        setCurrentView("table");
    };

    const goBackToHome = () => {
        setCurrentView("home");
        setSelectedBase(null);
    };

    if (currentView === "table" && selectedBase) {
        return (
            <div className="min-h-screen bg-white">
                {/* Top Navigation Bar */}
                <header className="border-b border-gray-200 bg-white">
                    <div className="flex h-12 items-center justify-between px-4">
                        {/* Left side - Logo and Base name */}
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={goBackToHome}
                                className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100"
                            >
                                <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600">
                                <div className="h-4 w-4 rounded-sm bg-white"></div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <h1 className="text-lg font-semibold text-gray-900">{selectedBase.name}</h1>
                                <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Middle - Navigation tabs */}
                        <div className="flex space-x-8">
                            {["Data", "Automations", "Interfaces", "Forms"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`pb-3 text-sm font-medium transition-colors ${
                                        tab === "Data"
                                            ? "border-b-2 border-purple-600 text-purple-600"
                                            : "text-gray-600 hover:text-gray-900"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Right side - Trial info and buttons */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Trial: 14 days left</span>
                            </div>
                            <button className="flex items-center space-x-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <span>Launch</span>
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </button>
                            <button className="flex items-center space-x-1 rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex h-[calc(100vh-3rem)]">
                    {/* Left Sidebar */}
                    <div className="w-64 border-r border-gray-200 bg-white">
                        <div className="p-4">
                            {/* Table section */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <h2 className="text-sm font-medium text-gray-900">Table 1</h2>
                                        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <button className="flex items-center space-x-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50">
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span>Add or import</span>
                                    </button>
                                </div>

                                {/* View controls */}
                                <div className="mt-3 flex items-center space-x-1">
                                    <button className="rounded p-1 hover:bg-gray-100">
                                        <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    </button>
                                    <button className="rounded bg-purple-100 p-1">
                                        <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </button>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-sm font-medium text-purple-600">Grid view</span>
                                        <svg className="h-3 w-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                <button className="mt-3 flex w-full items-center space-x-1 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Create new...</span>
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Find a view"
                                        className="w-full rounded-md border border-gray-300 bg-white py-1.5 pl-8 pr-8 text-xs placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                    />
                                    <svg className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2">
                                        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* View list */}
                            <div className="mb-6">
                                <div className="rounded-md bg-purple-100 px-2 py-1.5">
                                    <div className="flex items-center space-x-1">
                                        <svg className="h-3 w-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        <span className="text-xs font-medium text-purple-600">Grid view</span>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom utility icons */}
                            <div className="absolute bottom-4 flex flex-col space-y-2">
                                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 19.5a2.5 2.5 0 01-2.5-2.5V7a2.5 2.5 0 012.5-2.5h15a2.5 2.5 0 012.5 2.5v10a2.5 2.5 0 01-2.5 2.5h-15z" />
                                    </svg>
                                </button>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                                    <span className="text-sm font-medium">{user.name?.charAt(0) ?? "Z"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Table Tools Bar */}
                        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2">
                            <div className="flex items-center space-x-2">
                                <button className="rounded p-1 hover:bg-gray-100">
                                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                    </svg>
                                </button>
                                <button className="rounded p-1 hover:bg-gray-100">
                                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l3-3m0 0l3 3m-3-3v12" />
                                    </svg>
                                </button>
                                <button className="rounded p-1 hover:bg-gray-100">
                                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </button>
                                <button className="rounded p-1 hover:bg-gray-100">
                                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                                <button className="rounded p-1 hover:bg-gray-100">
                                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h6M3 8h6M3 12h6" />
                                    </svg>
                                </button>
                                <button className="rounded p-1 hover:bg-gray-100">
                                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button className="rounded p-1 hover:bg-gray-100">
                                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                </button>
                                <button className="rounded p-1 hover:bg-gray-100">
                                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Tools
                                </button>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="flex-1 overflow-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="w-8 border-r border-gray-200 p-2">
                                            <div className="h-4 w-4 rounded border border-gray-300"></div>
                                        </th>
                                        <th className="border-r border-gray-200 px-3 py-2 text-left">
                                            <div className="flex items-center space-x-1">
                                                <span className="text-sm font-medium text-gray-900">A Name</span>
                                                <svg className="h-3 w-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th className="border-r border-gray-200 px-3 py-2 text-left">
                                            <div className="flex items-center space-x-1">
                                                <span className="text-sm font-medium text-gray-900">Notes</span>
                                                <svg className="h-3 w-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th className="border-r border-gray-200 px-3 py-2 text-left">
                                            <div className="flex items-center space-x-1">
                                                <span className="text-sm font-medium text-gray-900">Assignee</span>
                                                <svg className="h-3 w-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </th>
                                        <th className="px-3 py-2 text-left">
                                            <div className="flex items-center space-x-1">
                                                <span className="text-sm font-medium text-gray-900">Status</span>
                                                <svg className="h-3 w-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3].map((row) => (
                                        <tr key={row} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="w-8 border-r border-gray-200 p-2">
                                                <div className="flex items-center justify-center">
                                                    <span className="text-xs text-gray-500">{row}</span>
                                                </div>
                                            </td>
                                            <td className="border-r border-gray-200 px-3 py-2">
                                                <div className="h-4"></div>
                                            </td>
                                            <td className="border-r border-gray-200 px-3 py-2">
                                                <div className="h-4"></div>
                                            </td>
                                            <td className="border-r border-gray-200 px-3 py-2">
                                                <div className="h-4"></div>
                                            </td>
                                            <td className="px-3 py-2">
                                                <div className="h-4"></div>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="border-b border-gray-200">
                                        <td className="w-8 border-r border-gray-200 p-2">
                                            <div className="flex items-center justify-center">
                                                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="border-r border-gray-200 px-3 py-2">
                                            <div className="h-4"></div>
                                        </td>
                                        <td className="border-r border-gray-200 px-3 py-2">
                                            <div className="h-4"></div>
                                        </td>
                                        <td className="border-r border-gray-200 px-3 py-2">
                                            <div className="h-4"></div>
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="h-4"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Bottom Bar */}
                        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2">
                            <div className="flex items-center space-x-2">
                                <button className="flex items-center space-x-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Add...</span>
                                </button>
                            </div>
                            <div className="text-sm text-gray-500">3 records</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Home Dashboard View
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header */}
            <header className="border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Airtable Clone</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                {user.image && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user.image}
                                        alt={user.name ?? "User"}
                                    />
                                )}
                                <div className="text-sm">
                                    <p className="font-medium text-gray-900">{user.name}</p>
                                    <button
                                        onClick={handleSignOut}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">Home</h2>
                </div>

                {/* Create Base Button */}
                <div className="mb-8">
                    <button
                        onClick={createNewBase}
                        className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        Create Base
                    </button>
                </div>

                {/* Bases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {bases.map((base) => (
                        <div
                            key={base.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow group relative"
                        >
                            <div className="flex items-start space-x-4">
                                <div 
                                    onClick={() => openBase(base)}
                                    className="flex-1 flex items-start space-x-4 cursor-pointer"
                                >
                                    <div className={`w-12 h-12 rounded-lg ${base.color} flex items-center justify-center text-white font-semibold`}>
                                        {base.initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">{base.name}</h3>
                                        <p className="text-sm text-gray-500">Created {base.created}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteBase(base.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-red-100 text-red-600 hover:text-red-700"
                                    title="Delete base"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {bases.length === 0 && (
                    <div className="text-center py-12">
                        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No bases yet</h3>
                        <p className="text-gray-500 mb-4">Create your first base to get started</p>
                        <button
                            onClick={createNewBase}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
                        >
                            Create Base
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
