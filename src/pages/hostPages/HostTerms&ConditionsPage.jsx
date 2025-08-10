import Footer from '@/components/generalComponents/Footer'
import HostSidebar from '@/components/generalComponents/SideBars/HostSideBar'
import HostTermsAndConditions from '@/components/generalComponents/Terms&conditions/HostTerms&conditions'
import HostNavbar from '@/components/HostComponets/Navbar/HostNavbar'
import React from 'react'


function HostTermsConditionsPage() {
  return (
    <div>
      <HostNavbar/>
      <HostSidebar/>
      <HostTermsAndConditions/>
      <Footer/>
    </div>
  )
}

export default HostTermsConditionsPage
