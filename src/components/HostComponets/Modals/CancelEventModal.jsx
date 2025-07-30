// client/components/Host/Modals/CancelEventModal.jsx
"use client";
import { useState } from "react";
import { submitCancellationRequest } from "../../../services/host/eventCancellationService";
import { toast } from "sonner";

const CancelEventModal = ({ isOpen, onClose, eventId }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reason.trim()) return toast.error("Please provide a reason");

    setLoading(true);
    try {
      await submitCancellationRequest(eventId, reason);
      toast.success("Cancellation request submitted successfully");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit cancellation");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-md rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Cancel Event Request</h2>

        <div className="text-sm bg-red-100 text-red-800 p-3 rounded mb-4">
          <p><strong>Note:</strong></p>
          <ul className="list-disc ml-5 text-xs mt-1">
            <li>You will get only <strong>75% refund</strong> of your advance amount.</li>
            <li>Remaining <strong>25%</strong> will be retained by admin as cancellation fee.</li>
            <li>Users who booked tickets will get full refunds automatically.</li>
            <li>This action is irreversible once approved by admin.</li>
          </ul>
        </div>

        <textarea
          rows={4}
          className="w-full p-2 border rounded text-sm"
          placeholder="Enter your reason for cancellation..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 text-sm rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white text-sm rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelEventModal;
