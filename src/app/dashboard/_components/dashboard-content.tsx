"use client";

import { signOut } from "next-auth/react";
import type { User } from "next-auth";

interface DashboardContentProps {
    user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
    const handleSignOut = () => {
        void signOut({ callbackUrl: "/signin" });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">Lyra</h1>
                            <span className="ml-2 text-sm text-gray-500">Airtable Clone</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                {user.image && (
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={user.image}
                                        alt={user.name ?? "User"}
                                    />
                                )}
                                <div className="text-sm">
                                    <p className="font-medium text-gray-900">{user.name}</p>
                                    <p className="text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleSignOut}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                        Welcome back, {user.name?.split(" ")[0] ?? "User"}!
                    </h2>
                    <p className="text-gray-600">
                        Manage your data with powerful Airtable-like features
                    </p>
                </div>

                
            </main>
        </div>
    );
}
