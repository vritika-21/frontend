import React, { useState } from 'react';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const ApproveLeaves = () => {
  const [leaveRequestId, setLeaveRequestId] = useState('');
  const [status, setStatus] = useState('');

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/hr/employees/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ leaveRequestId, status: 'approved' }),
      });
      if (response.ok) {
        setStatus('approved');
        toast.success('Leave approved successfully!');
      } else {
        toast.error('Failed to approve leave');
      }
    } catch (error) {
      toast.error('Error approving leave');
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/hr/employees/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ leaveRequestId, status: 'rejected' }),
      });
      if (response.ok) {
        setStatus('rejected');
        toast.success('Leave rejected successfully!');
      } else {
        toast.error('Failed to reject leave');
      }
    } catch (error) {
      toast.error('Error rejecting leave');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
      <Navbar />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Leave Requests</h2>
        <form className="space-y-4">
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Employee ID:</label>
          <input
            id="employeeId"
            type="text"
            placeholder="Employee ID"
            value={leaveRequestId}
            onChange={(e) => setLeaveRequestId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            onClick={handleApprove}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Approve Leave
          </button>
          <button
            type="submit"
            onClick={handleReject}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Reject Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApproveLeaves;