import { createSlice } from "@reduxjs/toolkit";
import { fetchHostProfile } from "./authThunk";

const initialState = {
  isAuthenticated: false,
  user: {
    id: "",
    name: "",
    email: "",
    mobile: "",
    profile_img: "",
    role: "",
    isVerified: false,
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
        profile_img: action.payload.profile_img,
        role: action.payload.role,
        isVerified: action.payload.isVerified,
      };
    },

    logOut: (state) => {
      state.isAuthenticated = false;
      (state.user = {
        id: "",
        name: "",
        email: "",
        mobile: "",
        profile_img: "",
        role: "",
        isVerified: false,
      }),
        (state.loading = false);
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHostProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          mobile: action.payload.mobile,
          profile_img: action.payload.profile_img,
          role: action.payload.role,
          isVerified: action.payload.isVerified,
        };
      })
      .addCase(fetchHostProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
