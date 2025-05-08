import React from 'react'
import Navbar from '../../components/generalComponents/Navbar';
import Footer from '../../components/generalComponents/Footer';
import SideBar from '../../components/generalComponents/SideBar';
import UserEvents from '../../components/UserComponents/UserEvent';

function UserHomePage() {
  return (
    <div>
      <Navbar/>
     
     <div>
      <SideBar/>
     </div>
     
      <UserEvents/>
     
     <Footer/>
    </div>
  )
}

export default UserHomePage
