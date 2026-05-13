import React from "react";
import { useNavigate } from "react-router-dom";


const DashboardHeader = () => {
   const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const name = user?.name || user?.email || "User";

  const initial = name.charAt(0).toUpperCase();

    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // important if you're storing user

    navigate("/login");
  };


  return (
    <div className=" flex justify-center items-center gap-5">
      <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">
        {initial}
    </div>
     <button className="cursor-pointer" onClick={logout}>Logout</button>
    </div>
    
  );
};

export default DashboardHeader;