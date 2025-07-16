import React from 'react'
import UserEventPageNavbar from '../../components/UserComponents/Navbar/UserEventPageNavbar'
import UserSidebar from '../../components/generalComponents/SideBars/UserEventSideBar'
import UserWallet from '../../components/UserComponents/wallet/UserWallet'
import Footer from '../../components/generalComponents/Footer'

function UserWalletPage() {
  return (
    <div>
      <UserEventPageNavbar/>
      <UserSidebar/>
      <UserWallet/>
      <Footer/>
    </div>
  )
}

export default UserWalletPage
