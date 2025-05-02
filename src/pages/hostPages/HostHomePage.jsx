import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SideBar from '../../components/SideBar'
import HostProfile from '../../components/HostComponets/HostProfile'

function HostHomePage() {
  return (
    <div>
      <Navbar/>
      <HostProfile/>
     <SideBar/>
      <Footer/>
    </div>
  )
}

export default HostHomePage
