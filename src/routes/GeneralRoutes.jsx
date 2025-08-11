import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "../pages/generalPages/LandingPage";
import Signup from "../pages/generalPages/Signup";
import Login from "../pages/generalPages/Login";
import OtpPage from "../pages/generalPages/OTP";
import ForgetPassword from "../pages/generalPages/ForgetPassword";
import WelcomPage from "../pages/generalPages/WelcomPage";
import PublicRoute from "../components/auth/PublicRoute"; 
import NotFound from "@/components/generalComponents/NotFound";

const GeneralRoutes = [
  <Route key="/" path="/" element={<LandingPage />} />,

  <Route
    key="/signup"
    path="/signup"
    element={
      <PublicRoute>
        <Signup />
      </PublicRoute>
    }
  />,

  <Route
    key="/login"
    path="/login"
    element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    }
  />,

  <Route key="/otp" path="/otp" element={<OtpPage />} />,
  <Route key="/reset-password" path="/reset-password" element={<ForgetPassword />} />,
  <Route key="/welcome" path="/welcome" element={<WelcomPage />} />,
  <Route key="404" path="*" element={<NotFound />} />,
];

export default GeneralRoutes;
