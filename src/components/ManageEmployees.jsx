import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE = process.env.REACT_APP_API_BASE;

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('active');
  const [leaveBalance, setLeaveBalance] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Unauthorized access. Please log in.");
      navigate('/login');
      return;
    }

    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/hr/employees`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          toast.error("Failed to fetch employees.");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Error contacting server.");
      }
    };

    fetchEmployees();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Unauthorized access. Please log in.");
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/hr/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          emp_name: name,
          emp_email: email,
          emp_password: '', 
          emp_department: department,
          emp_status: status,
          leaveBalance: leaveBalance,
        }),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setDepartment('');
        setStatus('active');
        setLeaveBalance(12);
        toast.success('Employee added successfully!');
        // Refresh employee list
        const fetchResponse = await fetch(`${API_BASE}/api/hr/employees`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (fetchResponse.ok) {
          const updatedData = await fetchResponse.json();
          setEmployees(updatedData);
        }
      } else {
        const errData = await response.json();
        toast.error(errData.message || 'Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('An error occurred while adding the employee.');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE}/api/hr/employees/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setEmployees(prev => prev.filter(emp => emp._id !== id));
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
      <Navbar />
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg min-h-[500px]">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Manage Employees</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Employee Name</label>
            <input
              id="name"
              type="text"
              placeholder="Employee Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
            <input
              id="department"
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div>
            <label htmlFor="leaveBalance" className="block text-sm font-medium text-gray-700">Leave Balance</label>
            <input
              id="leaveBalance"
              type="number"
              placeholder="Leave Balance"
              value={leaveBalance}
              onChange={(e) => setLeaveBalance(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Add Employee
          </button>
        </form>

        {/* Employee Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Name</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Email</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Department</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Status</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Leave Balance</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee._id}>
                  <td className="py-2 px-4 border-b">{employee.emp_name}</td>
                  <td className="py-2 px-4 border-b">{employee.emp_email}</td>
                  <td className="py-2 px-4 border-b">{employee.emp_department}</td>
                  <td className="py-2 px-4 border-b">{employee.emp_status}</td>
                  <td className="py-2 px-4 border-b">{employee.leaveBalance}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="text-red-600 hover:underline mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => toast.info('Edit functionality to be implemented')}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployees;
