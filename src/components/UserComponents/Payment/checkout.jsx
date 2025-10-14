"use client"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { createOrder, handlePaymentFailure } from "../../../services/user/userPaymentServices" 
import { getCheckoutDetails } from "../../../services/user/userTickerServices"

const Checkout = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedSeats, lockExpiresAt } = location.state || {}
  const [totalAmount, setTotalAmount] = useState(0)
  const [gst, setGst] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [discount, setDiscount] = useState(0) 
  const [offerApplied, setOfferApplied] = useState(false) 
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const getCheckoutAmount = async () => {
      try {
        if (!selectedSeats || !selectedSeats.length) return
        const seatIds = selectedSeats.map((seat) => seat._id)
        const res = await getCheckoutDetails(eventId, seatIds)
        setSubtotal(res.subtotal)
        setGst(res.gst)
        setTotalAmount(res.totalAmount)
        setDiscount(res.discount) 
        setOfferApplied(res.offerApplied)
      } catch (error) {
        console.error("Failed to fetch checkout details", error)
        toast.error("Failed to calculate final amount")
        navigate(-1)
      }
    }
    getCheckoutAmount()
  }, [selectedSeats, eventId, navigate]) 

  // Timer countdown
  useEffect(() => {
    if (!lockExpiresAt) return
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const expiry = new Date(lockExpiresAt).getTime()
      const difference = expiry - now
      if (difference > 0) {
        setTimeLeft(Math.floor(difference / 1000))
      } else {
        setTimeLeft(0)
        // If lock expires, redirect back to selection
        navigate(`/Event/${eventId}/Select-Seat-Counts`, { replace: true })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [lockExpiresAt, navigate, eventId])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePayment = async () => {
    try {
      const payload = {
        eventId,
        seatIds: selectedSeats.map((seat) => seat._id),
        paymentMethod: "upi",
      }
      const response = await createOrder(payload)
      const { razorpayOrderId, amount, key, orderId } = response
      
      const options = {
        key,
        amount,
        currency: "INR", // Ensure this is set to INR
        name: "PassGo Events",
        description: "Event Ticket",
        image: "https://passgo.in/logo.png",
        order_id: razorpayOrderId,
        
        // --- SUCCESS HANDLER (Original) ---
        handler: (response) => {
          navigate(`/user/event/${eventId}/payment-success`, {
            state: {
              orderId, // PaidTicket ID
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            },
          })
        },

        // --- NEW RAZORPAY FAILURE HANDLER ---
        "payment.failed": async function (response) {
            toast.error("Payment failed. Checking seat reservation status...");
            
            try {
                // 1. Call the new backend function to record failure and check retries
                await handlePaymentFailure({
                    orderId, // PaidTicket ID from initial order creation
                    razorpayOrderId: response.error.metadata.order_id,
                    errorReason: response.error.description || "User payment failure",
                });
                
                // 2. Redirect to the payment success screen (which is now the status checker)
                // Pass ONLY the PaidTicket ID (orderId) to signal a failure path
                navigate(`/user/event/${eventId}/payment-success`, {
                    state: {
                        orderId,
                    },
                });
                
            } catch (error) {
                console.error("Initial failure handling error:", error);
                // The error from handlePaymentFailure will contain the reason (e.g., permanent failure)
                toast.error(error.message || "An unrecoverable error occurred. Please select seats again.");
                navigate(`/Event/${eventId}/Select-Seat-Counts`, { replace: true }); 
            }
        },
        // --- END NEW FAILURE HANDLER ---

        prefill: {
          name: "PassGo Events",
          email: "passgoevents@gmail.com",
          contact: "9876543210",
        },
        notes: {
          address: "PassGo Events",
        },
        theme: {
          color: "#6366F1",
        },
      }
      const razor = new window.Razorpay(options)
      razor.open()
    } catch (error) {
      toast.error(error.message || "Payment initialization failed")
      console.log(error)
    }
  }

  // ... (rest of the component JSX remains the same as your file)
  if (!selectedSeats || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No seats selected</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
            </div>
            {/* Timer */}
            {timeLeft > 0 && (
              <div className="flex items-center bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Time left: {formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Seat Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Seats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>{" "}
                Selected Seats
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedSeats.map((seat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-200"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-semibold mr-3">
                        {seat.seatNumber}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Seat {seat.seatNumber}</p>
                        <p className="text-sm text-gray-600">{seat.category || "Standard"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{seat.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>{" "}
                Payment Method
              </h2>
              <div className="space-y-4">
                {/* UPI / Razorpay Default */}
                <div className="flex items-start p-4 border border-indigo-600 bg-indigo-50 rounded-lg shadow-sm">
                  <div className="w-6 h-6 text-indigo-600 mr-3">
                    <svg
                      className="w-full h-full"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM4 14v6a2 2 0 002 2h12a2 2 0 002-2v-6M4 14a8 8 0 0116 0"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Razorpay / UPI (Default)</p>
                    <p className="text-sm text-gray-600">
                      You will be redirected to Razorpay to complete the transaction via UPI, Net Banking, or Card.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-3">Order Summary</h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal ({selectedSeats.length} Seats)</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount {offerApplied ? "(Offer Applied)" : ""}</span>
                    <span>- ₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between border-t pt-3">
                  <span>GST (18%)</span>
                  <span className="font-medium">₹{gst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-2xl font-bold text-indigo-700 border-t border-gray-300 pt-4 mt-4">
                  <span>Total Payable</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Message */}
              <div className="mt-6 mb-6">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 00-8 8c0 2.904 1.792 5.567 4.5 6.708l.942-1.319A6 6 0 014 10a6 6 0 0112 0 6 6 0 01-3.442 5.389l.942 1.319C18.208 15.567 20 12.904 20 10a8 8 0 00-8-8zm-1 8a1 1 0 102 0V6a1 1 0 10-2 0v4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-800">Secure Payment</p>
                    <p className="text-xs text-green-600">
                      Your payment is protected by 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
              {/* Pay Button */}
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-indigo-500/25"
              >
                Pay ₹{totalAmount.toFixed(2)}
              </button>
              {/* Terms */}
              <p className="text-xs text-gray-500 mt-4 text-center">
                By proceeding, you agree to our{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout