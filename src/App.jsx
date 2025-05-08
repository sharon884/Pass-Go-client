import React from "react";
import './App.css';
import { Routes , Route } from "react-router-dom";
import Signup from './pages/generalPages/Signup'
import OtpPage from "./pages/generalPages/OTP";
import LandingPage from "./pages/generalPages/LandingPage";
import UserHomePage from "./pages/userPages/UserHomePage";
import HostHomePage from "./pages/hostPages/HostHomePage";
import Login from "./pages/generalPages/Login";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import checkAuthAndLoadUserProfile from "./utils/CheckAuthAndLoadProfil";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHostProfile } from "./features/auth/authThunk";
import HostAddEventPage from "./pages/hostPages/HostAddEventPage";
import ForgetPassword from "./pages/generalPages/ForgetPassword";
import UserEvents from "./components/UserComponents/UserEvent";
import UserEventDetailPage from "./pages/userPages/userEventDetailPage";

function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthAndLoadUserProfile( dispatch );
    dispatch(fetchHostProfile());

  },[dispatch]);

  return (
   <>
   <Routes>
    <Route path="/" element={<LandingPage/>} />
   <Route path="/signup" element={ <Signup/>} />
   <Route path="/verify-otp" element={ <OtpPage/>} />
   <Route path="/login" element={<Login/>} />
   <Route path="/admin/login" element={<Login/>} />
   <Route path="/userHomePage" element={ <UserHomePage/>} />
   <Route path="/hostHomePage" element={ <HostHomePage/>} />
   <Route path="/adminDashboard" element={ <AdminDashboard/>} />
   <Route path="/hostaddevent" element={<HostAddEventPage/>} />
   <Route path="/forgot-password" element={<ForgetPassword/>} />
   <Route path="/userEvent" element={<UserEvents/>} />
  <Route path="/yourEvent/:id" element={<UserEventDetailPage/>} />
   </Routes>
   </>
  )
}

export default App
