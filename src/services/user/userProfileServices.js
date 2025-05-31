import api from "../../utils/api/api";

//Fetch User Profile
export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile/get-user-Profile");
    return response.data;
  } catch (error) {
    console.log("Error fetching user profile", error);
    throw new Error("Failed to load user profile. Please try again later");
  }
};

//Update User Profile
export const updateUserProfile = async (data) => {
  try {
    const response = await api.put("/user/profile/update-Profile", data);
    return response.data;
  } catch (error) {
    console.log("error updating user profile", error);
    throw new Error("Failed to update user profile");
  }
};
