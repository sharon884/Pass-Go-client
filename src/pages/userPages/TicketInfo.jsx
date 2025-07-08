import React from 'react'
import TicketInfo from "../../components/UserComponents/FreeTicket/TicketInfo"
import UserEventPageNavbar from '../../components/UserComponents/Navbar/UserEventPageNavbar'
import UserSidebar from '../../components/generalComponents/SideBars/UserEventSideBar'
import Footer from '../../components/generalComponents/Footer'

function TicketInfoPage() {
  return (
    <div>
        <UserEventPageNavbar/>
        <UserSidebar/>
      <TicketInfo/>
      <Footer/>
    </div>
  )
}

export default TicketInfoPage
