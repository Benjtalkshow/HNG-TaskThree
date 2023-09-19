import React from "react";
import {useNavigate} from "react-router-dom";
import '../App.css';

const ErrorPage = () => {
    const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-full bg-gray-50 flex justify-center items-center">
    <div className="flex flex-col gap-y-2">
        <h1 className="text-7xl text-center">404</h1>
    <h1 className="text-red-400 text-2xl text-center">pAgE nOt fOuNd!!</h1>
    <button onClick={() => navigate("/")} className="block py-3 text-white rounded-lg bg-gray-900">Go Back</button>
    </div>
</div>
  );
};

export default ErrorPage;
