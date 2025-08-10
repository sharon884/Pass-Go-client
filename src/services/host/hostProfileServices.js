import api from "../../utils/api/api";


//Fetch Host Profile
export const updateHostProfile = async (data) => {
  try {
    const response = await api.put("/host/profile/update-host-Profile", data);
    return response.data;
  } catch (error) {
    console.log("Error updating Host Profile", error);
    throw new Error("Failed to update Host Profile");
  }
};

export const requestVerificationHost = async () => {
  try {
    const{ data } = await api.post("/host/profile/account/verify-request");
    return data;   
  } catch ( error ) {
    console.log("Error while request verifictaion host", error);
    throw new Error( error.response?.data?.message || "Failed to send verification request");
  }
};


export const getDetailsForSidebar = async () => {
  try {
    const response = await api.get("/host/profile/get-details");
    console.log(response.data);
    return response.data;
  } catch ( error ) {
    console.log("Error fetching profile details of user:", error);
    throw new Error("Failed to fetch user profile details");
  }
};

//get host profile status 
export const getHostRequestStatus = async () => {
  try {
    const response = await api.get("/user/profile/host-request-status");
    return response.data;
  } catch ( error ) {
    console.Error("Error fetching profile status of user ", error);
    throw new Error("Failed to fetch user profile details");
  }
}