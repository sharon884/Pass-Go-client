import React from 'react'
import AdminCancellationRequests from '@/components/AdminComponents/EventManagement/AdminCancellationRequests'
import AdminNavbar from '@/components/AdminComponents/Navbar'
import AdminSidebar from '@/components/generalComponents/SideBar'
import Footer from '../../components/generalComponents/Footer' // Corrected import path

function AdminCancelRequestsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-900">
      
      {/* 1. The main Navbar at the top of the page */}
      <AdminNavbar />

      {/* 2. The main layout container for the sidebar and content */}
      <div className="flex flex-1">
        
        {/* Sidebar - fixed on the left */}
        <AdminSidebar />

        {/* Main Content Area - takes the remaining space */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <AdminCancellationRequests />
        </main>
      </div>

      {/* 3. Footer at the bottom */}
      <Footer />
    </div>
  )
}

export default AdminCancelRequestsPage