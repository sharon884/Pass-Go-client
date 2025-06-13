import Footer from "../../components/generalComponents/Footer"
import UserEvents from "../../components/UserComponents/UserEvent"
import UserSidebar from "../../components/generalComponents/SideBars/UserEventSideBar"
import UserEventPageNavbar from "../../components/UserComponents/Navbar/UserEventPageNavbar"

function UserHomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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

        {/* Main Content - Events */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <UserEvents />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default UserHomePage
