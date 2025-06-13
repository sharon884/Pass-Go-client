import Footer from "../../components/generalComponents/Footer"
import AdminEventApproval from "../../components/AdminComponents/verifyEvents"
import AdminNavbar from "../../components/AdminComponents/Navbar"

function AdminEventApprovePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Admin Navbar - Fixed at top */}
      <div className="flex-shrink-0">
        <AdminNavbar />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <AdminEventApproval />
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="bg-white border-t flex-shrink-0">
        <Footer />
      </div>
    </div>
  )
}

export default AdminEventApprovePage