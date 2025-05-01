import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

const Feedback = () => {
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) {
            toast.error('Feedback cannot be empty.', {
                position: 'top-center',
                autoClose: 2000,
            });
            return;
        }

        setSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/feedback', { message });
            toast.success('Feedback submitted anonymously!', {
                position: 'top-center',
                autoClose: 2000,
            });
            setMessage('');
            setSubmitting(false);
        } catch (error) {
            toast.error('Something went wrong. Try again.', {
                position: 'top-center',
                autoClose: 2000,
            });
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-pink-200 to-yellow-400 font-poppins px-4">
            <Navbar />
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl">
                <ToastContainer />
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Anonymous Feedback</h1>
                <p className="text-center text-gray-600 mb-6">
                    Your feedback is valuable. Submit it anonymously below.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <textarea
                            name="message"
                            rows="6"
                            placeholder="Share your thoughts here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:border-yellow-400 transition resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition"
                    >
                        {submitting ? 'Submitting...' : 'Submit Anonymously'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;