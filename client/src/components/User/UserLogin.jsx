// import axios from 'axios'
// import { useRef, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'

// const UserLogin = () => {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   let navigate = useNavigate()

//   let [user, setUser] = useState([])
//   let [emailError, setEmailError] = useState(false)
//   let [passwordError, setPasswordError] = useState(false)


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let userApi = await axios.get("http://localhost:5000/api/users/login")
//         setUser(userApi.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData()
//   }, [])


//   const formDetails = useRef()

//   const userData = user.map((ele) => ele)

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     setEmailError(false)
//     setPasswordError(false)

//     let emailInput = formDetails.current[0].value
//     let passInput = formDetails.current[1].value

//     let userCheck = userData.includes(emailInput)
//     let passCheck = userPass.includes(passInput)

//     if (userCheck && passCheck) {
//       alert("You are logged in successfully!")
//       navigate('/userportal')
//     }
    
//     else {
//       alert("Invalid Credentials!")

//       if (!userCheck) {
//         setEmailError(true)
//       }
//       if (!passCheck) {
//         setPasswordError(true)
//       }
//     }
//   }

//   return (
//     <div className="userLogin space-y-4">
//       <form onSubmit={handleSubmit} className="space-y-4">
        
//         <input
//           type="email"
//           placeholder="Enter User email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800
//             ${emailError ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
//         />

//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}

//           className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800
//             ${passwordError ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200 shadow-md font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//         >
//           User Login
//         </button>
//       </form>
//     </div>
//   );

// };

// export default UserLogin;