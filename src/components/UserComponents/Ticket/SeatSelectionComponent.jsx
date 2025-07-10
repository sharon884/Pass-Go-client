"use client"
import { useEffect, useState } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { getAllSeatsForEvent, lockSeats, unlockSeats } from "../../../services/user/userTickerServices"
import useSeatSocket from "./useSeatSocket"
import useInterval from "../../../hooks/useInterval"
import useUnlockOnLeave from "../../../hooks/useUnlockLeave"
import SeatGrid from "./SeatGrid"

const SeatSelectionComponent = () => {
  const { eventId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const seatCount = location.state?.seatCount || 1

  const [seats, setSeats] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [seatLockedConfirmed, setSeatLockedConfirmed] = useState(false)

  const [, forceUpdate] = useState(0)

  const unlockseats = useUnlockOnLeave(eventId, selectedSeats, seatLockedConfirmed)

  useSeatSocket(eventId, seats, setSeats)

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seatData = await getAllSeatsForEvent(eventId)
        setSeats(seatData)
      } catch (error) {
        toast.error(error.message || "Error loading seats")
      } finally {
        setLoading(false)
      }
    }
    fetchSeats()
  }, [eventId])

  useEffect(() => {
    return () => {
      unlockSeats(eventId, selectedSeats)
    }
  }, [eventId, selectedSeats])

  useInterval(() => forceUpdate((n) => n + 1), 1000)

  const handleConfirmSelection = async () => {
    try {
      const selectedSeatsDetails = seats.filter((seat) => selectedSeats.includes(seat._id))
      const response = await lockSeats(eventId, selectedSeats)
      toast.success("Seats locked successfully!")
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          selectedSeats.includes(seat._id)
            ? {
                ...seat,
                status: "locked",
                lockExpiresAt: response.lockExpiresAt,
              }
            : seat,
        ),
      )
      setSeatLockedConfirmed(true)
      navigate(`/user/event/${eventId}/checkout`, {
        state: {
          selectedSeats: selectedSeatsDetails,
          lockExpiresAt: response.lockExpiresAt,
        },
      })
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCancelSelection = () => {
    if (selectedSeats.length > 0) {
      unlockSeats(eventId, selectedSeats)
    }
    navigate(-1)
  }

  const handleSeatClick = (seatId) => {
    const seat = seats.find((s) => s._id === seatId)

    // Don't allow clicking on booked or locked seats
    if (seat.status === "booked" || seat.status === "locked") {
      return
    }

    if (selectedSeats.includes(seatId)) {
      // If seat is already selected, remove it (deselect)
      setSelectedSeats((prev) => prev.filter((id) => id !== seatId))
    } else {
      // If seat is not selected
      if (selectedSeats.length < seatCount) {
        // If we haven't reached the limit, add the seat
        setSelectedSeats((prev) => [...prev, seatId])
      } else {
        // If we've reached the limit, replace the first selected seat with the new one
        // This creates the BookMyShow-style behavior
        setSelectedSeats((prev) => {
          const newSelection = [...prev]
          newSelection.shift() // Remove the first (oldest) selected seat
          newSelection.push(seatId) // Add the new seat
          return newSelection
        })
      }
    }
  }

  // Separate VIP and General seats
  const vipSeats = seats.filter((seat) => seat.category === "VIP")
  const generalSeats = seats.filter((seat) => seat.category === "general")

  // Group seats by rows and break into chunks
  const groupSeatsByRow = (seatArray, seatsPerRow = 22) => {
    const grouped = {}
    seatArray.forEach((seat) => {
      const rowLetter = seat.seatNumber.charAt(0)
      if (!grouped[rowLetter]) {
        grouped[rowLetter] = []
      }
      grouped[rowLetter].push(seat)
    })

    // Sort seats within each row by seat number
    Object.keys(grouped).forEach((row) => {
      grouped[row].sort((a, b) => {
        const numA = Number.parseInt(a.seatNumber.slice(1))
        const numB = Number.parseInt(b.seatNumber.slice(1))
        return numA - numB
      })
    })

    // Break each row into chunks of seatsPerRow
    const chunkedGrouped = {}
    Object.keys(grouped).forEach((row) => {
      const chunks = []
      for (let i = 0; i < grouped[row].length; i += seatsPerRow) {
        chunks.push(grouped[row].slice(i, i + seatsPerRow))
      }
      chunkedGrouped[row] = chunks
    })

    return chunkedGrouped
  }

  const vipRows = groupSeatsByRow(vipSeats, 20)
  const generalRows = groupSeatsByRow(generalSeats, 24)

  const getSeatColor = (seat) => {
    if (seat.status === "booked") return "bg-red-500"
    if (seat.status === "locked") return "bg-orange-500"
    if (selectedSeats.includes(seat._id)) return "bg-green-500"
    return "bg-gray-200 hover:bg-blue-200"
  }

  const getSeatTextColor = (seat) => {
    if (seat.status === "booked" || seat.status === "locked" || selectedSeats.includes(seat._id)) {
      return "text-white"
    }
    return "text-gray-700"
  }

  const getTimeRemaining = (expiryTime) => {
    if (!expiryTime) return null
    const now = new Date().getTime()
    const expiry = new Date(expiryTime).getTime()
    const timeLeft = expiry - now

    if (timeLeft <= 0) return "0:00"

    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60)
    const seconds = Math.floor((timeLeft / 1000) % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const renderSeatChunk = (seatChunk, rowLetter, chunkIndex) => {
    return (
      <div key={`${rowLetter}-${chunkIndex}`} className="flex items-center justify-center mb-2">
        <div className="w-8 text-center font-medium text-gray-600 mr-4">{chunkIndex === 0 ? rowLetter : ""}</div>
        <div className="flex gap-1 flex-wrap justify-center">
          {seatChunk.map((seat) => (
            <div key={seat._id} className="relative">
              <button
                onClick={() => handleSeatClick(seat._id)}
                disabled={seat.status === "booked" || seat.status === "locked"}
                className={`
                  w-8 h-8 rounded text-xs font-medium transition-all duration-200 
                  ${getSeatColor(seat)} ${getSeatTextColor(seat)}
                  ${seat.status === "available" ? "cursor-pointer hover:scale-105" : "cursor-not-allowed"}
                  disabled:opacity-75 border border-gray-300 m-0.5
                `}
                title={`Seat ${seat.seatNumber} - ${seat.status}`}
              >
                {seat.seatNumber.slice(1)}
              </button>
              {seat.status === "locked" && seat.lockExpiresAt && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-100 text-orange-800 text-[8px] px-1 rounded-sm whitespace-nowrap">
                  {getTimeRemaining(seat.lockExpiresAt)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderRowSection = (rowsData, sectionTitle, bgColor) => {
    if (Object.keys(rowsData).length === 0) return null

    return (
      <div className="mb-8">
        <h3
          className={`text-lg font-semibold ${sectionTitle === "VIP SEATS" ? "text-purple-600" : "text-blue-600"} text-center mb-4`}
        >
          {sectionTitle}
        </h3>
        <div className={`${bgColor} p-4 rounded-lg`}>
          {Object.keys(rowsData)
            .sort()
            .map((rowLetter) => (
              <div key={rowLetter} className="mb-4">
                {rowsData[rowLetter].map((chunk, chunkIndex) => renderSeatChunk(chunk, rowLetter, chunkIndex))}
              </div>
            ))}
        </div>
      </div>
    )
  }

  return loading ? (
    <div className="flex items-center justify-center min-h-64">
      <div className="text-lg text-gray-600">Loading seats...</div>
    </div>
  ) : (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select {seatCount} Seat(s)</h2>
        <div className="text-sm text-gray-600">
          Selected: {selectedSeats.length} / {seatCount}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-sm text-gray-600">Locked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Booked</span>
        </div>
      </div>

      {/* Screen */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gray-800 text-white px-8 py-2 rounded-t-lg text-sm font-medium">SCREEN</div>
      </div>

      {/* VIP Seats Section */}
      {renderRowSection(vipRows, "VIP SEATS", "bg-purple-50")}

      {/* General Seats Section */}
      {renderRowSection(generalRows, "GENERAL SEATS", "bg-blue-50")}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handleCancelSelection}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>

        {selectedSeats.length === seatCount && (
          <button
            onClick={handleConfirmSelection}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Confirm Selection
          </button>
        )}
      </div>

      {/* Original SeatGrid component (hidden but keeping for compatibility) */}
      <div className="hidden">
        <SeatGrid
          seats={seats}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          seatCount={seatCount}
          button={handleCancelSelection}
        />
      </div>
    </div>
  )
}

export default SeatSelectionComponent
