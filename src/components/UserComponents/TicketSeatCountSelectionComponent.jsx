"use client"

import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getEventTickets } from "../../services/user/userTickerServices"
import { Calendar, Clock, Users } from "lucide-react"

const TicketSeatCountSelectionComponent = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([])
  const [seatCount, setSeatCount] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await getEventTickets(eventId)
        setTickets(tickets)
      } catch (error) {
        toast.error(error.message || "Failed to load tickets")
      } finally {
        setLoading(false)
      }
    }
    fetchTickets()
  }, [eventId])

  const handleNext = () => {
    if (seatCount < 1) {
      toast.error("Please select at least one seat")
      return
    }
    if (seatCount > 10) {
      toast.error("Maximum 10 tickets allowed per booking")
      return
    }

    navigate(`/event/${eventId}/select-seats`, {
      state: { seatCount },
    })
  }

  const handleSeatCountChange = (count) => {
    if (count > 10) {
      toast.error("Maximum 10 tickets allowed per booking")
      return
    }
    setSeatCount(count)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F9F9FB" }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: "#5B3DF5" }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: "#F9F9FB" }}>
      <div className="max-w-md mx-auto">
        <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: "#FFFFFF" }}>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
              How Many Seats?
            </h2>
            <p className="text-sm" style={{ color: "#4B4B4B" }}>
              Select the number of tickets you want to book
            </p>
          </div>

          {/* Event Illustration */}
          <div className="flex justify-center mb-8">
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#F9F9FB" }}
            >
              <div className="relative">
                <Calendar className="w-16 h-16" style={{ color: "#5B3DF5" }} />
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#7A5EFF" }}
                >
                  <Users className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Seat Count Selection */}
          <div className="mb-8">
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                <button
                  key={count}
                  onClick={() => handleSeatCountChange(count)}
                  className={`w-12 h-12 rounded-full font-semibold text-lg transition-all duration-200 ${
                    seatCount === count ? "text-white shadow-lg transform scale-105" : "text-gray-600 hover:shadow-md"
                  }`}
                  style={{
                    backgroundColor: seatCount === count ? "#5B3DF5" : "#F9F9FB",
                    border: seatCount === count ? "none" : "2px solid #E0E0E0",
                  }}
                >
                  {count}
                </button>
              ))}
            </div>
            <p className="text-xs text-center mt-3" style={{ color: "#4B4B4B" }}>
              Maximum 10 tickets per booking
            </p>
          </div>

          {/* Ticket Categories */}
          {Array.isArray(tickets) && tickets.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#1A1A1A" }}>
                Ticket Categories
              </h3>
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.category}
                    className="flex justify-between items-center p-4 rounded-lg"
                    style={{ backgroundColor: "#F9F9FB", border: "1px solid #E0E0E0" }}
                  >
                    <div>
                      <p className="font-semibold" style={{ color: "#1A1A1A" }}>
                        {ticket.category}
                      </p>
                      <p className="text-sm" style={{ color: "#4B4B4B" }}>
                        ₹{ticket.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-sm font-medium px-2 py-1 rounded"
                        style={{
                          backgroundColor: "#7A5EFF",
                          color: "#FFFFFF",
                        }}
                      >
                        Available
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manual Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2" style={{ color: "#1A1A1A" }}>
              Or enter manually:
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={seatCount}
              onChange={(e) => handleSeatCountChange(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 transition-all duration-200"
              style={{
                backgroundColor: "#FFFFFF",
                border: "2px solid #E0E0E0",
                color: "#1A1A1A",
                focusRingColor: "#7A5EFF",
              }}
              placeholder="Enter number of seats"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-lg font-semibold text-lg text-white transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: "#5B3DF5",
              ":hover": { backgroundColor: "#7A5EFF" },
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#7A5EFF")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#5B3DF5")}
          >
            Select Seats
          </button>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-xs flex items-center justify-center gap-1" style={{ color: "#4B4B4B" }}>
              <Clock className="w-3 h-3" />
              Session will expire in 15 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketSeatCountSelectionComponent
