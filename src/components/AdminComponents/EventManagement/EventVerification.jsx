import { useState, useEffect } from "react";
import {
  fetchPendingEvents,
  approveEvent,
  rejectEvent,
} from "../../../services/admin/eventmanagement";
import { toast } from "sonner";

const EventVerificationAdmin = () => {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState({});
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // image modal

  const loadEvents = async (page = 1) => {
    try {
      setLoading(true);
      const data = await fetchPendingEvents(page);
      setPendingEvents(data.events || []);
      setPagination(data.pagination);
    } catch (error) {
      toast.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents(pagination.page);
  }, [pagination.page]);

  const handleApprove = async (id) => {
    try {
      setSubmitting(true);
      const response = await approveEvent(id);
      toast.success(response.message || "Event approved");
      loadEvents(pagination.page);
    } catch {
      toast.error("Approval failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async (id) => {
    try {
      if (!rejectionReason[id]) {
        toast.error("Enter a rejection reason");
        return;
      }
      setSubmitting(true);
      const response = await rejectEvent(id, rejectionReason[id]);
      toast.success(response.message || "Event rejected");
      loadEvents(pagination.page);
    } catch {
      toast.error("Rejection failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePageChange = (delta) => {
    const newPage = pagination.page + delta;
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="p-6 relative">
      <h2 className="text-xl font-bold mb-4">Pending Event Approvals</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : pendingEvents.length === 0 ? (
        <p>No pending events found.</p>
      ) : (
        <div className="space-y-6">
          {pendingEvents.map((event) => (
            <div key={event._id} className="border p-4 rounded shadow bg-white">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <button
                  className="text-sm text-indigo-600 hover:underline"
                  onClick={() =>
                    setExpandedEvent((prev) =>
                      prev === event._id ? null : event._id
                    )
                  }
                >
                  {expandedEvent === event._id ? "Hide" : "View"} Details
                </button>
              </div>

              {expandedEvent === event._id && (
                <div className="mt-3 text-sm space-y-2">
                  <p><strong>Description:</strong> {event.description}</p>
                  <p><strong>Category:</strong> {event.category}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                  <p><strong>Location:</strong> {event.location}</p>

                  <div>
                    <strong>Images:</strong>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {event.images?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="event"
                          className="w-28 h-20 object-cover rounded shadow cursor-pointer"
                          onClick={() => setSelectedImage(img)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    <div>
                      <strong>VIP:</strong> ₹{event.tickets?.VIP?.price} ×{" "}
                      {event.tickets?.VIP?.quantity}
                    </div>
                    <div>
                      <strong>General:</strong> ₹{event.tickets?.general?.price} ×{" "}
                      {event.tickets?.general?.quantity}
                    </div>
                    <div>
                      <strong>Host:</strong> {event.host?.name}
                    </div>
                    <div>
                      <strong>Email:</strong> {event.businessInfo?.email}
                    </div>
                    <div>
                      <strong>Org:</strong> {event.businessInfo?.organization_name}
                    </div>
                    <div>
                      <strong>Phone:</strong> {event.businessInfo?.mobile}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleApprove(event._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                  disabled={submitting}
                >
                  Approve
                </button>
                <input
                  type="text"
                  placeholder="Rejection reason"
                  value={rejectionReason[event._id] || ""}
                  onChange={(e) =>
                    setRejectionReason((prev) => ({
                      ...prev,
                      [event._id]: e.target.value,
                    }))
                  }
                  className="border px-2 py-1 rounded w-64"
                />
                <button
                  onClick={() => handleReject(event._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                  disabled={submitting}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={pagination.page === 1}
              className="px-4 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm pt-1">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={pagination.page === pagination.totalPages}
              className="px-4 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full preview"
            className="max-w-[90vw] max-h-[85vh] rounded shadow-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default EventVerificationAdmin;
