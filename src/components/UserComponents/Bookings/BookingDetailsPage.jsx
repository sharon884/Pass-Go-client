"use client"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserBookings } from "../../../services/user/userBookingsServices"
import { cancelFreeTicket, cancelPaidTickets } from "../../../services/user/userCancelTicketServices"
import { toast } from "sonner"
import html2canvas from "html2canvas"
import { Share2, Download } from "lucide-react"

const BookingDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const bookingType = location.state?.bookingType
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const { orders, tickets } = await getUserBookings()
        let found = null
        if (bookingType === "order") {
          found = orders.find((o) => o._id === id)
        } else if (bookingType === "ticket") {
          found = tickets.find((t) => t._id === id)
        }
        setBooking(found)
      } catch (error) {
        console.error("Failed to fetch booking:", error)
        toast.error("Failed to load booking details.")
      } finally {
        setLoading(false)
      }
    }
    fetchBookingDetails()
  }, [id, bookingType])

  const handleCancel = async () => {
    if (!booking || cancelling) return
    const confirmCancel = window.confirm("Are you sure you want to cancel this ticket?")
    if (!confirmCancel) return

    setCancelling(true)
    try {
      if (bookingType === "ticket") {
        await cancelFreeTicket(booking._id)
        toast.success("Free ticket cancelled successfully.")
      } else if (bookingType === "order") {
        await cancelPaidTickets([booking._id])
        toast.success("Paid ticket refund requested.")
      }
      setBooking((prev) => ({ ...prev, status: "cancelled" }))
      setTimeout(() => {
        navigate("/user/bookings")
      }, 2000)
    } catch (error) {
      toast.error(error.message || "Failed to cancel ticket.")
    } finally {
      setCancelling(false)
    }
  }

  const handleDownloadTicket = async (idx) => {
    const element = document.getElementById(`ticket-${idx}`)
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      })
      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = `ticket-${booking.event?.title.replace(/\s/g, "-") || "event"}-${idx + 1}.png`
      link.click()
      toast.success("Ticket downloaded successfully!")
    } catch (error) {
      console.error("Error downloading ticket:", error)
      toast.error(
        `Failed to download ticket: ${error.message}. This is likely due to unsupported CSS color functions (like 'oklch') in your global styles. Please check your 'globals.css' or 'tailwind.config.js'.`,
      )
    }
  }

  const handleShareTicket = async (idx) => {
    const element = document.getElementById(`ticket-${idx}`)
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      })
      canvas.toBlob(async (blob) => {
        if (blob && navigator.share) {
          try {
            const files = [
              new File([blob], `ticket-${booking.event?.title.replace(/\s/g, "-") || "event"}-${idx + 1}.png`, {
                type: "image/png",
              }),
            ]
            await navigator.share({
              files: files,
              title: `My Ticket for ${booking.event?.title}`,
              text: `Check out my ticket for ${booking.event?.title} on ${new Date(
                booking.event?.date,
              ).toLocaleDateString()}!`,
            })
            toast.success("Ticket shared successfully!")
          } catch (error) {
            console.error("Error sharing ticket:", error)
            if (error.name === "AbortError") {
              toast.info("Sharing cancelled.")
            } else {
              toast.error("Failed to share ticket. Your browser might not support sharing files directly.")
            }
          }
        } else {
          toast.info("Web Share API is not supported in your browser. Please download the ticket instead.")
        }
      }, "image/png")
    } catch (error) {
      console.error("Error generating image for sharing:", error)
      toast.error(
        `Failed to prepare ticket for sharing: ${error.message}. This is likely due to unsupported CSS color functions (like 'oklch') in your global styles. Please check your 'globals.css' or 'tailwind.config.js'.`,
      )
    }
  }

  if (loading) return <div className="p-6 text-center text-lg text-gray-600">Loading booking details...</div>
  if (!booking) return <div className="p-6 text-center text-red-500 text-lg">Booking not found.</div>

  const showCancelButton = booking.status !== "cancelled" && booking.status !== "created"
  const showTicketsSection =
    booking.eticketUrl?.length > 0 && booking.status !== "cancelled" && booking.status !== "created"

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{booking.event?.title}</h1>
      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Status:</strong>{" "}
          <span className={`font-semibold ${booking.status === "cancelled" ? "text-red-500" : "text-green-600"}`}>
            {booking.status.toUpperCase()}
          </span>
        </p>
        <p>
          <strong>Booking Type:</strong> {bookingType}
        </p>
        {booking.amount !== undefined && (
          <p>
            <strong>Amount Paid:</strong> ₹{booking.amount}
          </p>
        )}
        <p>
          <strong>Category:</strong> {booking.category}
        </p>
        <p>
          <strong>Location:</strong> {booking.event?.locationName || "Location not specified"}
        </p>
        <p>
          <strong>Date:</strong> {new Date(booking.event?.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {booking.event?.time}
        </p>
      </div>

      {showTicketsSection && (
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">🎫 Your E-Tickets</h3>
          {booking.eticketUrl.map((url, idx) => (
            <div
              key={idx}
              id={`ticket-${idx}`}
              className="bg-white text-black p-4 border border-gray-300 rounded-xl mb-5 w-fit mx-auto shadow-md"
            >
              <img
                src={url || "/placeholder.svg?height=150&width=150"}
                alt="QR Code"
                crossOrigin="anonymous"
                width="150"
                height="150"
                className="mb-4 mx-auto"
              />
              <p>
                <strong>Event:</strong> {booking.event?.title}
              </p>
              <p>
                <strong>Ticket ID:</strong> {booking._id}
              </p>
              <p>
                <strong>Name:</strong> {booking.user?.name || "You"}
              </p>
              <p>
                <strong>Email:</strong> {booking.user?.email || "Your Email"}
              </p>
              <p>
                <strong>Category:</strong> {booking.category}
              </p>
              <p>
                <strong>Date:</strong> {new Date(booking.event?.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {booking.event?.time}
              </p>
              <div className="flex gap-3 mt-6 w-full justify-center">
                <button
                  onClick={() => handleDownloadTicket(idx)}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
                <button
                  onClick={() => handleShareTicket(idx)}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCancelButton && (
        <button
          onClick={handleCancel}
          className={`mt-6 px-4 py-2 rounded text-white ${cancelling ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
          disabled={cancelling}
        >
          {cancelling ? "Cancelling..." : "Cancel Ticket"}
        </button>
      )}

      {booking.status === "cancelled" && (
        <p className="mt-4 text-green-600 font-semibold">This ticket has been cancelled.</p>
      )}
    </div>
  )
}

export default BookingDetailsPage
