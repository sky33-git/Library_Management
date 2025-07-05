import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const formData = useRef();
  const navigate = useNavigate();

  const controlAdminLogin = (e) => {
    e.preventDefault();

    const credentials = {
      email: 'admin@gmail.com',
      password: 'admin123',
    };

    const { email, password } = credentials;

    const emailInput = formData.current.elements.email;
    const passwordInput = formData.current.elements.password;

    const emailVal = emailInput.value;
    const passVal = passwordInput.value;

    if (email === emailVal && password === passVal) {
      navigate('/adminportal');
    } else {
      alert('Invalid Credentials!');
      emailInput.style.border = '3px solid red';
      passwordInput.style.border = '3px solid red';
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={controlAdminLogin}
        ref={formData}
        className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Admin email"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />

        <input
          type="submit"
          value="Admin Login"
          className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
};

export default AdminLogin;
