import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api/api";

  export const fetchUserProfile = createAsyncThunk(   
    "auth/fetchUserProfile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get( "/user/profile/get-user-Profile" , {
                withCredentials: true,
            });

            return response.data.user;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return rejectWithValue(error.response.data.message || "Failed to fetch user profile");
        }
    }
);

