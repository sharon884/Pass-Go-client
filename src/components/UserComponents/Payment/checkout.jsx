"use client"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { createOrder } from "../../../services/user/userPaymentServices"
import { getCheckoutDetails } from "../../../services/user/userTickerServices"

const Checkout = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedSeats, lockExpiresAt } = location.state || {}
  const [totalAmount, setTotalAmount] = useState(0)
  const [gst, setGst] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [discount, setDiscount] = useState(0) // Added state for discount
  const [offerApplied, setOfferApplied] = useState(false) // Added state for offerApplied
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const getCheckoutAmount = async () => {
      try {
        if (!selectedSeats || !selectedSeats.length) return
        const seatIds = selectedSeats.map((seat) => seat._id)
        // Destructure discount and offerApplied from the response
        const res = await getCheckoutDetails(eventId, seatIds)
        setSubtotal(res.subtotal)
        setGst(res.gst)
        setTotalAmount(res.totalAmount)
        setDiscount(res.discount) // Set discount
        setOfferApplied(res.offerApplied) // Set offerApplied
      } catch (error) {
        console.error("Failed to fetch checkout details", error)
        toast.error("Failed to calculate final amount")
        navigate(-1)
      }
    }
    getCheckoutAmount()
  }, [selectedSeats, eventId, navigate]) // Added eventId and navigate to dependencies

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
        navigate(-1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [lockExpiresAt, navigate])

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
      const { razorpayOrderId, amount, currency, key, orderId } = response
      console.log("razorpay order id", currency)
      const options = {
        key,
        amount,
        currency: "INR",
        name: "PassGo Events",
        description: "Event Ticket",
        image: "https://passgo.in/logo.png",
        order_id: razorpayOrderId,
        handler: (response) => {
          navigate(`/user/event/${eventId}/payment-success`, {
            state: {
              orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId,
              razorpaySignature: response.razorpay_signature,
            },
          })
        },
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
      console.log("razorpay object", razor)
      razor.open()
    } catch (error) {
      toast.error("Payment initialization failed")
      console.log(error)
    }
  }

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
                </svg>
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
                </svg>
                Payment Method
              </h2>
              <div className="space-y-3">
                <div className="flex items-center p-4 border-2 border-indigo-600 bg-indigo-50 rounded-lg">
                  <input
                    type="radio"
                    id="upi"
                    name="payment"
                    defaultChecked
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="upi" className="ml-3 flex items-center cursor-pointer">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">UPI / Cards / Wallets</p>
                      <p className="text-sm text-gray-600">Pay securely with Razorpay</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal ({selectedSeats.length} {selectedSeats.length === 1 ? "seat" : "seats"})
                  </span>
                  <span>₹{subtotal}</span>
                </div>

                {/* Display Discount if applied */}
                {offerApplied && discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Offer Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              </div>
              {/* Security Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-green-800">Secure Payment</p>
                    <p className="text-xs text-green-600">Your payment is protected by 256-bit SSL encryption</p>
                  </div>
                </div>
              </div>
              {/* Pay Button */}
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-indigo-500/25"
              >
                Pay ₹{totalAmount}
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
