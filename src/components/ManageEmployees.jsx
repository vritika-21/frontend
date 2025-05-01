import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    // Fetch employees on mount
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, department }),
      });
      if (response.ok) {
        setName('');
        setEmail('');
        setDepartment('');
        // Re-fetch employees after successful addition
        const fetchResponse = await fetch('/api/employees');
        if (fetchResponse.ok) {
          const updatedData = await fetchResponse.json();
          setEmployees(updatedData);
        }
      }
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
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
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Manage Employees</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Add Employee
          </button>
        </form>
        <div className="mt-8">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Name</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Email</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Department</th>
                <th className="py-2 px-4 border-b bg-gray-100 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee._id}>
                  <td className="py-2 px-4 border-b">{employee.name}</td>
                  <td className="py-2 px-4 border-b">{employee.email}</td>
                  <td className="py-2 px-4 border-b">{employee.department}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="text-red-600 hover:underline mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => alert('Edit functionality to be implemented')}
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