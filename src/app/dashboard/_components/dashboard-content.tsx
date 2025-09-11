"use client";

import type { User } from "next-auth";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import type { Base } from "~/types/base";


interface DashboardContentProps {
    user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
    const router = useRouter();
    const [isCreatingBase, setIsCreatingBase] = useState(false);
    const [newBaseName, setNewBaseName] = useState("");

    // Fetch bases from database
    const basesQuery = api.base.getAll.useQuery();
    const bases: Base[] = (basesQuery.data as Base[]) ?? [];
    const isLoading = basesQuery.isLoading;
    const error = basesQuery.error;
    const refetchBases = basesQuery.refetch;
    
    // Create base mutation
    const createBaseMutation = api.base.create.useMutation({
        onSuccess: () => {
            void refetchBases();
            setIsCreatingBase(false);
            setNewBaseName("");
        },
    });

    const createNewBase = () => {
        if (newBaseName.trim()) {
            createBaseMutation.mutate({
                name: newBaseName.trim(),
                color: "#6366f1",
            });
        }
    };

    const deleteBaseMutation = api.base.delete.useMutation({
        onSuccess: () => {
            void refetchBases();
        },
    });
    
    const deleteBase = (baseId: string) => {
        if (confirm("Are you sure you want to delete this base?")) {
            deleteBaseMutation.mutate({ id: baseId });
        }
    };

    const openBase = (base: Base) => {
        router.push(`/base/${base.id}`);
    };

    const handleSignOut = () => {
        void signOut({ callbackUrl: "/" });
    };

    const getBaseInitials = (name: string) => {
        return name
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const getBaseColor = (color: string) => {
        // Convert hex color to Tailwind class
        const colorMap: Record<string, string> = {
            "#6366f1": "bg-indigo-500",
            "#ef4444": "bg-red-500",
            "#f97316": "bg-orange-500",
            "#eab308": "bg-yellow-500",
            "#22c55e": "bg-green-500",
            "#06b6d4": "bg-cyan-500",
            "#8b5cf6": "bg-violet-500",
            "#ec4899": "bg-pink-500",
        };
        return colorMap[color] ?? "bg-indigo-500";
    };


    // Home Dashboard View
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Header */}
            <header className="border-b border-gray-200 bg-white shadow-sm">
                <div className="flex h-12 items-center justify-between px-4">
                    {/* Left side - Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-600">
                            <div className="h-4 w-4 rounded-sm bg-white"></div>
                        </div>
                        <h1 className="text-lg font-semibold text-gray-900">Airtable Clone</h1>
                        </div>

                    {/* Middle - Search */}
                    <div className="flex-1 max-w-md mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full rounded-md border border-gray-300 bg-white py-1.5 pl-8 pr-8 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <svg className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">⌘K</div>
                                </div>
                            </div>

                    {/* Right side - User info */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Help</span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Sign Out</span>
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 19.5a2.5 2.5 0 01-2.5-2.5V7a2.5 2.5 0 012.5-2.5h15a2.5 2.5 0 012.5 2.5v10a2.5 2.5 0 01-2.5 2.5h-15z" />
                            </svg>
                        </button>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                            <span className="text-sm font-medium">{user.name?.charAt(0) ?? "U"}</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex h-[calc(100vh-3rem)]">
                {/* Left Sidebar */}
                <div className="w-64 border-r border-gray-200 bg-white">
                    <div className="p-4 h-full flex flex-col">
                        {/* Navigation */}
                        <div className="mb-6">
                            <div className="flex items-center space-x-2 mb-4">
                                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">Airtable</span>
                            </div>
                            
                            <nav className="space-y-1">
                                <a href="#" className="flex items-center space-x-2 rounded-md bg-indigo-50 px-2 py-1.5 text-sm font-medium text-indigo-700">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span>Home</span>
                                </a>
                                <a href="#" className="flex items-center space-x-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <span>Favorites</span>
                                </a>
                                <a href="#" className="flex items-center space-x-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Workspaces</span>
                                </a>
                                <a href="#" className="flex items-center space-x-2 rounded-md px-2 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>Shared with me</span>
                                </a>
                            </nav>
                        </div>

                        {/* Create Base Button - Bottom of sidebar */}
                        <div className="mt-auto">
                            <button
                                onClick={() => setIsCreatingBase(true)}
                                className="flex w-full items-center justify-center space-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Create base</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gray-50">
                    <div className="p-8">
                <div className="mb-8">
                            <h2 className="mb-2 text-3xl font-bold text-gray-900">Home</h2>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <span className="text-sm text-gray-600">Opened anytime</span>
                                    <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <button className="rounded p-1 hover:bg-gray-100">
                                        <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    </button>
                                    <button className="rounded bg-indigo-100 p-1">
                                        <svg className="h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Create Base Modal */}
                        {isCreatingBase && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg p-6 w-96">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Create a new base</h3>
                                    <input
                                        type="text"
                                        placeholder="Base name"
                                        value={newBaseName}
                                        onChange={(e) => setNewBaseName(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                createNewBase();
                                            }
                                            if (e.key === "Escape") {
                                                setIsCreatingBase(false);
                                                setNewBaseName("");
                                            }
                                        }}
                                    />
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <button
                                            onClick={() => {
                                                setIsCreatingBase(false);
                                                setNewBaseName("");
                                            }}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                        >
                                            Cancel
                                        </button>
                    <button
                        onClick={createNewBase}
                                            disabled={!newBaseName.trim() || createBaseMutation.isPending}
                                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {createBaseMutation.isPending ? "Creating..." : "Create"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                                <p className="mt-2 text-gray-600">Loading bases...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="text-center py-12">
                                <div className="text-red-600 mb-4">
                                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading bases</h3>
                                <p className="text-gray-500 mb-4">{error.message}</p>
                                <button
                                    onClick={() => void refetchBases()}
                                    className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    Try Again
                    </button>
                </div>
                        )}

                        {/* Bases Grid */}
                        {!isLoading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {bases.map((base: Base) => (
                        <div
                            key={base.id}
                            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow group relative"
                        >
                            <div className="flex items-start space-x-4">
                                <div 
                                    onClick={() => openBase(base)}
                                    className="flex-1 flex items-start space-x-4 cursor-pointer"
                                >
                                            <div className={`w-12 h-12 rounded-lg ${getBaseColor(base.color)} flex items-center justify-center text-white font-semibold`}>
                                                {getBaseInitials(base.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">{base.name}</h3>
                                                <p className="text-sm text-gray-500">Opened {new Date(base.createdAt).toLocaleDateString()}</p>
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
                        )}

                        {/* Empty State */}
                        {!isLoading && !error && bases.length === 0 && (
                            <div className="text-center py-12">
                                <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No bases yet</h3>
                                <p className="text-gray-500 mb-4">Create your first base to get started</p>
                                <button
                                    onClick={() => setIsCreatingBase(true)}
                                    className="rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    Create Base
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
