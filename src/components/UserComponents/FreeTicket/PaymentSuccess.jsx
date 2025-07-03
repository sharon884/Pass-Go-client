"use client";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { verifyPayment } from "../../../services/user/userPaymentServices";

const PaymentSuccess = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const paymentInfo = location.state;

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await verifyPayment(paymentInfo);

        toast.success("Payment verified successfully!");
        navigate(`/user/event/${eventId}/ticket-summary`, {
          state: {
            orderId: res.orderId,
            amount: res.amount,
            status: res.status,
          },
        });
      } catch (err) {
        console.error("Verification failed", err);
        toast.error("Payment verification failed");
        navigate(`/user/event/${eventId}`);
      }
    };

    if (paymentInfo) verify();
    else {
      toast.error("Missing payment info");
      navigate(`/user/event/${eventId}`);
    }
  }, [paymentInfo, eventId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl font-semibold text-indigo-600">Verifying payment...</p>
    </div>
  );
};

export default PaymentSuccess;
