import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

const Attendance = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState({
    checkedIn: false,
    checkedOut: false,
    checkInTime: '',
    checkOutTime: '',
  });

  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to access attendance!");
      navigate('/login');
      return;
    }

    // Fetch today's attendance status
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(
          `${API_BASE}/api/attendance/today`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200 && response.data) {
          setAttendance({
            checkedIn: !!response.data.checkInTime,
            checkedOut: !!response.data.checkOutTime,
            checkInTime: response.data.checkInTime || '',
            checkOutTime: response.data.checkOutTime || '',
          });
        }
      } catch (error) {
        // If no record for today, leave as default (not checked in/out)
        setAttendance({
          checkedIn: false,
          checkedOut: false,
          checkInTime: '',
          checkOutTime: '',
        });
      }
    };

    fetchAttendance();
    // eslint-disable-next-line
  }, [navigate]);

  const handleCheckIn = async () => {
    if (attendance.checkedIn) {
      toast.info("Already checked in for today!");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const currentDate = new Date();
      const data = {
        date: todayDate,
        checkInTime: currentDate.toTimeString().split(' ')[0],
      };

      const response = await axios.post(`${API_BASE}/api/attendance/checkin`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Checked in successfully!");
        setAttendance((prev) => ({
          ...prev,
          checkedIn: true,
          checkInTime: data.checkInTime,
        }));
      }
    } catch (error) {
      if (error.response?.data?.message === 'Already checked in') {
        toast.info('Already checked in for today!');
      } else {
        toast.error(error.response?.data?.message || "Failed to check in!");
      }
    }
  };

  const handleCheckOut = async () => {
    if (!attendance.checkedIn) {
      toast.info("Please check in first!");
      return;
    }
    if (attendance.checkedOut) {
      toast.info("Already checked out for today!");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const currentDate = new Date();
      const data = {
        date: todayDate,
        checkOutTime: currentDate.toTimeString().split(' ')[0],
      };

      const response = await axios.post(`${API_BASE}/api/attendance/checkout`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success("Checked out successfully!");
        setAttendance((prev) => ({
          ...prev,
          checkedOut: true,
          checkOutTime: data.checkOutTime,
        }));
      }
    } catch (error) {
      if (error.response?.data?.message === 'Already checked out') {
        toast.info('Already checked out for today!');
      } else {
        toast.error(error.response?.data?.message || "Failed to check out!");
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
                <td className="py-2 px-4 border">
                  {(() => {
                    const date = new Date();
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = String(date.getFullYear()).slice(-2);
                    return `${day}-${month}-${year}`;
                  })()}
                </td>
                <td className="py-2 px-4 border">
                  {attendance.checkedIn ? (
                    <>
                      ✔️
                      <div className="text-xs text-gray-500">{attendance.checkInTime}</div>
                    </>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="py-2 px-4 border">
                  {attendance.checkedOut ? (
                    <>
                      ✔️
                      <div className="text-xs text-gray-500">{attendance.checkOutTime}</div>
                    </>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-around mt-6">
            <button
              onClick={handleCheckIn}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              disabled={attendance.checkedIn}
            >
              Check In
            </button>
            <button
              onClick={handleCheckOut}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              disabled={!attendance.checkedIn || attendance.checkedOut}
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
