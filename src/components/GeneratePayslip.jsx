import React from 'react';
import Navbar from './Navbar';
const GeneratePayslip = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
      <Navbar />  
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Generate Payslip</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Employee ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Generate Payslip
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslip;