import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);


        if (password != rePassword) {
            setLoading(false)
            window.alert("Please enter same password")
            setEmail("")
            setPassword("")
            setRePassword("")
        }
        else {
            try {

                const response = await axios.post('https://library-management-jguy.onrender.com/api/users/signup', {
                    email,
                    password,
                })

                if (response.status === 201) {
                    setSuccess('Account created successfully! Redirecting to login...')
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                }
            } catch (err) {
                console.error('Signup error:', err)
                setError(err.response?.data?.message || 'Failed to create account. Please try again.')
            } finally {
                setLoading(false)
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md animate-fade-in-down">
                <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">Sign Up</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            className="w-full p-3 border mb-3 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        />

                        <input
                            type="repassword"
                            id="repassword"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            placeholder="Re-Enter your password"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>


                    {error && (
                        <div className="p-3 rounded-md bg-red-100 text-red-700 text-center font-semibold">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="p-3 rounded-md bg-green-100 text-green-700 text-center font-semibold">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-xl shadow-md
                       hover:bg-indigo-700 transition-all duration-200 active:animate-press
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                       ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/" className="text-indigo-600 hover:underline font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
