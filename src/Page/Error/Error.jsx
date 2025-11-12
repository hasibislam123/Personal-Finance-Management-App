// src/Pages/NotFound.jsx
import React from "react";
import { Link } from "react-router";
import error from "../../assets/404.svg";


const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 px-4">
      <img src={error} alt="" />
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;