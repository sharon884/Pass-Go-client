import api from "../../utils/api/api";

//Fetch Host Profile
export const getHostProfile = async () => {
  try {
    const response = await api.get("/host/profile/get-Host-Profile");
    return response.data;
  } catch (error) {
    console.log("Error fetching useer profile", error);
    throw new Error("Failed to load Host profile. Please try again later");
  }
};

//Fetch Host Profile
export const updateHostProfile = async (data) => {
  try {
    const response = await api.put("/host/profile/update-Host-Profile", data);
    return response.data;
  } catch (error) {
    console.log("Error updating Host Profile", error);
    throw new Error("Failed to update Host Profile");
  }
};
