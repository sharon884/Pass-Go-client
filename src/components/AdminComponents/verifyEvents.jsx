"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { fetchPendingEvents, approveEvent } from "../../services/admin/eventmanagement"
import { Calendar, MapPin, Tag, User, Check, X } from "lucide-react"

const AdminEventApproval = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const data = await fetchPendingEvents()
      setEvents(data.events)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (eventId) => {
    try {
      await approveEvent(eventId)
      toast.success("Event approved successfully")
      setEvents(events.filter((event) => event._id !== eventId)) // Remove from list
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleReject = async (eventId) => {
    // This is a placeholder for reject functionality
    toast.info("Reject functionality would go here")
    // Implement actual reject logic when available
  }

  // Format date nicely
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Event Approvals</h2>
          <p className="text-gray-500 mt-1">Review and approve pending events</p>
        </div>
        <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-medium flex items-center">
          <span className="mr-2">{events.length}</span> Pending Approval
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-6 shadow-sm bg-white animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="flex space-x-2 mb-4">
                <div className="h-10 bg-gray-200 rounded w-24"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border shadow-sm">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">All caught up!</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            There are no pending events that require your approval at this time.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {events.map((event) => (
            <div
              key={event._id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                    Pending
                  </span>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Tag className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{event.category}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{event.host?.name || "N/A"}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleApprove(event._id)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve Event
                  </button>
                  <button
                    onClick={() => handleReject(event._id)}
                    className="flex-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminEventApproval