import EditEvent from "../../components/HostComponets/EditEvent/EditEvent"
import Footer from "../../components/generalComponents/Footer"
import HostSidebar from "../../components/generalComponents/SideBars/HostSideBar"
import HostNavbar from "../../components/HostComponets/Navbar/HostNavbar"

function EditEventPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
          {/* Edit Event Content with proper padding */}
          <div className="flex-1 bg-gray-50">
            <EditEvent />
          </div>

          {/* Footer - Properly aligned at bottom */}
          <footer className="w-full bg-white border-t border-gray-200 mt-auto">
            <Footer />
          </footer>
        </main>
      </div>
    </div>
  )
}

export default EditEventPage