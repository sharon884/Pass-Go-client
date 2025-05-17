"use client"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../utils/api/api"

const EventDetails = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/user/events/approvedevents/${id}`)
        console.log(response.data.event)

        setEvent(response.data.event)
      } catch (error) {
        console.log("Failed to fetch event", error)
      }
    }
    fetchEvent()
  }, [id])

  // Auto-slide functionality for images
  useEffect(() => {
    if (!event || !event.images || event.images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % event.images.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [event])

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!event)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-[#5B3DF5] text-xl font-semibold">Loading....</div>
      </div>
    )

  console.log("Business Info: ", event.businessInfo)

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white">
      {/* Hero Section with Image Carousel */}
      <div className="relative rounded-xl overflow-hidden mb-8 shadow-md">
        {event.images && event.images.length > 0 && (
          <div className="relative h-64 md:h-96">
            {event.images.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${event.title} - image ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Carousel indicators */}
            {event.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {event.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "w-8 bg-[#5B3DF5]" : "w-2 bg-white/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-[#5B3DF5] text-white text-sm font-medium px-3 py-1.5 rounded-full">
                {event.category}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Event Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4">{event.title}</h1>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-[#D1D5DB]">
            <h2 className="text-xl font-semibold text-[#1F2937] mb-4">About This Event</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-24 flex-shrink-0 text-gray-500 font-medium">Date:</div>
                <div className="text-[#1F2937]">{formatDate(event.date)}</div>
              </div>

              <div className="flex items-start">
                <div className="w-24 flex-shrink-0 text-gray-500 font-medium">Time:</div>
                <div className="text-[#1F2937]">{event.time}</div>
              </div>

              <div className="flex items-start">
                <div className="w-24 flex-shrink-0 text-gray-500 font-medium">Location:</div>
                <div className="text-[#1F2937]">{event.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Section */}
        <div>
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-[#D1D5DB]">
            <h3 className="text-xl font-semibold text-[#1F2937] mb-4">Tickets</h3>

            {/* VIP Ticket */}
            <div className="mb-4 p-4 bg-white rounded-lg border border-[#D1D5DB]">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-[#1F2937]">VIP</span>
                <span className="text-[#5B3DF5] font-bold">{event?.tickets?.VIP?.price ?? "N/A"}</span>
              </div>
              <div className="text-sm text-gray-500">Available: {event?.tickets?.VIP?.quantity ?? "N/A"}</div>
            </div>

            {/* General Ticket */}
            <div className="mb-4 p-4 bg-white rounded-lg border border-[#D1D5DB]">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-[#1F2937]">General</span>
                <span className="text-[#5B3DF5] font-bold">{event?.tickets?.general?.price ?? "N/A"}</span>
              </div>
              <div className="text-sm text-gray-500">Available: {event?.tickets?.general?.quantity ?? "N/A"}</div>
            </div>

            <button className="w-full bg-[#5B3DF5] hover:bg-[#4930c4] text-white font-medium py-3 rounded-lg transition-colors duration-300 mt-2">
              Get Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Business Info Section */}
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-[#D1D5DB] mb-8">
        <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Organizer</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-[#1F2937]">{event.businessInfo ? event.businessInfo.name : "N/A"}</p>
            <p className="text-gray-600">{event.businessInfo ? event.businessInfo.organization_name : "N/A"}</p>
          </div>

          <div>
            <p className="flex items-center text-gray-600 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-[#5B3DF5]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {event.businessInfo?.email ?? "N/A"}
            </p>

            <p className="flex items-center text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-[#5B3DF5]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {event.businessInfo?.mobile ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
