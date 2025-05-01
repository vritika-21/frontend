import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Leave = () => {
  const [reason, setReason] = useState('');
  const [leaveDate, setLeaveDate] = useState('');
  const [error, setError] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(12);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/leave/all', {
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
    if (!reason || !leaveDate) {
      setError('Please fill out all fields.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5001/api/employee/leave',
        { reason, leaveDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert('Leave request submitted successfully!');
        setReason('');
        setLeaveDate('');
        setError('');
        fetchLeaves();
      }
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setError('Failed to submit leave request. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
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
              value={leaveDate}
              onChange={(e) => setLeaveDate(e.target.value)}
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
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Reason</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Leave Balance</th>
                  <th className="py-2 px-4 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((leave, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-4 border">{leave.leaveDate}</td>
                    <td className="py-2 px-4 border">{leave.reason}</td>
                    <td className="py-2 px-4 border">{leave.status || 'Pending'}</td>
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