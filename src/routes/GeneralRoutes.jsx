import React, { lazy } from "react"; // ADDED lazy import
import { Route } from "react-router-dom";
// All direct component imports are replaced by lazy imports below
import PublicRoute from "../components/auth/PublicRoute"; 

// LAZY LOADED PAGES
const LandingPage = lazy(() => import("../pages/generalPages/LandingPage"));
const Signup = lazy(() => import("../pages/generalPages/Signup"));
const Login = lazy(() => import("../pages/generalPages/Login"));
const OtpPage = lazy(() => import("../pages/generalPages/OTP"));
const ForgetPassword = lazy(() => import("../pages/generalPages/ForgetPassword"));
const WelcomPage = lazy(() => import("../pages/generalPages/WelcomPage"));
const NotFound = lazy(() => import("@/components/generalComponents/NotFound"));

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