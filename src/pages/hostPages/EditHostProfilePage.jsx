import React from 'react'
import EditHostProfile from '../../components/HostComponets/EditHostProfile'
import Footer from '../../components/generalComponents/Footer'
import HostSidebar from '../../components/generalComponents/SideBars/HostSideBar'

function EditHostProfilePage() {
  return (
    <div>
      <HostSidebar/>
     <EditHostProfile/> 
     <Footer/>
    </div>
  )
}

export default EditHostProfilePage
