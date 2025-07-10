import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHostEventBookings } from "../../services/host/hostAnalyticsServices";
import { toast } from "sonner";
import api from "../../utils/api/api";

const HostEventAnalytics = () => {
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    setLoading(true);
    const res = await getHostEventBookings(eventId);
    if (res.success) {
      setSummary(res.data);
    } else {
      toast.error(res.message || "Failed to load event summary");
    }
    setLoading(false);
  };

  const handleCancelOffer = async () => {
    try {
      const res = await api.delete(`/host/event/${eventId}/offer`);
      if (res.data.success) {
        toast.success("Offer canceled successfully");
        fetchSummary();
      } else {
        toast.error(res.data.message || "Failed to cancel offer");
      }
    } catch (err) {
      toast.error("Error while cancelling the offer");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [eventId]);

  if (loading) return <div className="p-8">Loading event summary...</div>;
  if (!summary) return <div className="p-8">No data available.</div>;

  const { event, ticketsSold, totalRevenue, dailySales, offer } = summary;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{event.title}</h2>

      <div className="space-y-2 mb-6">
        <p><strong>Type:</strong> {event.type}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Tickets Sold:</strong> {ticketsSold}</p>
        <p><strong>Total Revenue:</strong> ₹{totalRevenue.toFixed(2)}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Daily Sales</h3>
        {dailySales.length === 0 ? (
          <p>No sales yet.</p>
        ) : (
          <ul className="space-y-1">
            {dailySales.map((d) => (
              <li key={d._id}>
                <span className="font-medium">{d._id}:</span> {d.count} tickets
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-xl shadow-md border">
        <h3 className="text-lg font-semibold mb-2">Offer Details</h3>
        {offer ? (
          <div className="space-y-1">
            <p><strong>Type:</strong> {offer.discountType}</p>
            <p><strong>Value:</strong> {offer.discountType === "percentage" ? `${offer.value}%` : `₹${offer.value}`}</p>
            <p><strong>Expires On:</strong> {new Date(offer.expiryDate).toLocaleDateString()}</p>
            <button
              onClick={handleCancelOffer}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Cancel Offer
            </button>
          </div>
        ) : (
          <p>No active offer available.</p>
        )}
      </div>
    </div>
  );
};

export default HostEventAnalytics;
