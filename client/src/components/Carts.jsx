import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_BASE_URL = 'https://library-management-jguy.onrender.com/api/carts';

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`${API_BASE_URL}`);
                setCartItems(response.data);
            } catch (err) {
                console.error("Error fetching cart items:", err);
                setError("Failed to load cart items. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, [])

    const removeItem = async (cartId, title) => {

        if (window.confirm(`Are you sure you want to remove "${title}" from your cart?`)) {

            try {

                const response = await axios.delete(`${API_BASE_URL}/${cartId}`)

                if (response.status === 200) {
                    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId))
                    alert(`"${title}" has been removed from your cart.`)
                }
                else {
                    throw new Error(`Server responded with status: ${response.status}`)
                }
            }
            catch (err) {
                console.error("Error removing item from cart:", err);
                alert(`Failed to remove "${title}". Please try again.`);
            }
        }
    }

    let totalBooks = cartItems.length

    return (

        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-8">Your Shopping Cart</h1>

                {loading && (
                    <div className="text-center text-gray-600 text-xl font-semibold">Loading cart...</div>
                )}

                {error && (
                    <div className="text-center text-red-600 text-xl font-semibold">{error}</div>
                )}

                {!loading && !error && cartItems.length === 0 && (
                    <div className="text-center text-gray-700 text-xl font-semibold">
                        Your cart is empty! <br />
                        <button
                            onClick={() => navigate('/userportal/books')}
                            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            Start Shopping
                        </button>
                    </div>
                )}

                {!loading && !error && cartItems.length > 0 && (
                    <>
                        <div className="space-y-6 mb-8">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg shadow-sm p-4 gap-4">
                                    <img
                                        src={item.thumbnailUrl || 'https://via.placeholder.com/80x100?text=No+Image'}
                                        alt={item.title}
                                        className="w-20 h-24 object-contain rounded-md shadow-sm flex-shrink-0"
                                    />

                                    <div className="flex-grow text-center sm:text-left">
                                        <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                                        <p className="text-sm text-gray-600">by {Array.isArray(item.authors) ? item.authors.join(', ') : item.authors || 'AUTHOR II'}</p>
                                        {item.price && <p className="text-md font-bold text-green-700 mt-1">${(item.price * (item.quantity || 1)).toFixed(2)}</p>}
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.cartId, item.title)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 transition-colors duration-200 flex-shrink-0 mt-2 sm:mt-0"
                                    >
                                        Remove
                                    </button>

                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-purple-200 pt-6 mt-6">
                            <div className="flex justify-between items-center text-xl font-semibold text-gray-800 mb-2">
                                Total Books :<span>{totalBooks}</span>
                            </div>
                            
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Cart;
