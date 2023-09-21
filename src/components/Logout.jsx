import React from "react";
import { auth } from "../Auth/firebase"; 
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate =  useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut(); 
      navigate('/')
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out:", error);
      navigate("*")
    }
  };

  return (
    <div className="pt-10 pb-0 px-10">
  <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
    >
      Logout
    </button>
    </div>
  );
}

export default LogoutButton;
