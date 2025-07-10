import React from 'react'
import Footer from '../../components/generalComponents/Footer'
import HostAdvancePayment from '../../components/HostComponets/HostAdvancePayment/HostAdvancePayment'
import HostNavbar from '../../components/HostComponets/Navbar/HostNavbar'
import HostSidebar from '../../components/generalComponents/SideBars/HostSideBar'

function HostAdvancePaymentPage() {
  return (
    <div>
         <HostNavbar/>
         <HostSidebar/>
        <HostAdvancePayment/>
      <Footer/>
      
    </div>
  )
}

export default HostAdvancePaymentPage
