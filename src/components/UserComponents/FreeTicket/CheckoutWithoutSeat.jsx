"use client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  createOrderWithoutSeats,
  verifyPayment,
} from "../../../services/user/userPaymentServices";

const CheckoutWithoutSeat = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { category, quantity, lockExpiresAt } = location.state || {};

  const [priceDetails, setPriceDetails] = useState({
    subtotal: 0,
    gst: 0,
    total: 0,
  });
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!category || !quantity || !lockExpiresAt) {
      toast.error("Missing booking info");
      navigate(-1);
    }

    const basePrice = category === "VIP" ? 500 : 200; // Replace this with real price if needed
    const subtotal = basePrice * quantity;
    const gst = +(subtotal * 0.18).toFixed(2);
    const total = +(subtotal + gst).toFixed(2);

    setPriceDetails({ subtotal, gst, total });
  }, [category, quantity]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = lockExpiresAt - now;

      if (remaining > 0) {
        setTimeLeft(Math.floor(remaining / 1000));
      } else {
        clearInterval(interval);
        toast.warning("Lock expired");
        navigate(-1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockExpiresAt]);

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePayment = async () => {
    try {
      const payload = {
        eventId,
        category,
        quantity,
        paymentMethod: "upi",
      };

      const res = await createOrderWithoutSeats(payload);
      const { razorpayOrderId, amount, currency, key, orderId } = res;

      const options = {
        key,
        amount,
        currency,
        name: "PassGo Events",
        description: "Event Tickets",
        order_id: razorpayOrderId,
        handler: async (response) => {
          navigate(`/user/event/${eventId}/payment-success`, {
            state: {
              orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId,
              razorpaySignature: response.razorpay_signature,
            },
          });
        },
        theme: { color: "#6366F1" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      toast.error("Payment initialization failed");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto border shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <p>
        <strong>Quantity:</strong> {quantity}
      </p>
      <p>
        <strong>Subtotal:</strong> ₹{priceDetails.subtotal}
      </p>
      <p>
        <strong>GST (18%):</strong> ₹{priceDetails.gst}
      </p>
      <p className="font-bold">
        <strong>Total:</strong> ₹{priceDetails.total}
      </p>
      <p className="text-sm mt-2 text-red-600">
        ⏳ Time left: {formatTime(timeLeft)}
      </p>

      <button
        onClick={handlePayment}
        className="mt-4 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Pay Now
      </button>
    </div>
  );
};

export default CheckoutWithoutSeat;
