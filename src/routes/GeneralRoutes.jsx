import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/generalPages/LandingPage";
import Signup from "../pages/generalPages/Signup";
import Login from "../pages/generalPages/Login";
import OtpPage from "../pages/generalPages/OTP";
import ForgetPassword from "../pages/generalPages/ForgetPassword";
import WelcomPage from "../pages/generalPages/WelcomPage";

const GeneralRoutes = [
  <Route key="/" path="/" element={<LandingPage />} />,
  <Route key="/signup" path="/signup" element={<Signup />} />,
  <Route key="/login" path="/login" element={<Login />} />,
  <Route key="/verify-otp" path="/verify-otp" element={<OtpPage />} />,
  <Route key="/forgot-password" path="/forgot-password" element={<ForgetPassword />} />,
  <Route key="/welcome-page" path="/welcome-page" element={<WelcomPage />} />,
];

export default GeneralRoutes;
