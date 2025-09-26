import React from 'react'
import Footer from '../../components/generalComponents/Footer'
import HostAdvancePayment from '../../components/HostComponets/HostAdvancePayment/HostAdvancePayment'
import HostNavbar from '../../components/HostComponets/Navbar/HostNavbar'
import HostSidebar from '../../components/generalComponents/SideBars/HostSideBar'

function HostAdvancePaymentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* 1. Top Navbar */}
      <HostNavbar/>

      {/* 2. Main Content Area: Sidebar + Payment Component */}
      <div className="flex flex-1">
        
        {/* Sidebar - fixed width */}
        <HostSidebar/>

        {/* Main Content - takes remaining width and allows scrolling */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <HostAdvancePayment/>
        </main>
      </div>

      {/* 3. Footer */}
      <Footer/>
      
    </div>
  )
}

export default HostAdvancePaymentPage