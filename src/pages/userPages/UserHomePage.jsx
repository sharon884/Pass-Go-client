import React from 'react'
import Navbar from '../../components/generalComponents/Navbar';
import Footer from '../../components/generalComponents/Footer';
import SideBar from '../../components/generalComponents/SideBar';
import UserEvents from '../../components/UserComponents/UserEvent';

function UserHomePage() {
  return (
    <div className='min-h-screen flex flex-col' >
      <header className='bg-black text-white px-4 py-2'>

      <Navbar/>
      </header>
     <main className='flex flex-1 bg-white'>

  
    <aside>

      <SideBar/>
    </aside>
    
     <div >

      <UserEvents/>
     </div>
     </main>
     <Footer/>
    </div>
  )
}

export default UserHomePage
