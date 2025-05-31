"use client"

import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { verifyPayment } from "../../../services/user/userPaymentServices"
import { toast } from "sonner"

const PaymentSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")

  const { razorpayPaymentId, razorpayOrderId, razorpaySignature, orderId } = location.state || {}

  useEffect(() => {
    const verify = async () => {
      try {
        if (!orderId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
          toast.error("Missing payment info")
          navigate(`/Event/${eventId}/Select-Seat-Counts`)
          return
        }

        const payload = {
          orderId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
        }

        const response = await verifyPayment(payload)
        setStatus(response.status)
        console.log(status)
        toast.error("Payment verified successfully")
      } catch (error) {
        console.error("Verification error:", error)
        toast.error(error.message || "Payment verification failed")
      } finally {
        setLoading(false)
      }
    }
    verify()
  }, [orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature, eventId, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 relative mb-6">
              <div className="absolute top-0 right-0 bottom-0 left-0 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
            <p className="text-gray-600 text-center">
              Please wait while we confirm your payment with our secure payment gateway...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        {status === "booked" ? (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 text-center mb-6">
              Your tickets have been booked successfully. You will receive a confirmation email shortly.
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 w-full mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Payment ID</span>
                <span className="text-gray-900 font-medium">{razorpayPaymentId?.substring(0, 12)}...</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Order ID</span>
                <span className="text-gray-900 font-medium">{orderId?.substring(0, 12)}...</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  Confirmed
                </span>
              </div>
            </div>
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={() => navigate(`/user/bookings`)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                My bookings
              </button>
              <button
                onClick={() => navigate(`/Event/${eventId}/Select-Seat-Counts`)}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Book More Tickets
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 text-center mb-6">
              We couldn't process your payment. Please try again or use a different payment method.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-800">Error: The payment couldn't be verified. Please try again.</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/Event/${eventId}/Select-Seat-Counts`)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
           
          </div>
        )}
      </div>

      {/* PassGo Branding */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            ></path>
          </svg>
          <span className="text-lg font-bold text-gray-900">PassGo</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">Your gateway to amazing events</p>
      </div>
    </div>
  )
}

export default PaymentSuccess
