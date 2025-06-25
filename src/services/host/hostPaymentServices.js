import api from "../../utils/api/api";

export const fetchAdvanceAmount = async ( eventId ) => {
    try {
        const response = await api.get(`/host/payment/event/${eventId}/advance-amount`);
        return response.data;
    } catch ( error ) {
        throw new Error("fetching the advance amount error :", error?.message);
    }
};

export const createAdvanceOrder = async ( eventId ) => {
    try {
        const response = await api.post(`/host/payment/event/create-advance-order`, { eventId });
        return response.data;
    } catch ( error ) {
        throw new Error("create advance order id creating error :", error?.message);
    };
};

export const verifyAdvancePayment = async ( payload ) => {
    try {
        const response = await api.post(`/host/payment/event/verify-advance-payment`, payload);
        return response.data; 
    } catch ( error ) {
        throw new Error("verify payment error :", error?.message );
    };
};

