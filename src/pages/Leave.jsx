import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = process.env.REACT_APP_API_BASE;

const Leave = () => {
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [error, setError] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(12);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE}/api/leave`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setLeaveRequests(response.data.leaves);
        setLeaveBalance(response.data.leaveBalance);
      }
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason || !fromDate || !toDate) {
      setError('Please fill out all fields.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE}/api/employee/leave`,
        { reason, fromDate, toDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success('Leave request submitted successfully!', {
          position: 'top-center',
          autoClose: 2000,
        });
        setReason('');
        setFromDate('');
        setToDate('');
        setError('');
        fetchLeaves();
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError('Failed to submit leave request. Please try again later.');
      toast.error('Failed to submit leave request. Please try again later.', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">Leave Application</h1>
          <p className="text-center text-gray-600 mb-6">Fill in your leave details below:</p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for Leave"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="From Date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="To Date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              Submit Leave Request
            </button>
          </form>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 text-center">Your Leave Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-2 px-4 border">From Date</th>
                  <th className="py-2 px-4 border">To Date</th>
                  <th className="py-2 px-4 border">Reason</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Leave Balance</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leave, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-4 border">{leave.fromDate ? leave.fromDate.slice(0,10) : ''}</td>
                    <td className="py-2 px-4 border">{leave.toDate ? leave.toDate.slice(0,10) : ''}</td>
                    <td className="py-2 px-4 border">{leave.reason}</td>
                    <td className="py-2 px-4 border">{leave.status || 'pending'}</td>
                    <td className="py-2 px-4 border">{leaveBalance}</td>
                    <td className="py-2 px-4 border">
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-3 py-1 rounded mr-2">Update</button>
                      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Leave;
