import React from 'react'
import Navbar from '../../components/generalComponents/Navbar'
import Footer from '../../components/generalComponents/Footer'
import SideBar from '../../components/generalComponents/SideBar'
import HostProfile from '../../components/HostComponets/HostProfileComponet'

function HostHomePage() {
  
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='bg-black text-white px-4 py-2'>
      <Navbar/>
      </header>
      <main className='flex flex-1 bg-white'>
        <aside >
     <SideBar/>

        </aside>
   <section className='ml-90'>

      <HostProfile/>
      
   </section>
      </main>
      <Footer/>
    </div>
  )
}

export default HostHomePage
