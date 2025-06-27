import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

  let formData = useRef()
  let navigate = useNavigate()

  const controlAdminLogin = (e) => {
    e.preventDefault()

    let credentials = {
      email: "admin@gmail.com",
      password: "admin123"
    }

    let { email, password } = credentials

    let emailInput = formData.current.elements.email;
    let passwordInput = formData.current.elements.password;

    let emailVal = emailInput.value;
    let passVal = passwordInput.value;

    if (email === emailVal && password === passVal) {
      navigate("/adminportal")
    } else {
      alert("Invalid Credentials!")
      emailInput.style.border = "3px solid red"
      passwordInput.style.border = "3px solid red"
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">

        <form onSubmit={controlAdminLogin} ref={formData} className="w-full flex flex-col space-y-4">

          <input
            type="email"
            name="email"
            placeholder='Enter Admin email'
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
          <input
            type="password"
            name="password"
            placeholder='Enter password'
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />

          <input
            type="submit"
            value={"Admin Login"}
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          />
        </form>
      </div>
    </>
  )
}

export default AdminLogin