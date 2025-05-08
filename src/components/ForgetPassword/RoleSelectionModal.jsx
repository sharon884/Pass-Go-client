"use client"

const RoleSelectionModal = ({ onClose, onRoleSelect }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select your Role</h2>
        <h3 className="text-gray-600 mb-6">Are you a User or Host?</h3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => onRoleSelect("user")}
            className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#4F3DFF] hover:bg-[#4F3DFF]/5 transition-all"
          >
            <span className="text-4xl mb-2">👤</span>
            <span className="font-medium">User</span>
          </button>

          <button
            onClick={() => onRoleSelect("host")}
            className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#4F3DFF] hover:bg-[#4F3DFF]/5 transition-all"
          >
            <span className="text-4xl mb-2">🧑‍💼</span>
            <span className="font-medium">Host</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default RoleSelectionModal
