// src/components/HostComponets/HostEvent.jsx

"use client"
import { useEffect, useState } from "react"
import { fetchHostEvents } from "../../services/host/hostEventServices"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Calendar, Tag, CheckCircle, Clock, XCircle, ArrowRight, TrendingUp } from 'lucide-react'; // Added Lucide icons for cleaner look

const HostEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const HostEventData = await fetchHostEvents()
        if (!HostEventData.success) {
          setError(HostEventData.message)
          toast.error(HostEventData.message || "Failed to fetch events")
          return
        }
        setEvents(HostEventData.events)
        toast.success(HostEventData.message || "Events loaded successfully")
      } catch (error) {
        // Logging error details to console for debugging
        console.error("Fetch Events Error:", error);
        // Using a more general error message for the user
        setError("Could not load events. Please try again.") 
        toast.error(error.response?.data?.message || "Failed to load events.")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
    // Dependency array includes 'fetchHostEvents' if it's not stable. Assuming stable dependencies.
  }, []) 

  // --- 1. Loading State UI ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 relative mb-6">
          {/* Enhanced Spinner for loading state */}
          <div className="absolute top-0 right-0 bottom-0 left-0 border-4 border-[#5C3BFE] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700">Loading your events...</h2>
      </div>
    )
  }

  // --- 2. Error State UI ---
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Events</h3>
          <p className="text-gray-500 mb-6 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-[#5C3BFE] hover:bg-[#4C2BEE] text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-lg"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // --- 3. Main Content Rendering ---
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <Calendar className="w-8 h-8 mr-4 text-[#5C3BFE]" />
            Your Events
          </h2>
          <p className="mt-2 text-lg text-gray-600">Manage and track all your hosted events.</p>
        </div>

        {/* Events Container (Table/Cards) */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {events.length === 0 ? (
            // --- 4. No Events State UI ---
            <div className="text-center py-20 px-4">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Calendar className="w-12 h-12 text-[#5C3BFE]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                You haven't created any events yet. Start by creating your first event!
              </p>
              <button
                onClick={() => navigate("/host/create-event")} // NOTE: Reverted to your original 'Create Event' path
                className="bg-[#5C3BFE] hover:bg-[#4C2BEE] text-white py-3 px-8 rounded-full font-semibold transition-colors inline-flex items-center shadow-md"
              >
                <ArrowRight className="w-5 h-5 mr-2 transform rotate-45" />
                Create Event
              </button>
            </div>
          ) : (
            <>
              {/* Table Header Section */}
              <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-3 text-[#5C3BFE]" />
                  Events Overview ({events.length} {events.length === 1 ? "Event" : "Events"})
                </h3>
              </div>

              {/* --- 5. Desktop Table View (lg+) --- */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">
                        Event Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">
                        Bookings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event) => (
                      <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                              <Calendar className="w-6 h-6 text-[#5C3BFE]" />
                            </div>
                            <div>
                              <div className="text-base font-bold text-gray-900">{event.title}</div>
                              <div className="text-sm text-gray-500">ID: {event._id.slice(-6)}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Tag className="w-3 h-3 mr-1" />
                            {event.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            {new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {event.isApproved ? (
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                              Approved
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                              <Clock className="w-3.5 h-3.5 mr-1.5" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {/* Restored to original navigation path */}
                          <button   
                            onClick={() => navigate(`/host/events-summary/${event._id}`)} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center shadow-md hover:shadow-lg"
                          >
                            Bookings
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* --- 6. Mobile Card View (hidden lg) --- */}
              <div className="lg:hidden p-4 space-y-4">
                {events.map((event) => (
                  <div key={event._id} className="bg-white border border-gray-200 rounded-xl shadow-lg p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <Calendar className="w-5 h-5 text-[#5C3BFE]" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{event.title}</h3>
                          <p className="text-xs text-gray-500">ID: {event._id.slice(-6)}</p>
                        </div>
                      </div>
                      {/* Status Tag */}
                      {event.isApproved ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      )}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-5 border-t pt-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 flex items-center">
                          <Tag className="w-4 h-4 mr-1" /> Category
                        </p>
                        <p className="text-sm text-gray-900 mt-1">{event.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" /> Date
                        </p>
                        <p className="text-sm text-gray-900 mt-1">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end">
                      {/* Restored to original navigation path */}
                      <button    
                        onClick={() => navigate(`/host/events-summary/${event._id}`)} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors inline-flex items-center shadow-md w-full justify-center"
                      >
                        View Bookings
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Create Event Button - Aligned to bottom center of page content */}
        {events.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/host/add")} // Restored to original navigation path
              className="bg-[#5C3BFE] hover:bg-[#4C2BEE] text-white py-3 px-8 rounded-full font-semibold transition-colors inline-flex items-center shadow-xl hover:shadow-2xl text-lg"
            >
              <Calendar className="w-6 h-6 mr-2" />
              Create New Event
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HostEvents