import { createSlice } from "@reduxjs/toolkit";
import { fetchUserProfile } from "./authThunk";

const initialState = {
  isAuthenticated: false,
  user: {
    id: "",
    name: "",
    email: "",
    mobile: "",
    profile_image: "",
    role: "",
  
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        mobile: action.payload.mobile,
        profile_image: action.payload.profile_image,
        role: action.payload.role,
     
      };
    },

    logOut: (state) => {
      state.isAuthenticated = false;
      (state.user = {
        id: "",
        name: "",
        email: "",
        mobile: "",
        profile_image: "",
        role: "",
      }),
        state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          mobile: action.payload.mobile,
          profile_image: action.payload.profile_image,
          role: action.payload.role,
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
