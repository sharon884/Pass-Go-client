import React from 'react'

import SearchResultsPage from '../../components/UserComponents/Search/SearchResults'
import UserEventPageNavbar from '../../components/UserComponents/Navbar/UserEventPageNavbar'
import UserSidebar from '../../components/generalComponents/SideBars/UserEventSideBar'
import Footer from '../../components/generalComponents/Footer'

function UserSearchResult() {
  // NOTE: In a real-world app, you would import and use 'useTheme' here 
  // to apply correct dark/light mode styles just like in UserHomePage.jsx.
  // For a *quick fix* focusing only on structure, we'll use a fixed classic-style background.

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        // Mimicking the classic theme background or a simple light gray
        background: "#f9fafb", 
      }}
    >
      {/* 1. User Navbar - Fixed at top (Matching UserHomePage's fixed/sticky header) */}
      <div className="flex-shrink-0 z-10">
        <header
          // Applying sticky behavior and a simple light theme style
          className="shadow-sm border-b border-gray-200 sticky top-0" 
          style={{ background: "#ffffff" }}
        >
          <UserEventPageNavbar />
        </header>
      </div>

      {/* 2. Main content area with sidebar (Flex container for sidebar and content) */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar - Fixed width (Matching UserHomePage's always-visible sidebar) */}
        {/* NOTE: You may want to add mobile toggle logic here later if needed */}
        <div className="flex-shrink-0">
          <UserSidebar />
        </div>

        {/* Main content - Flexible width and scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Content wrapper with background and styling */}
              <div
                className="rounded-lg shadow-sm border-gray-200 border min-h-[calc(100vh-200px)]"
                style={{ background: "#ffffff" }}
              >
                {/* Your actual search results component */}
                <SearchResultsPage />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer - Fixed at bottom (Matching UserHomePage's fixed footer structure) */}
      <div
        className="border-t border-gray-200 flex-shrink-0"
        style={{ background: "#ffffff" }}
      >
        <Footer />
      </div>
    </div>
  )
}

export default UserSearchResult