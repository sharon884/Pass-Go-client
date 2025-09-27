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
      
      {/* Centered, wider container for Search and Description */}
      <div className="p-4 md:p-8 max-w-5xl mx-auto -mt-10 mb-10 z-10 relative">
        
        {/* Attractive Description */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 sm:text-4xl">
            Discover Your Next Unforgettable Event ✨
          </h2>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-300 font-medium">
            Search events by **name, place, or category**—your experience starts here.
          </p>
        </div>
     <div className="flex justify-center">
      
        <SearchBar/>
</div>
      </div>
      
      <Quote/>
      <Cta/>
      <UserStories/>
      <Stats/>
      <Footer/>
    </div>
  )
}

export default WelcomPage