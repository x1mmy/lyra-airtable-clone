"use client";

import type { Base } from "~/types/base";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

interface BaseViewProps {
  base: Base;
}

export function BaseView({ base }: BaseViewProps) {
  const router = useRouter();
  const [isCreatingTable, setIsCreatingTable] = useState(false);
  const [newTableName, setNewTableName] = useState("");

  // Get tables for this base
  const tablesQuery = api.base.getTables.useQuery({ baseId: base.id });
  const tables = (tablesQuery.data as Array<{
    id: string;
    name: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
    baseId: string;
    columns: Array<{
      id: string;
      name: string;
      type: string;
      position: number;
      width: number;
      visible: boolean;
      tableId: string;
    }>;
    rows: Array<{
      id: string;
      position: number;
      createdAt: Date;
      updatedAt: Date;
      tableId: string;
      cells: Array<{
        id: string;
        value?: string | null;
        rowId: string;
        columnId: string;
      }>;
    }>;
    views: Array<{
      id: string;
      name: string;
      type: string;
      filters?: unknown;
      sorts?: unknown;
      hiddenCols?: unknown;
      createdAt: Date;
      updatedAt: Date;
      tableId: string;
    }>;
  }>) ?? [];

  // Create table mutation
  const createTableMutation = api.base.createTable.useMutation({
    onSuccess: () => {
      void tablesQuery.refetch();
      setIsCreatingTable(false);
      setNewTableName("");
    },
  });

  const createNewTable = () => {
    if (newTableName.trim()) {
      createTableMutation.mutate({
        baseId: base.id,
        name: newTableName.trim(),
      });
    }
  };

  const goBackToHome = () => {
    router.push("/dashboard");
  };

  const openTable = (tableId: string) => {
    router.push(`/table/${tableId}`);
  };

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
              <h1 className="text-lg font-semibold text-gray-900">{base.name}</h1>
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
                  <h2 className="text-sm font-medium text-gray-900">Tables</h2>
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <button 
                  onClick={() => setIsCreatingTable(true)}
                  className="flex items-center space-x-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
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

            {/* Tables list */}
            <div className="mb-6">
              {tables.map((table) => (
                <div key={table.id} className="mb-2">
                  <button
                    onClick={() => openTable(table.id)}
                    className="flex w-full items-center space-x-1 rounded-md px-2 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>{table.name}</span>
                  </button>
                </div>
              ))}
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
                <span className="text-sm font-medium">Z</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Welcome message */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to {base.name}</h3>
              <p className="text-gray-500 mb-4">Select a table from the sidebar or create a new one to get started</p>
              <button
                onClick={() => setIsCreatingTable(true)}
                className="rounded-lg bg-purple-600 px-6 py-3 text-white font-medium hover:bg-purple-700 transition-colors"
              >
                Create Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Table Modal */}
      {isCreatingTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create a new table</h3>
            <input
              type="text"
              placeholder="Table name"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createNewTable();
                }
                if (e.key === "Escape") {
                  setIsCreatingTable(false);
                  setNewTableName("");
                }
              }}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setIsCreatingTable(false);
                  setNewTableName("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={createNewTable}
                disabled={!newTableName.trim() || createTableMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createTableMutation.isPending ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}