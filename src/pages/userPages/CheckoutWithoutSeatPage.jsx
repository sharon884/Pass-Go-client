import React from 'react'
import CheckoutWithoutSeat from '../../components/UserComponents/FreeTicket/CheckoutWithoutSeat'
import Footer from '../../components/generalComponents/Footer'
import UserEventPageNavbar from '../../components/UserComponents/Navbar/UserEventPageNavbar'
import UserSidebar from '../../components/generalComponents/SideBars/UserEventSideBar'

function CheckoutWithoutSeatPage() {
  return (
    <div>
        <UserEventPageNavbar/>
        <UserSidebar/>
      <CheckoutWithoutSeat/>
      <Footer/>
    </div>
  )
}

export default CheckoutWithoutSeatPage
