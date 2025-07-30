import HostEvents from "../../components/HostComponets/HostEvent"
import Footer from "../../components/generalComponents/Footer"
import HostSidebar from "../../components/generalComponents/SideBars/HostSideBar"
import HostNavbar from "../../components/HostComponets/Navbar/HostNavbar"
import CancelEventModal from "@/components/HostComponets/Modals/CancelEventModal"

function HostEventManagementPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <HostNavbar />
      </div>

      {/* Main Layout Container */}
      <div className="flex flex-1 pt-16">
        {" "}
        {/* pt-16 to account for fixed navbar */}
        {/* Left Sidebar - Fixed on left */}
        <div className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-sm border-r border-gray-200 overflow-y-auto z-40">
          <HostSidebar />
        </div>
        {/* Main Content Area */}
        <div className="flex-1 ml-64">
          {" "}
          {/* ml-64 to account for sidebar width */}
          <div className="min-h-screen bg-gray-50">
            <HostEvents />
          </div>
        </div>

        

        <CancelEventModal/>
      </div>

      {/* Footer - At bottom */}
      <div className="ml-64 bg-white border-t border-gray-200">
        <Footer />
      </div>
    </div>
  )
}

export default HostEventManagementPage