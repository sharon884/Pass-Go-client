import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMobile, setEditMobile] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/user-management/userList", {
        params: { search, page },
      });

      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  };

  const toggleBlock = async (userId) => {
    try {
      const response = await api.put(`/admin/user-management/users/block/${userId}`);

      if (response.data.success) {
        fetchUsers();
        const user = users.find((u) => u._id === userId);
        toast.success(`User ${user.is_active ? "blocked" : "unblocked"} successfully`);
      }
    } catch (error) {
      console.log("error toggling user block status", error);
      toast.error("Failed to update user status");
    }
  };

  const handleEdit = (user) => {
    setEditId(user._id);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditMobile(user.mobile);
    setShowEditModal(true);
  };

  const editUser = async () => {
    try {
      const response = await api.put("/admin/user-management/users/edit", {
        id: editId,
        email: editEmail,
        name: editName,
        mobile: editMobile,
      });

      if (response.data.success) {
        fetchUsers();
        resetFields();
        setShowEditModal(false);
        toast.success("User updated successfully");
      }
    } catch (error) {
      console.log("error editing user", error);
      toast.error("Failed to update user");
    }
  };

  const resetFields = () => {
    setEditId(null);
    setEditEmail("");
    setEditMobile("");
    setEditName("");
  };

  const handleBlockConfirm = (user) => {
    setUserToBlock(user);
    setShowConfirmModal(true);
  };

  const confirmBlock = () => {
    if (userToBlock) {
      toggleBlock(userToBlock._id);
      setShowConfirmModal(false);
      setUserToBlock(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, page]);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mobile
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
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
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.mobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.is_active ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleBlockConfirm(user)}
                      className="text-[#5A3FFF] hover:text-[#4930cc] mr-4"
                    >
                      {user.is_active ? "Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-[#5A3FFF] hover:text-[#4930cc]"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit User</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3FFF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A3FFF] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
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
                    resetFields();
                    setShowEditModal(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={editUser}
                  className="px-4 py-2 bg-[#5A3FFF] rounded-md text-sm font-medium text-white hover:bg-[#4930cc] focus:outline-none"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 md:mx-auto shadow-lg">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are you sure?</h3>
              <p className="text-sm text-gray-500 mb-4">
                {userToBlock?.is_active
                  ? "This will block the user from accessing the platform."
                  : "This will unblock the user and restore their access."}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBlock}
                  className="px-4 py-2 bg-[#5A3FFF] rounded-md text-sm font-medium text-white hover:bg-[#4930cc] focus:outline-none"
                >
                  {userToBlock?.is_active ? "Block" : "Unblock"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
