// src/pages/Host/HostEditEventPage.jsx

import EditEventModalWrapper from "../../components/HostComponets/EditEvent/EditEventModalWrapper";
import Footer from "../../components/generalComponents/Footer";
import HostSidebar from "../../components/generalComponents/SideBars/HostSideBar";
import HostNavbar from "../../components/HostComponets/Navbar/HostNavbar";

function HostEditEventPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar - Fixed at top */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <HostNavbar />
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar - Fixed on left */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-sm border-r border-gray-200 overflow-y-auto z-40">
          <HostSidebar />
        </aside>

        {/* Main Content Area with proper spacing */}
        <main className="flex-1 ml-64 pt-16 flex flex-col min-h-screen">
          {/* Edit Event Modal Wrapper Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
            {/* This is the new component for editing */}
            <EditEventModalWrapper />
          </div>

          {/* Footer - Properly aligned at bottom */}
          <footer className="w-full bg-white border-t border-gray-200">
            <Footer />
          </footer>
        </main>
      </div>
    </div>
  );
}

export default HostEditEventPage;