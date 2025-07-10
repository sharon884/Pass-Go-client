import { useEffect , useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import { toast } from "sonner";
import { fetchAdvanceAmount, createAdvanceOrder, verifyAdvancePayment } from "../../../services/host/hostPaymentServices";


const HostAdvancePayment = () => {
    const { eventId  } = useParams();
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
            console.log( response.razorpay_payment_id,  response.razorpay_order_id,  response.razorpay_signature)
          try {
            const verifyRes = await verifyAdvancePayment({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              eventId,
            });

            if (verifyRes.success) {
              toast.success("Advance Payment Successful!");
              navigate("/host-home-page");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Verification request failed");
            console.error(err);
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
    } catch (err) {
      toast.error("Payment initiation failed");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-10 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Advance Payment</h2>

      {loading ? (
        <p className="text-gray-600">Loading amount...</p>
      ) : advanceAmount !== null ? (
        <>
          <p className="mb-4">Advance payment required for this event: <strong>₹{advanceAmount}</strong></p>
          <button
            onClick={handlePayment}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Pay Now
          </button>
        </>
      ) : (
        <p className="text-red-500">Could not load payment amount</p>
      )}
    </div>
  );
};

export default HostAdvancePayment;

