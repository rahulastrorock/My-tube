import React from "react";
import Sidebar from "./Sidebar";
// import MainContainer from "./MainContainer";
import { Outlet } from "react-router-dom";
import FixedSidebar from "./FixedSidebar";

const Body = () => {
  return (
    <div className="flex">
      <FixedSidebar />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;
