"use client"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchApproveEvents } from "../../services/user/userEventServices"
import { useTheme } from "../../contexts/ThemeContext"

const CategoryEvents = () => {
  const { categoryName } = useParams()
  const [events, setEvents] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { theme, currentTheme } = useTheme()

  console.log(categoryName)
  useEffect(() => {
    const fetchCategoryEvents = async () => {
      try {
        const response = await fetchApproveEvents(page, 8, "all", "", categoryName)
        setEvents(response.events)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error("Error fetching category events:", error)
      }
    }

    fetchCategoryEvents()
  }, [categoryName, page])

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
    <div
      className="min-h-screen p-6"
      style={{ background: currentTheme === "classic" ? "#ffffff" : theme.colors.primaryBg }}
    >
      <h2
        className={`text-2xl sm:text-3xl font-bold text-center mb-8 capitalize ${
          currentTheme === "classic" ? "text-gray-800" : "text-white"
        }`}
      >
        {categoryName} Events
      </h2>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.length > 0 ? (
          events.map((event) => (
            <Link
              to={`/your-event/${event._id}`}
              key={event._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={event.images?.[0] || "/placeholder.svg"}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{formatDate(event.date)}</p>
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    event.eventType === "free"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {event.eventType === "free" ? "Free" : "Paid"}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p
            className={`text-center text-lg mt-8 ${
              currentTheme === "classic" ? "text-gray-600" : "text-white/80"
            }`}
          >
            No events found for this category.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default CategoryEvents
