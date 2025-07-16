import React from 'react'
import SearchResultsPage from '../../components/UserComponents/Search/SearchResults'
import UserEventPageNavbar from '../../components/UserComponents/Navbar/UserEventPageNavbar'
import UserSidebar from '../../components/generalComponents/SideBars/UserEventSideBar'
import Footer from '../../components/generalComponents/Footer'

function UserSearchResult() {
  return (
    <div>
      <UserEventPageNavbar/>
      <SearchResultsPage/>
      <UserSidebar/>
      <Footer/>
    </div>
  )
}

export default UserSearchResult
