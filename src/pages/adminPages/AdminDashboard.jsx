"use client"

import { useState } from "react"
import UserList from "../../components/AdminComponents/userList"
import HostList from "../../components/AdminComponents/HostList"
import Footer from "../../components/generalComponents/Footer"
import AdminNavbar from "../../components/AdminComponents/Navbar"
import AdminSidebar from "../../components/generalComponents/SideBar"
import AdminCancellationRequests from "@/components/AdminComponents/EventManagement/AdminCancellationRequests"

function AdminDashboard() {
  const [activeView, setActiveView] = useState("user")

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Admin Navbar - Fixed at top */}
      <div className="flex-shrink-0">
        <AdminNavbar />
      </div>

      {/* Main content wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed positioning */}
        <div className="w-64 bg-white shadow-lg flex-shrink-0 overflow-y-auto">
          <AdminSidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top navigation/filter bar */}
          <div className="bg-white p-4 shadow-sm border-b flex-shrink-0">
            <div className="flex justify-end gap-4 max-w-7xl mx-auto w-full">
              <button
                onClick={() => setActiveView("user")}
                className={`px-4 py-2 rounded-md transition-colors font-medium ${
                  activeView === "user"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveView("host")}
                className={`px-4 py-2 rounded-md transition-colors font-medium ${
                  activeView === "host"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Host Management
              </button>
            </div>
          </div>

          {/* Main content - Scrollable container */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="max-w-7xl mx-auto">
                {/* Content wrapper with consistent styling */}
                <div className="bg-white rounded-lg shadow-sm border min-h-[500px]">
                  <div className="p-6">
                    {activeView === "user" ? (
                      <div className="w-full">
                        <UserList />
                      </div>
                    ) : (
                      <div className="w-full">
                        <HostList />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     <AdminCancellationRequests/>
      {/* Footer - Fixed at bottom */}
      <div className="bg-white border-t flex-shrink-0">
        <Footer />
      </div>
    </div>
  )
}

export default AdminDashboard