"use client"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserBookings } from "../../../services/user/userBookingsServices"
// Note: These imports use the functions you provided in the API file
import { cancelFreeTicket, cancelPaidTickets } from "../../../services/user/userCancelTicketServices" 
import { toast } from "sonner"
// Removed: html2canvas, Share2, Download

const BookingDetailsPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const bookingType = location.state?.bookingType
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false) // New state for modal

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await getUserBookings()
        
        const { orders, tickets } = response
        
        let found = null
        if (bookingType === "order") {
          found = orders?.find((o) => o._id === id)
        } else if (bookingType === "ticket") {
          found = tickets?.find((t) => t._id === id)
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

  // NEW: Function to execute cancellation after modal confirmation
  const confirmCancellation = async () => {
    if (!booking || cancelling) return
    
    setShowCancelModal(false) // Close the modal
    setCancelling(true) // Start loading state
    
    try {
      if (bookingType === "ticket") {
        await cancelFreeTicket(booking._id)
        toast.success("Free ticket cancelled successfully.")
      } else if (bookingType === "order") {
        // Note: For paid tickets, we cancel the order, which contains the tickets
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

  // UPDATED: Function to only open the confirmation modal
  const handleCancel = () => {
    if (!booking || cancelling) return
    setShowCancelModal(true) // Open the modal
  }

  if (loading) return <div className="p-6 text-center text-lg text-gray-600">Loading booking details...</div>
  if (!booking) return <div className="p-6 text-center text-red-500 text-lg">Booking not found.</div>

  const showCancelButton = booking.status !== "cancelled" && booking.status !== "created"
  const showTicketsSection =
    booking.eticketUrl?.length > 0 && booking.status !== "cancelled" && booking.status !== "created"

  // Helper component for detail rows
  const DetailItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase text-gray-500">{label}</span>
        <span className="text-sm font-bold text-gray-800 break-words">{value}</span>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">{booking.event?.title}</h1>
      <p className="text-md text-gray-500 mb-6">Booking ID: <span className="font-mono text-xs">{booking._id}</span></p>

      <div className="space-y-3 text-gray-700 p-4 border rounded-xl bg-white shadow-sm mb-8">
        <p>
          <strong>Status:</strong>{" "}
          <span className={`font-bold text-lg ${booking.status === "cancelled" ? "text-red-500" : "text-green-600"}`}>
            {booking.status.toUpperCase()}
          </span>
        </p>
        <p>
          <strong>Total Tickets:</strong> {booking.eticketUrl?.length || 0}
        </p>
        {booking.amount !== undefined && (
          <p>
            <strong>Total Amount Paid:</strong> ₹{booking.amount}
          </p>
        )}
      </div>

      {showTicketsSection && (
        <div className="mt-8">
          <h3 className="font-extrabold text-2xl text-gray-800 mb-6 border-b-2 border-indigo-200 pb-2">
            🎫 Your E-Tickets ({booking.eticketUrl.length})
          </h3>
          <div className="grid grid-cols-1 gap-8">
            {booking.eticketUrl.map((url, idx) => {
              const seatDetail = booking.seats && booking.seats.length > idx ? booking.seats[idx] : { seatNumber: ["N/A"], price: 0 };
              const eventImage = booking.event?.images?.[0] || "/placeholder-event.svg";
              const hostName = booking.event?.businessInfo?.organization_name || booking.event?.businessInfo?.name || "Host Details Unavailable";
              const ticketNumber = seatDetail.seatNumber ? seatDetail.seatNumber.join(", ") : "General Admission";

              return (
                <div
                  key={idx}
                  className="relative bg-white rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300 border-2 border-dashed border-indigo-400 max-w-2xl mx-auto" 
                >
                  {/* Header / Event Image and Title */}
                  <div
                    className="h-16 bg-cover bg-center flex items-end p-3" 
                    style={{ backgroundImage: `url(${eventImage})` }}
                  >
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 w-full">
                      <span className="text-xs font-semibold text-white bg-indigo-700 px-2 py-0.5 rounded-full shadow-lg">
                        {booking.category.toUpperCase()} TICKET
                      </span>
                      <h4 className="text-lg font-extrabold text-white mt-0.5 leading-snug truncate">
                        {booking.event?.title}
                      </h4>
                    </div>
                  </div>

                  {/* Ticket Body: Details and QR Code */}
                  <div className="p-3 grid grid-cols-5 gap-3"> 
                    {/* Left Column: Key Details */}
                    <div className="col-span-3 space-y-3 border-r border-dashed border-gray-300 pr-3"> 
                        
                        <div className="flex justify-between items-center pb-1 border-b border-gray-100">
                          <span className="text-xs font-semibold uppercase text-gray-500">Ticket Ref.</span>
                          <span className="text-md font-extrabold text-indigo-600"> 
                            #TICKET-{idx + 1}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 gap-x-3"> 
                          <DetailItem label="Seat/Section" value={ticketNumber} />
                          <DetailItem label="Event Type" value={booking.event?.eventType.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'N/A'} />
                          <DetailItem 
                            label="Date" 
                            value={new Date(booking.event?.date).toLocaleDateString()} 
                          />
                          <DetailItem label="Time" value={booking.event?.time} />
                            <DetailItem label="Host" value={hostName} />
                        </div>
                        
                        <div className="pt-2 border-t border-gray-100"> 
                          <h5 className="text-xs font-semibold text-gray-500 mb-0.5">Venue</h5>
                            <p className="text-sm font-bold text-gray-800 break-words">{booking.event?.locationName || 'Location Not Specified'}</p>
                        </div>
                        
                    </div>

                    {/* Right Column: QR Code */}
                    <div className="col-span-2 flex flex-col items-center justify-center space-y-2"> 
                      <div className="relative w-full aspect-square max-w-[90px] bg-white border-2 border-indigo-200 p-1 rounded-lg shadow-md"> 
                        <img
                          src={url || "/placeholder-qr.svg"}
                          alt="QR Code"
                          crossOrigin="anonymous"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-[10px] font-bold text-indigo-600 text-center uppercase">Entry Code</p> 
                    </div>
                  </div>
                  
                  {/* Ticket Footer / Price and Attendee Info */}
                  <div className="px-4 py-2 bg-indigo-50 border-t-2 border-dashed border-indigo-300 flex justify-between items-end"> 
                        <div className="flex flex-col min-w-0">
                            <p className="text-xs font-medium text-gray-800 uppercase">Attendee</p>
                            <p className="text-sm font-bold text-indigo-900 leading-tight truncate">{booking.user?.name || "You"}</p>
                            <p className="text-xs text-indigo-500 leading-tight truncate">Host: {booking.event?.businessInfo?.email || 'Host Contact N/A'}</p>
                        </div>
                      <div className="text-right">
                            <p className="text-xs font-medium text-gray-800 uppercase">Price</p>
                          <p className="text-xl font-extrabold text-indigo-700 leading-none">
                            {seatDetail.price === 0 ? "FREE" : `₹${seatDetail.price}`}
                          </p>
                        </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {showCancelButton && (
        <button
          onClick={handleCancel} // Opens the modal
          className={`mt-10 w-full px-4 py-3 rounded text-white font-semibold transition-all shadow-md ${cancelling ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
          disabled={cancelling}
        >
          {cancelling ? "Cancelling..." : "Request Cancellation & Refund"}
        </button>
      )}

      {booking.status === "cancelled" && (
        <p className="mt-4 text-center text-red-600 font-semibold text-lg border border-red-300 p-3 rounded-lg bg-red-50">This booking has been cancelled and {bookingType === 'order' ? 'refund processing has been initiated.' : 'tickets have been released.'}</p>
      )}
      
      {/* ----------------- CANCELLATION MODAL ----------------- */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-sm transform transition-transform duration-300 scale-100">
            <h3 className="text-xl font-bold text-red-600 mb-4 border-b pb-2">Confirm Cancellation</h3>
            
            <p className="text-gray-700 mb-6 text-sm">
              Are you sure you want to cancel this booking? 
              <span className="font-semibold block mt-2 text-base">
                {bookingType === "order" ? "A refund will be requested for paid tickets (check refund policy)." : "Free tickets will be instantly cancelled."}
              </span>
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                disabled={cancelling}
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancellation} // Calls the function to execute API logic
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300"
                disabled={cancelling}
              >
                {cancelling ? "Processing..." : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ------------------------------------------------------ */}

    </div>
  )
}

export default BookingDetailsPage