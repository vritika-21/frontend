import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'; 

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ emp_email: '', emp_password: '' });
   // const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await loginUser(formData);
            toast.success(res.data.message || 'Login successful!', {
                position: "top-center",
                autoClose: 2000,
            });
            setTimeout(() => {
                if (res.data.role === 'hr') {
                    navigate('/hr-dashboard');
                } else {
                    navigate('/employee-dashboard');
                }
            }, 2500);
        } catch (err) {
            console.error(err);
            toast.error(
                err?.response?.data?.message || 'Login failed. Please try again.',
                {
                    position: "top-center",
                    autoClose: 2000,
                }
            );
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
            <Navbar /> 
            <div className="bg-white p-16 rounded-2xl shadow-lg w-full max-w-2xl">
                <ToastContainer />
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Sign In</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="emp_email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="emp_email"
                            name="emp_email"
                            placeholder="Enter your email here"
                            value={formData.emp_email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400 transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="emp_password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="emp_password"
                            name="emp_password"
                            placeholder="Enter your password here"
                            value={formData.emp_password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                                <p className="text-center text-gray-700 text-sm mt-4">
                    Don't have an account?{' '}
                    <a href="/register" className="text-yellow-600 font-semibold hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;