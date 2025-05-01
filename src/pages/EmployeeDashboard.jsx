import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
                <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-200 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Employee Panel</h1>
                    <p className="text-gray-600 mb-6">Manage your daily activities below:</p>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => navigate('/attendance')}
                            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition"
                        >
                            Mark Attendance
                        </button>
                        <button
                            onClick={() => navigate('/leave')}
                            className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold text-base hover:bg-green-700 transition"
                        >
                            Apply for Leave
                        </button>
                    </div>
                    <div className="mt-8 bg-yellow-100 p-6 rounded-xl border border-yellow-300 text-center">
                        <p className="text-yellow-800 text-base font-medium mb-4">
                            Hey! How was your experience? Want to give feedback?
                        </p>
                        <button
                            onClick={() => navigate('/feedback')}
                            className="px-6 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
                        >
                            Give Feedback
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDashboard;