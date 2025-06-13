import TicketSeatCountSelectionComponent from "../../components/UserComponents/TicketSeatCountSelectionComponent"
import Footer from "../../components/generalComponents/Footer"
import UserEventPageNavbar from "../../components/UserComponents/Navbar/UserEventPageNavbar"
import UserSidebar from "../../components/generalComponents/SideBars/UserEventSideBar"

function UserTicketSeatCountSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Navbar */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <UserEventPageNavbar />
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1">
        {/* Sidebar */}
        <aside className="flex-shrink-0">
          <UserSidebar />
        </aside>

        {/* Main Content - Ticket Seat Selection */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <TicketSeatCountSelectionComponent />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default UserTicketSeatCountSelectionPage
