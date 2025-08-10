import Footer from '@/components/generalComponents/Footer'
import UserSidebar from '@/components/generalComponents/SideBars/UserEventSideBar'
import TermsAndConditions from '@/components/generalComponents/Terms&conditions/UserTerms&conditions'
import UserEventPageNavbar from '@/components/UserComponents/Navbar/UserEventPageNavbar'
import React from 'react'


function UserTermsConditionsPage() {
  return (
    <div>
      <UserEventPageNavbar/>
      <UserSidebar/>
      <TermsAndConditions/>
       <Footer/>
    </div>
  )
}

export default UserTermsConditionsPage
