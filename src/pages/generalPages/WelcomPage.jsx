import React from 'react'
import Welcome from '../../components/generalComponents/UserWelcomePage/Welcome'
import Quote from '../../components/generalComponents/UserWelcomePage/Quote'
import Cta from '../../components/generalComponents/UserWelcomePage/Cta'
import UserStories from '../../components/generalComponents/UserWelcomePage/UserStories'
import Stats from '../../components/generalComponents/UserWelcomePage/Stats'
import Footer from '../../components/generalComponents/Footer'
import SearchBar from '../../components/UserComponents/Search/UserSearchBar'
import { useTheme } from '../../contexts/ThemeContext'

function WelcomPage() {
  const { theme } = useTheme() // Get current theme
  
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      <Welcome/>
      
      {/* Centered, wider container for Search and Description (Increased Overlap and Width) */}
      <div className="p-4 md:p-12 max-w-6xl mx-auto -mt-16 md:-mt-20 mb-12 z-10 relative">
        
        {/* Attractive Description (Increased Text Size) */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 sm:text-5xl mb-3">
            Discover Your Next Unforgettable Event ✨
          </h2>
          <p className="mt-2 text-xl md:text-2xl text-gray-500 dark:text-gray-300 font-medium">
            Search events by **name, place, or category**—your experience starts here.
          </p>
        </div>
        
        {/* SearchBar wrapper (Shadow/Hover Animation Added for Prominence) */}
        <div className="w-full max-w-xl mx-auto shadow-2xl rounded-xl overflow-hidden transform hover:scale-[1.005] transition-transform duration-300">
          <SearchBar />
        </div>
      </div>

      {/* Remaining Components */}
      <Quote/>
      <Stats/>
      <UserStories/>
      <Cta/>

      <div className='mt-16'>
        <Footer/>
      </div>
    </div>
  )
}

export default WelcomPage