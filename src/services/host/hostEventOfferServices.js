import api from "../../utils/api/api";

export const addOffer = async (eventId, offerData) => {
  try {
    const response = await api.post(`/host/offer/${eventId}/add-offer`, offerData);
    return response.data;
  } catch (error) {
    console.error("Error while adding offer:", error);
    throw error;
  }
};



export const cancelOffer = async (eventId) => {
  try {
    const response = await api.delete(`/host/offer/${eventId}/cancel-offer`);
    return response.data;
  } catch (error) {
    console.error("Error while cancelling offer:", error);
    throw error;
  }
};
