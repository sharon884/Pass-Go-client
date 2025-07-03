// components/common/ConfirmModal.jsx
import React from "react";

const ConfirmModal = ({ open, onClose, onConfirm, category }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Confirm Booking</h2>
        <p className="mb-4 text-gray-700">
          Are you sure you want to book a <strong>{category}</strong> ticket? If you don't attend, you're taking someone else's chance.
        </p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-blue-600 text-white">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
