import { useState, useEffect } from "react"
import { toast } from "sonner"
import { fetchUserBasedOnRole, toggleBlockUser, editUser } from "../../services/admin/userManagement.js"

const HostList = () => {
  const [hosts, setHosts] = useState([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editMobile, setEditMobile] = useState("")
  const [showEditModal, setShowEditModal] = useState(false)
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [selectedHost, setSelectedHost] = useState(null)
  const [loading, setLoading] = useState(false)
  const role = "host"

  const fetchHosts = async () => {
    try {
      setLoading(true)
      const response = await fetchUserBasedOnRole(search, page, role)
      setHosts(response.users)
      setTotalPages(response.totalPages)
    } catch (error) {
      console.log("error fetching hosts", error)
      toast.error("Failed to fetch hosts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHosts()
  }, [search, page])

  const toggleBlock = async (hostId) => {
    try {
      const response = await toggleBlockUser(hostId)
      if (response.success) {
        fetchHosts()
        const host = hosts.find((h) => h._id === hostId)
        toast.success(`Host ${host.is_active ? "blocked" : "unblocked"} successfully`)
      }
    } catch (error) {
      console.log("error toggling host block status", error)
      toast.error("Failed to update host status")
    }
  }

  const handleEdit = (host) => {
    setEditId(host._id)
    setEditEmail(host.email)
    setEditName(host.name)
    setEditMobile(host.mobile)
    setShowEditModal(true)
  }

  const handleEditHost = async () => {
    try {
      const userData = {
        id: editId,
        name: editName,
        email: editEmail,
        mobile: editMobile,
      }
      const response = await editUser(userData)
      if (response.success) {
        fetchHosts()
        resetFields()
        setShowEditModal(false)
        toast.success("Host updated successfully")
      }
    } catch (error) {
      console.log("error editing host", error)
      toast.error("Failed to update host")
    }
  }

  const resetFields = () => {
    setEditId(null)
    setEditEmail("")
    setEditMobile("")
    setEditName("")
  }

  const handleBlockConfirm = (host) => {
    setSelectedHost(host)
    setShowBlockModal(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Host Management</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name / email / mobile"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A3FFF] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-4 border-[#5A3FFF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hosts.length > 0 ? (
                hosts.map((host) => (
                  <tr key={host._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{host.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{host.mobile}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{host.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          host.isVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {host.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          host.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {host.is_active ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleBlockConfirm(host)}
                        className="text-[#5A3FFF] hover:text-[#4930cc] mr-4 transition-colors"
                      >
                        {host.is_active ? "Block" : "Unblock"}
                      </button>
                      <button
                        onClick={() => handleEdit(host)}
                        className="text-[#5A3FFF] hover:text-[#4930cc] transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No hosts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-6 py-4 flex items-center justify-between border-t">
        <div className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`px-3 py-1 rounded-md text-sm ${
              page <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-3 py-1 rounded-md text-sm ${
              page >= totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 md:mx-auto shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Host</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3FFF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3FFF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="text"
                    placeholder="Mobile"
                    value={editMobile}
                    onChange={(e) => setEditMobile(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3FFF] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    resetFields()
                    setShowEditModal(false)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditHost}
                  className="px-4 py-2 bg-[#5A3FFF] rounded-md text-sm font-medium text-white hover:bg-[#4930cc] focus:outline-none transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block Confirmation Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 md:mx-auto shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are you sure?</h3>
              <p className="text-sm text-gray-500 mb-4">
                {selectedHost?.is_active
                  ? "This will block the host from accessing the platform."
                  : "This will unblock the host and restore their access."}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowBlockModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toggleBlock(selectedHost._id)
                    setShowBlockModal(false)
                  }}
                  className="px-4 py-2 bg-[#5A3FFF] rounded-md text-sm font-medium text-white hover:bg-[#4930cc] focus:outline-none transition-colors"
                >
                  {selectedHost?.is_active ? "Block" : "Unblock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HostList
