import AdminCancellationRequests from '@/components/AdminComponents/EventManagement/AdminCancellationRequests'
import AdminNavbar from '@/components/AdminComponents/Navbar'
import AdminSidebar from '@/components/generalComponents/SideBar'
import React from 'react'
import { Footer } from 'react-day-picker'

function AdminCancelRequestsPage() {
  return (
    <div>
        <AdminNavbar/>
        <AdminSidebar/>

      <AdminCancellationRequests/>
      <Footer/>
    </div>
  )
}

export default AdminCancelRequestsPage
