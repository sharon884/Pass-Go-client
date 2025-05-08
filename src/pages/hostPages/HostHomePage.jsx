import React from 'react'
import Navbar from '../../components/generalComponents/Navbar'
import Footer from '../../components/generalComponents/Footer'
import SideBar from '../../components/generalComponents/SideBar'
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
