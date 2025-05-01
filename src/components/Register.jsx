import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    emp_name: '',
    emp_email: '',
    emp_password: '',
    emp_role: 'employee',
    emp_department: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);  //add this
    try {
      await axios.post('http://localhost:5001/api/auth/register', formData,{withCredentials: true});
      toast.success('Registration successful!', {
        position: 'top-center',
        autoClose: 2000,
      });
      navigate('/login');
    } catch (err) {
      if (err.response.data.message === 'Email already exists') {
        toast.error('This email is already registered', {
          position: 'top-center',
          autoClose: 2000,
        });
      } else {
        console.error('Full error:', err.response.data); 
      toast.error('Registration failed!', {
        position: 'top-center',
        autoClose: 2000,
      });
      }
    }
  };

  return (
    <>
    <Navbar />
    <ToastContainer />
    <div className="min-h-screen pt-24 flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
     <div className="bg-white px-10 py-8 rounded-xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Registration Page</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

        <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
        <input name="emp_name" placeholder="Full Name" value={formData.emp_name} onChange={handleChange} required className="w-full p-2 border rounded" />

        <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
        <input name="emp_email" type="email" placeholder="Email" value={formData.emp_email} onChange={handleChange} required className="w-full p-2 border rounded" />

        <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
        <input name="emp_password" type="password" placeholder="Password" value={formData.emp_password} onChange={handleChange} required className="w-full p-2 border rounded" />

        <label className="block text-sm font-medium text-gray-700 mb-1">Role:</label>
        <select name="emp_role" value={formData.emp_role} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="employee">Employee</option>
        <option value="hr">HR</option>
        </select>

        <label className="block text-sm font-medium text-gray-700 mb-1">Department:</label>
        <input
         name="emp_department"
         placeholder="Department"
         value={formData.emp_department}
         onChange={handleChange}
         required
         className="w-full p-2 border rounded"
         />

            <button type="submit" className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">Register</button>
          </form>


          <p className="text-center text-gray-700 text-sm mt-4">
                      Don't have an account?{' '}
                      <a href="/login" className="text-yellow-600 font-semibold hover:underline">
                          Login Here
                      </a>
                  </p>
        </div>
    </div>
    </>
  );
};

export default Register;