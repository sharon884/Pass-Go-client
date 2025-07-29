import React from 'react'
import Navbar from '../../components/generalComponents/Navbar';
import Footer from '../../components/generalComponents/Footer';
import LandingComponent from '../../components/generalComponents/landing';
import LandingBanner from '@/components/Landing/LandingBanner';
import InfoSection from '@/components/Landing/InfoSection';
import RunningEvents from '@/components/Landing/RunningEvents';
function LandingPage() {
  return (
    <div>
       <Navbar/>
      <div>
      <LandingBanner/>
      <InfoSection/>
      <RunningEvents/>
      </div>
      <div>

      </div>
   <Footer/>
    </div>
  )
}

export default LandingPage
