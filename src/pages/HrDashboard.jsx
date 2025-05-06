import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HrDashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-yellow-400 to-yellow-600 flex flex-col items-center justify-center font-poppins">
                <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-3xl">
                    <div className="text-center">
                        <h1 className="mb-4 text-3xl font-bold text-gray-800">HR Panel</h1>
                        <p className="mb-6 text-gray-600">Manage Employees, Feedback, Leaves, Payslips</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 justify-center">
                        <button
                            onClick={() => navigate('/manage-employees')}
                            className="w-full py-3 rounded-lg text-white font-semibold transition bg-blue-500 hover:bg-blue-600"
                        >
                            Manage Employees
                        </button>
                        <button
                            onClick={() => navigate('/view-feedback')}
                            className="w-full py-3 rounded-lg text-white font-semibold transition bg-cyan-500 hover:bg-cyan-600"
                        >
                            View Feedback
                        </button>
                        <button
                            onClick={() => navigate('/approve-leaves')}
                            className="w-full py-3 rounded-lg text-white font-semibold transition bg-green-500 hover:bg-green-600"
                        >
                            Approve Leaves
                        </button>
                        <button
                            onClick={() => navigate('/generate-payslip')}
                            className="w-full py-3 rounded-lg text-white font-semibold transition bg-yellow-400 hover:bg-yellow-500"
                        >
                            Generate Payslip
                        </button>
                        <div className="flex justify-center">
                            <button
                                onClick={() => navigate('/generate-offer-letter')}
                                className="w-full py-3 rounded-lg text-white font-semibold transition bg-purple-500 hover:bg-purple-600"
                            >
                                Generate Offer Letter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HrDashboard;