import React from "react";
import { Routes } from "react-router-dom";
import GeneralRoutes from "./GeneralRoutes";
import UserRoutes from "./UserRoutes";
import HostRoutes from "./HostRoutes";
import AdminRoutes from "./AdminRoutes";

function AppRoutes() {
  console.log("inital comit");
  return (
    <Routes>
      {GeneralRoutes}
      {UserRoutes}
      {HostRoutes}
      {AdminRoutes} 
    </Routes>
  );
}

export default AppRoutes;
