import BookingsComponent from "../../components/UserComponents/Bookings/BookingsComponent"
import UserEventPageNavbar from "../../components/UserComponents/Navbar/UserEventPageNavbar"
import UserSidebar from "../../components/generalComponents/SideBars/UserEventSideBar"

const UserBookingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <UserEventPageNavbar />
      </div>

      {/* Main layout container */}
      <div className="flex pt-16">
        {" "}
        {/* pt-16 to account for fixed navbar height */}
        {/* Sidebar - Fixed on left side */}
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-sm border-r overflow-y-auto">
          <UserSidebar />
        </div>
        {/* Main content area */}
        <div className="flex-1 ml-64 p-6">
          <BookingsComponent />
        </div>
      </div>
    </div>
  )
}

export default UserBookingsPage