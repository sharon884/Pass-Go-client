"use client"

import { useEffect, useState, useCallback } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { 
    verifyPayment, 
    handlePaymentFailure, 
    initiatePaymentRetry 
} from "../../../services/user/userPaymentServices"

const PaymentSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("") // 'booked', 'retry_pending', 'failed_permanent', 'failed_lock_expired'
  const [failureReason, setFailureReason] = useState(null)
  const [newRazorpayOrder, setNewRazorpayOrder] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const { razorpayPaymentId, razorpayOrderId, razorpaySignature, orderId } = location.state || {}

  // Function to open the Razorpay modal
  const openRazorpay = useCallback((orderData) => {
    const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: "INR",
        name: "PassGo Events",
        description: "Event Ticket Retry",
        image: "https://passgo.in/logo.png",
        order_id: orderData.razorpayOrderId,
        
        // --- SUCCESS HANDLER ---
        handler: (response) => {
            // Recurse to this component with success data
            navigate(`/user/event/${eventId}/payment-success`, {
                state: {
                    orderId: orderData.orderId, 
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                },
                replace: true,
            })
        },

        // --- FAILURE HANDLER (Retry flow starts over) ---
        "payment.failed": async function (response) {
            setLoading(true);
            toast.error("Payment failed again. Checking status...");
            
            try {
                // Call the new backend function to record the second failure
                await handlePaymentFailure({
                    orderId: orderData.orderId,
                    razorpayOrderId: response.error.metadata.order_id,
                    errorReason: response.error.description || "User payment failure on retry",
                });
                
                // On failure, status will now be updated in the PaidTicket model, 
                // re-running the useEffect below will fetch the new status
                
            } catch (error) {
                console.error("Retry failure handling error:", error);
                setFailureReason(error.message || "Retry failed permanently.");
            } finally {
                // Rerun useEffect to check the final PaidTicket status
                setStatus('initial_check'); 
                setLoading(false);
            }
        },

        theme: {
            color: "#6366F1",
        },
    }
    const razor = new window.Razorpay(options)
    razor.open()
  }, [eventId, navigate])

  // Function to initiate the retry process
  const handleRetry = async () => {
    setLoading(true);
    try {
        if (!orderId) {
            toast.error("Missing original order ID.");
            return;
        }

        const retryRes = await initiatePaymentRetry({ orderId });
        
        setNewRazorpayOrder(retryRes);
        setRetryCount(retryRes.retryCount);
        setLoading(false);
        setStatus('retry_pending'); // Status is pending until Razorpay opens

        // Open the modal immediately with the new order details
        openRazorpay(retryRes);

    } catch (error) {
        setLoading(false);
        // Backend returns specific errors here: 'lock_expired' or 'permanent_failure'
        if (error.status === 'lock_expired') {
            setStatus('failed_lock_expired');
            setFailureReason(error.message);
            toast.error(error.message);
        } else {
            setStatus('failed_permanent');
            setFailureReason(error.message || "Failed to initiate retry.");
            toast.error(error.message || "Failed to initiate retry.");
        }
    }
  }

  useEffect(() => {
    const verifyOrCheckStatus = async () => {
      setLoading(true);
      try {
        // --- 1. SUCCESS PATH: All IDs are present (either initial success or successful retry) ---
        if (orderId && razorpayPaymentId && razorpayOrderId && razorpaySignature) {
            // Your original verification logic
            const payload = { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature }
            const response = await verifyPayment(payload)
            setStatus(response.status) // Should be 'booked'
            toast.success("Payment verified successfully!")
            
        // --- 2. FAILURE/RETRY PATH: Only PaidTicket ID is present (redirect from failure) ---
        } else if (orderId && !razorpayPaymentId) {
            // Check the current status of the PaidTicket from the failure handler
            const checkRes = await handlePaymentFailure({ orderId, checkStatusOnly: true }); 
            
            setStatus(checkRes.status); // e.g., 'retry_pending', 'failed_permanent'
            setRetryCount(checkRes.retryCount);
            setFailureReason(checkRes.failureReason || null);

            // If it's a soft failure, give the user the retry option
            if (checkRes.status === 'retry_pending') {
                toast.warning("Payment failed, but your seats are temporarily reserved. Try again.");
            } else {
                toast.error("Payment failed permanently. Seats have been released.");
            }
        } else {
            // Missing all crucial info (should rarely happen)
            toast.error("Missing payment info. Redirecting to seat selection.")
            navigate(`/Event/${eventId}/Select-Seat-Counts`, { replace: true })
            return
        }
      } catch (error) {
        console.error("Verification/Status Check error:", error)
        
        // This handles errors returned by the services
        if (error.status === 'failed_lock_expired') {
            setStatus('failed_lock_expired');
        } else if (error.status === 'failed_permanent') {
            setStatus('failed_permanent');
        } else {
            setStatus("failed_permanent"); // Default to permanent failure on unknown error
        }
        toast.error(error.message || "Payment verification failed or status check failed.")
      } finally {
        setLoading(false)
      }
    }
    
    // Only run if status hasn't been set by a retry attempt
    if (!['retry_pending', 'failed_permanent', 'failed_lock_expired'].includes(status)) {
        verifyOrCheckStatus();
    }
    
  }, [orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature, eventId, navigate, status])


  // Helper for rendering failure/retry UI
  const renderFailureUI = () => {
    let title = "Payment Failed"
    let message = "An error occurred during payment. Your seats may have been released."
    let buttonText = "Select Seats Again"
    let buttonAction = () => navigate(`/Event/${eventId}/Select-Seat-Counts`, { replace: true })
    let showRetryButton = false
    let icon = (
        <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-12a1 1 0 102 0V6a1 1 0 00-2 0zM9 10a1 1 0 102 0V7a1 1 0 10-2 0v3z" clipRule="evenodd" />
        </svg>
    );

    if (status === 'retry_pending') {
        title = "Payment Pending/Failed";
        message = `You have ${3 - retryCount} retries remaining. Your seats are still reserved for now. Please try your payment again.`;
        showRetryButton = true;
        icon = (
             <svg className="w-10 h-10 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 00-8 8c0 2.455 1.192 4.636 3.003 5.922l.535-.747A6 6 0 114 10a6 6 0 0110.134-4.545l-1.354 1.354A1 1 0 0013 8h5a1 1 0 001-1V2a1 1 0 00-1-1l-1.354 1.354A8 8 0 0010 2zM10 4a1 1 0 011 1v2a1 1 0 11-2 0V5a1 1 0 011-1z" />
            </svg>
        );
    } else if (status === 'failed_lock_expired') {
        title = "Reservation Expired";
        message = failureReason || "Your seat reservation window has expired. You must select your seats again.";
    } else if (status === 'failed_permanent') {
        title = "Payment Failed Permanently";
        message = failureReason || "The maximum number of retries has been reached, or the failure was unrecoverable. Please select your seats again.";
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-md">
                {icon}
            </div>
            <h2 className="text-3xl font-extrabold text-red-700 mb-2 tracking-wide">{title}</h2>
            <p className="text-lg text-gray-700 font-medium text-center mb-2">{message}</p>
            <p className="text-sm text-gray-500 text-center mb-6">Order Ref.: {orderId?.substring(0, 18)}...</p>
            
            <div className="flex flex-col w-full gap-3">
                {showRetryButton && (
                    <button
                        onClick={handleRetry}
                        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg"
                    >
                        Try Payment Again (Attempt {retryCount + 1})
                    </button>
                )}
                <button
                    onClick={buttonAction}
                    className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
  };
  

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
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        {status === "booked" ? (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-md">
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-indigo-700 mb-2 tracking-wide">Booking Confirmed! 🎉</h2>
            <p className="text-lg text-gray-700 font-medium text-center mb-2">
              You're all set to go! Get ready for an amazing experience.
            </p>
            <p className="text-sm text-gray-500 text-center mb-6">
              Your tickets and confirmation details have been sent to your registered email address.
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 w-full mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 font-semibold">Transaction Status:</span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  SUCCESS
                </span>
              </div>
              <div className="flex justify-between items-center mb-2 border-t border-indigo-100 pt-2">
                <span className="text-gray-600">Payment ID</span>
                <span className="text-gray-900 font-medium text-xs">{razorpayPaymentId?.substring(0, 18)}...</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order Ref.</span>
                <span className="text-gray-900 font-medium text-xs">{orderId?.substring(0, 18)}...</span>
              </div>
            </div>
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={() => navigate(`/user/bookings`)}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate(`/event/${eventId}`)}
                className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to Event
              </button>
            </div>
          </div>
        ) : (
            // --- FAILURE/RETRY UI ---
            renderFailureUI()
        )}
      </div>
    </div>
  )
}

export default PaymentSuccess