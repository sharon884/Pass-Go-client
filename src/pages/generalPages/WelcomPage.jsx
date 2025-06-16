import React from 'react'
import Welcome from '../../components/generalComponents/UserHomePage/Welcome'
import Qoute from '../../components/generalComponents/UserHomePage/qoute'
import Cta from '../../components/generalComponents/UserHomePage/Cta'
import UserStories from '../../components/generalComponents/UserHomePage/UserStories'
import Stats from '../../components/generalComponents/UserHomePage/Stats'
import Footer from '../../components/generalComponents/Footer'
import SearchBar from '../../components/UserComponents/Search/UserSearchBar'
import { useTheme } from '../../contexts/ThemeContext'

function WelcomPage() {
  const { theme } = useTheme() // Get current theme
  
  // Add console log to debug
  React.useEffect(() => {
    console.log("Current theme in WelcomePage:", theme)
    console.log("HTML classes:", document.documentElement.classList.toString())
  }, [theme])
  
  return (
    <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      <Welcome/>
      <SearchBar/>
      <Qoute/>
      <Cta/>
      <UserStories/>
      <Stats/>
      <Footer/>
    </div>
  )
}

export default WelcomPage
