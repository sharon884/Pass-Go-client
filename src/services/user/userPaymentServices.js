import api from "../../utils/api/api";




export const createOrder = async ( payload ) => {
    try {
        const response = await api.post("/user/payment/create-order", payload);
        return response.data;
    } catch ( error ) {
        console.log("Error creating order", error );
        throw new Error("Failed to create order");
    }
};

export const verifyPayment = async ( payload ) => {
    try {
        const response = await api.post("/user/payment/verify-payment", payload);
        console.log("verifyPayment data:", response.data);
        return response.data;
    } catch ( error ) {
        console.log("Error verifying payment", error );
        throw new Error("Failed to verify payment");
    }
}


export const createOrderWithoutSeats = async (payload) => {
  try {
    const response = await api.post("/user/payment/create-order/without-seats", payload);
    return response.data;
  } catch (error) {
    console.log("Error creating non-seat order", error);
    throw new Error("Failed to create non-seat order");
  }
};
