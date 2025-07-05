import { useState } from "react";
import UserLogin from './User/UserLogin'; 
import AdminLogin from "./Admin/AdminLogin"; 
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
  const [isUserMode, setIsUserMode] = useState(true);

  const handleClick = () => {
    setIsUserMode(!isUserMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 font-sans">
      <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-xl shadow-lg">
        <div className="relative flex w-full h-12 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div
            className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md transition-transform duration-600 ease-in-out
              ${isUserMode ? 'translate-x-full' : 'translate-x-0'}`}
          ></div>

          <button
            className={`cursor-pointer relative z-10 flex-1 text-lg font-semibold rounded-full transition-colors duration-300
              ${isUserMode ? 'text-gray-700' : 'text-white'}`}
            onClick={handleClick}
          >
            Admin
          </button>

          <button
            className={`cursor-pointer relative z-10 flex-1 text-lg font-semibold rounded-full transition-colors duration-300
              ${isUserMode ? 'text-white' : 'text-gray-700'}`}
            onClick={handleClick}
          >
            User
          </button>
        </div>

        {/* Login Form */}
        <div className="mb-6">
          {isUserMode ? <UserLogin /> : <AdminLogin />}
        </div>

        {/* Sign-up Link */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center shadow-inner">
          <p className="text-gray-700 text-lg font-medium">
            New User?{' '}
            <NavLink to="/signup" className="text-blue-600 hover:underline font-semibold">
              Register here!
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
