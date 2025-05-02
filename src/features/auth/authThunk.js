import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api/api";

  export const fetchHostProfile = createAsyncThunk(   
    "auth/fetchHostProfile",
    async (_, { rejectWithValue }) => {
        try {
            const responst = await api.get( "/host/profile/getHostProfile" , {
                withCredentials: true,
            });

            return responst.data.host;
        } catch (error) {
            console.error("Error fetching host profile:", error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

