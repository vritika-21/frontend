import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Attendance = () => {
    const [attendance, setAttendance] = useState({
        checkedIn: false,
        checkedOut: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login to access attendance!");
            navigate('/login');
        }
    }, []);

    const handleCheckIn = async () => {
        if (attendance.checkedIn) {
            toast.warning("Attendance already marked!");
        } else {
            try {
                const token = localStorage.getItem('token');
                const currentDate = new Date();
                const data = {
                    date: currentDate.toISOString().split('T')[0],
                    checkInTime: currentDate.toTimeString().split(' ')[0]
                };

                const response = await axios.post('http://localhost:5001/api/attendance/checkin', data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setAttendance({ ...attendance, checkedIn: true });
                    toast.success("Checked in successfully!");
                }
            } catch (error) {
                console.error("Check-in error:", error.response ? error.response.data : error);
                toast.error(error.response ? error.response.data.message : "Failed to check in!");
            }
        }
    };

    const handleCheckOut = async () => {
        if (!attendance.checkedIn) {
            toast.warning("Please check in first!");
        } else if (attendance.checkedOut) {
            toast.warning("Already checked out!");
        } else {
            try {
                const token = localStorage.getItem('token');
                const currentDate = new Date();
                const data = {
                    date: currentDate.toISOString().split('T')[0],
                    checkOutTime: currentDate.toTimeString().split(' ')[0]
                };

                const response = await axios.post('http://localhost:5001/api/attendance/checkout', data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    setAttendance({ ...attendance, checkedOut: true });
                    toast.success("Checked out successfully!");
                }
            } catch (error) {
                console.error("Check-out error:", error);
                toast.error("Failed to check out!");
            }
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Mark Your Attendance</h2>
                    <table className="w-full border border-collapse mb-4 text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border">Date</th>
                                <th className="py-2 px-4 border">Check-In</th>
                                <th className="py-2 px-4 border">Check-Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2 px-4 border">{new Date().toLocaleDateString()}</td>
                                <td className="py-2 px-4 border">{attendance.checkedIn ? '✔️' : '-'}</td>
                                <td className="py-2 px-4 border">{attendance.checkedOut ? '✔️' : '-'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-around mt-6">
                        <button
                            onClick={handleCheckIn}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                        >
                            Check In
                        </button>
                        <button
                            onClick={handleCheckOut}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Attendance;