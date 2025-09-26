import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import { toast } from "sonner";
import { fetchAdvanceAmount, createAdvanceOrder, verifyAdvancePayment } from "../../../services/host/hostPaymentServices";
import { Loader2 } from 'lucide-react'; // Import a simple loading icon

const HostAdvancePayment = () => {
    const { eventId  } = useParams();
    const [ advanceAmount , setAdvanceAmount ] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadAmount = async () => {
      try {
        const data = await fetchAdvanceAmount(eventId);
        setAdvanceAmount(data.advanceAmount);
      } catch (err) {
        toast.error("Failed to fetch advance amount");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAmount();
  }, [eventId]);


  const handlePayment = async () => {
    // Prevent multiple clicks while waiting for the payment dialog to open
    setLoading(true); 
    try {
      const data = await createAdvanceOrder(eventId);
      const { razorPayOrderId, amount, currency, key } = data;

      const options = {
        key,
        amount,
        currency,
        name: "PassGo",
        description: "Advance Payment for Event",
        image: "https://passgo.in/logo.png",
        order_id: razorPayOrderId,
        handler: async function (response) {
            console.log( response.razorpay_payment_id,  response.razorpay_order_id,  response.razorpay_signature)
          try {
            const verifyRes = await verifyAdvancePayment({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              eventId,
            });

            if (verifyRes.success) {
              toast.success("Advance Payment Successful!");
              navigate("/host");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Verification request failed");
            console.error(err);
          } finally {
                setLoading(false); // Reset loading after verification
            }
        },
        prefill: {
          name: "PassGo Host",
          email: "host@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#6366F1",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
      razor.on('modal.close', () => setLoading(false)); // Reset loading if the modal is closed without payment
    } catch (err) {
      toast.error("Payment initiation failed");
      console.error(err);
      setLoading(false); // Reset loading on initiation failure
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-xl p-8 bg-white border border-gray-200 rounded-xl shadow-2xl transition-all duration-300 transform hover:shadow-3xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
            Secure Advance Payment 🔐
          </h2>
          <p className="mt-2 text-gray-500">Required to finalize your event details.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
            <p className="mt-4 text-gray-600 font-medium">Loading required amount...</p>
          </div>
        ) : advanceAmount !== null ? (
          <>
            <div className="bg-indigo-50 p-6 rounded-lg mb-6">
              <p className="text-lg text-gray-700 font-semibold mb-2">
                Advance payment for event:
              </p>
              <p className="text-5xl font-extrabold text-indigo-800 tracking-wider">
                ₹{advanceAmount}
              </p>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full flex items-center justify-center bg-indigo-600 text-white text-lg font-semibold tracking-wide h-12 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay ₹{advanceAmount} Now
            </button>
          </>
        ) : (
          <div className="text-center p-6 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 font-semibold">
              Could not load payment amount. Please refresh the page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostAdvancePayment;