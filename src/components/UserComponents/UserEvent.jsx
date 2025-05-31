"use client"
import { useEffect, useState } from "react"
import api from "../../utils/api/api"
import { Link } from "react-router-dom"

const UserEvents = () => {
  const [events, setEvents] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState({})
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchEvents = async (page = 1) => {
    try {
      const response = await api.get(`/user/events/approvedevents?page=${page}&limit=6`)
      setEvents(response.data.events)
      setTotalPages(response.data.totalPages)
      setPage(response.data.page)

      const initialImageIndices = {}
      response.data.events.forEach((event) => {
        initialImageIndices[event._id] = 0
      })
      setCurrentImageIndex(initialImageIndices)
    } catch (error) {
      console.log("events fetching error", error)
    }
  }

  useEffect(() => {
    fetchEvents(page)
  }, [page])

  useEffect(() => {
    const interval = setInterval(() => {
      if (events.length > 0) {
        setCurrentImageIndex((prevIndices) => {
          const newIndices = { ...prevIndices }

          events.forEach((event) => {
            if (event.images && event.images.length > 1) {
              newIndices[event._id] = (prevIndices[event._id] + 1) % event.images.length
            }
          })

          return newIndices
        })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [events])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Link to={`/yourEvent/${event._id}`} key={event._id} className="block group">
          <div className="bg-[#1E293B] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#334155]">
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              {event.images &&
                event.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={event.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      index === currentImageIndex[event._id] ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

              {event.images && event.images.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                  {event.images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex[event._id] ? "w-4 bg-[#14F195]" : "w-1.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="absolute top-3 left-3">
                <span className="bg-[#14F195] text-black text-xs font-semibold px-2.5 py-1 rounded-full">
                  {event.category}
                </span>
              </div>
            </div>

            <div className="p-4 text-[#F1F5F9]">
              <h2 className="text-lg font-bold mb-1 line-clamp-1">{event.title}</h2>
              <p className="text-sm text-gray-400 mb-3">{formatDate(event.date)}</p>
              <button className="w-full bg-[#14F195] hover:bg-[#0ce68d] text-black font-semibold py-2 rounded-lg transition-colors duration-300">
                View details
              </button>
            </div>
          </div>
        </Link>
      ))}
      <div className="flex justify-center items-center gap-4 mt-10 col-span-full">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-[#14F195] text-black font-semibold hover:bg-[#0ce68d] disabled:bg-gray-700 disabled:text-gray-400 transition-colors duration-300"
        >
          Previous
        </button>

        <span className="text-sm text-white">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-[#14F195] text-black font-semibold hover:bg-[#0ce68d] disabled:bg-gray-700 disabled:text-gray-400 transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UserEvents
