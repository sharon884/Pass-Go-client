"use client";
import { useEffect, useState } from "react";
import { getUserBookings } from "../../../services/user/userBookingsServices";
import { toast } from "sonner";

const formatStatus = (status) =>
  status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown";

const BookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userBookings = await getUserBookings();
        console.log("✅ Received Bookings:", userBookings);

        if (Array.isArray(userBookings)) {
          setBookings(userBookings);
        } else {
          console.error("🛑 Response is not array:", userBookings);
          toast.error("Unexpected bookings data");
          setBookings([]);
        }
      } catch (error) {
        console.error("❌ Booking Fetch Error:", error.message);
        toast.error(error.message || "Failed to fetch bookings");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 relative mb-6">
          <div className="absolute top-0 right-0 bottom-0 left-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Loading your bookings...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <svg className="w-7 h-7 mr-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            My Bookings
          </h2>
          <p className="mt-1 text-sm text-gray-500">View and manage all your event bookings in one place.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-500 mb-6">You haven't booked any events yet. Start exploring events now!</p>
            <a
              href="/events"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Events
            </a>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden shadow-sm rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center text-indigo-600">
                            {booking.eventId?.name?.charAt(0).toUpperCase() || "E"}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{booking.eventId?.name || "Unnamed Event"}</div>
                            <div className="text-sm text-gray-500">{booking.eventId?.venue || "Venue not specified"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.eventId?.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(booking.eventId?.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {booking.seats?.map((seat) => (
                            <span key={seat._id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              {seat.seatNumber}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">₹{booking.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === "confirmed" || booking.status === "booked"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {formatStatus(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={`/booking/${booking._id}`} className="text-indigo-600 hover:text-indigo-900">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-indigo-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{booking.eventId?.name || "Unnamed Event"}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === "confirmed" || booking.status === "booked"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {formatStatus(booking.status)}
                      </span>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {new Date(booking.eventId?.date).toLocaleDateString()} at{" "}
                      {new Date(booking.eventId?.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-white px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Seats</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <div className="flex flex-wrap gap-1">
                            {booking.seats?.map((seat) => (
                              <span key={seat._id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                {seat.seatNumber}
                              </span>
                            ))}
                          </div>
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Amount</dt>
                        <dd className="mt-1 text-sm text-gray-900 font-medium sm:mt-0 sm:col-span-2">₹{booking.amount}</dd>
                      </div>
                      <div className="bg-white px-4 py-4 sm:px-6">
                        <a href={`/booking/${booking._id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          View Details
                        </a>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingsComponent;
