import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true)
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password,
            })

            if (response.data && response.data.token) {
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userRole', response.data.role);
                localStorage.setItem('userEmail', response.data.email);

                if (response.data.role === 'admin') {
                    navigate('/adminportal')
                } else {
                    navigate('/userportal')
                }
            } else {

                setError('Login failed: Unexpected response from server.')
            }
        }
        catch (err) {

            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
        }
        finally {
            setLoading(false);
        }
    }



    return (
        <div className="userLogin space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    required
                    type="email"
                    placeholder="Enter User email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800
            ${error ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
                />

                <input
                    required
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800
            ${error ? 'border-red-500 ring-red-500' : 'border-gray-300'}`}
                />
                <button
                    type="submit"
                    className="w-full cursor-pointer  bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200 shadow-md font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </form>
        </div>
    );

};

export default UserLogin;