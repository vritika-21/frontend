import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const ApproveLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch leave requests on mount
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
         const res = await fetch('http://localhost:5001/api/hr/leaves', {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`,
         },
         });

        if (res.ok) {
          const data = await res.json();
          setLeaveRequests(data);
        } else {
          toast.error('Failed to fetch leave requests');
        }
      } catch (err) {
        toast.error('Error fetching leave requests');
      }
    };
    fetchLeaves();
  }, []);

  // Approve leave
  const handleApprove = async (leaveId) => {
    try {
      const res = await fetch('http://localhost:5001/api/hr/employees/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ leaveRequestId: leaveId, status: 'approved' }),
      });
      if (res.ok) {
        setLeaveRequests((prev) =>
          prev.map((leave) =>
            leave._id === leaveId ? { ...leave, status: 'approved' } : leave
          )
        );
        toast.success('Leave approved successfully!');
      } else {
        toast.error('Failed to approve leave');
      }
    } catch (err) {
      toast.error('Error approving leave');
    }
  };

  // Reject leave
  const handleReject = async (leaveId) => {
    try {
      const res = await fetch('http://localhost:5001/api/hr/employees/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ leaveRequestId: leaveId, status: 'rejected' }),
      });
      if (res.ok) {
        setLeaveRequests((prev) =>
          prev.map((leave) =>
            leave._id === leaveId ? { ...leave, status: 'rejected' } : leave
          )
        );
        toast.success('Leave rejected successfully!');
      } else {
        toast.error('Failed to reject leave');
      }
    } catch (err) {
      toast.error('Error rejecting leave');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
      <Navbar />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Leave Requests</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100">Employee ID</th>
              <th className="py-2 px-4 border-b bg-gray-100">From</th>
              <th className="py-2 px-4 border-b bg-gray-100">To</th>
              <th className="py-2 px-4 border-b bg-gray-100">Reason</th>
              <th className="py-2 px-4 border-b bg-gray-100">Status</th>
              <th className="py-2 px-4 border-b bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">No leave requests found.</td>
              </tr>
            ) : (
              leaveRequests.map((leave) => (
                <tr key={leave._id}>
                  <td className="py-2 px-4 border-b">{leave.employeeId}</td>
                  <td className="py-2 px-4 border-b">{leave.fromDate}</td>
                  <td className="py-2 px-4 border-b">{leave.toDate}</td>
                  <td className="py-2 px-4 border-b">{leave.reason}</td>
                  <td className="py-2 px-4 border-b capitalize">{leave.status}</td>
                  <td className="py-2 px-4 border-b">
                    {leave.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(leave._id)}
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(leave._id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className={`font-semibold ${leave.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveLeaves;
