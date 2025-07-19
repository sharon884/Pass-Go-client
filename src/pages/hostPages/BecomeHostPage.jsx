import React from 'react'
import BecomeHostForm from '../../components/HostComponets/BecomeHost/BecomeHostForm'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function BecomeHostPage() {
    const { role } = useSelector((state) => state.auth);
      if (role === "host") {
    return <Navigate to="/host-home-page" replace />;
  }
  return (
    <div>
      <BecomeHostForm/>
    </div>
  )
}

export default BecomeHostPage
