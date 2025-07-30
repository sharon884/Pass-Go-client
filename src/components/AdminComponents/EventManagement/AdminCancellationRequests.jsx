import { useEffect, useState } from "react";
import { fetchPendingCancellationRequests, approveCancellationRequest } from "../../services/adminCancellationService";
import { toast } from "react-toastify";
import defaultEventImg from "../../assets/event-default.jpg"; // fallback image

const AdminCancellationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await fetchPendingCancellationRequests();
      setRequests(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch cancellation requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    if (!window.confirm("Are you sure you want to approve this cancellation?")) return;

    try {
      await approveCancellationRequest(requestId);
      toast.success("Cancellation approved successfully");
      getData(); // refresh
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <div>Loading cancellation requests...</div>;

  return (
    <div className="admin-cancellation-page">
      <h2>Pending Event Cancellation Requests</h2>

      {requests.length === 0 && <p>No pending requests found.</p>}

      <div className="request-list">
        {requests.map((req) => (
          <div key={req._id} className="request-card" style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0", borderRadius: "6px" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              {/* Event Image */}
              <img
                src={req.event?.bannerImage || defaultEventImg}
                alt="Event Banner"
                style={{ width: "150px", height: "100px", objectFit: "cover", borderRadius: "4px" }}
              />

              {/* Event + Host Details */}
              <div style={{ flex: 1 }}>
                <h3>{req.event?.title || "Untitled Event"}</h3>
                <p><b>Date:</b> {new Date(req.event?.startDate).toLocaleDateString()} - {new Date(req.event?.endDate).toLocaleDateString()}</p>
                <p><b>Location:</b> {req.event?.location}</p>
                <p><b>Reason:</b> {req.reason}</p>
                <p><b>Requested At:</b> {new Date(req.createdAt).toLocaleString()}</p>
              </div>

              {/* Host Info */}
              <div style={{ minWidth: "200px", textAlign: "center" }}>
                <img
                  src={req.host?.profileImage || "https://via.placeholder.com/80"}
                  alt="Host"
                  style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
                />
                <p><b>{req.host?.name}</b></p>
                <p>{req.host?.email}</p>
                <p>{req.host?.phone}</p>
              </div>
            </div>

            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => handleApprove(req._id)}
                style={{ padding: "0.5rem 1rem", background: "green", color: "#fff", border: "none", borderRadius: "4px" }}
              >
                Approve Cancellation
              </button>

              {/* Cancellation Info Box */}
              <div style={{ background: "#f8f8f8", padding: "0.5rem", borderRadius: "4px", fontSize: "0.9rem" }}>
                <p><b>⚠️ Cancellation Rule:</b></p>
                <ul>
                  <li>75% of ticket amount will be refunded to users</li>
                  <li>25% retained by admin</li>
                  <li>Free tickets will be deleted</li>
                  <li>Event will be marked as cancelled</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCancellationRequests;
