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

      // Initialize current image index for each event
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

  // Auto-slide functionality
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
    }, 4000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [events])

  // Format date to a more readable format
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-[#DEF2F1]">
      {events.map((event) => (
        <Link to={`/yourEvent/${event._id}`} key={event._id} className="block group">
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-[#DEF2F1]">
            {/* Image carousel */}
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

              {/* Carousel indicators */}
              {event.images && event.images.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                  {event.images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex[event._id] ? "w-4 bg-[#2B7A78]" : "w-1.5 bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-[#2B7A78] text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {event.category}
                </span>
              </div>
            </div>

            {/* Event details */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-[#17252A] mb-1 line-clamp-1">{event.title}</h2>

              <p className="text-sm text-gray-500 mb-3">{formatDate(event.date)}</p>

              <button className="w-full bg-[#4B36FF] hover:bg-[#3728CC] text-white font-medium py-2 rounded-lg transition-colors duration-300">
                View details
              </button>
            </div>
          </div>
        </Link>
      ))}
      <div className="flex justify-center items-center gap-4 mt-8 col-span-1 md:col-span-2 lg:col-span-3">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-[#4B36FF] text-white hover:bg-[#3728CC] disabled:bg-[#DEF2F1] disabled:text-[#2B7A78] transition-colors duration-300"
        >
          Previous
        </button>

        <span className="text-sm text-[#17252A]">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded bg-[#4B36FF] text-white hover:bg-[#3728CC] disabled:bg-[#DEF2F1] disabled:text-[#2B7A78] transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UserEvents
