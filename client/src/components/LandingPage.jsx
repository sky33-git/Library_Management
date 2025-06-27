import { useState } from "react";
// import UserLogin from './User/UserLogin';
// import AdminLogin from "./Admin/AdminLogin";

const LandingPage = () => {
  const [isUserMode, setIsUserMode] = useState(true); // true for User, false for Admin

  const handleClick = () => {
    setIsUserMode(!isUserMode)
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg w-1/2 max-w-md">
        <div className="relative flex w-full h-12 bg-gray-200 rounded-full mb-8 overflow-hidden">

          <div
            className={`absolute top-0 h-full w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md transition-transform duration-300 ease-in-out
              ${isUserMode ? 'translate-x-full' : 'translate-x-0'}`}
          ></div>

          <button
            className={`relative z-10 flex-1 text-lg font-semibold rounded-full transition-colors duration-300
              ${isUserMode ? 'text-gray-700' : 'text-white'}`}
            onClick={handleClick} >
            Admin
          </button>

          <button
            className={`relative z-10 flex-1 text-lg font-semibold rounded-full transition-colors duration-300
              ${isUserMode ? 'text-white' : 'text-gray-700'}`}
            onClick={handleClick} >
            User
          </button>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {isUserMode ? "USER LOGIN" : "ADMIN LOGIN"}
        </h2>

        {/* <div className="mb-6">
          {isUserMode ? <UserLogin /> : <AdminLogin />}
        </div> */}

      </div>
    </div>
  )
}

export default LandingPage;
