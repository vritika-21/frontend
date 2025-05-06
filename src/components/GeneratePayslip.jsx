import React, { useState } from 'react';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const API_BASE = process.env.REACT_APP_API_BASE;

const GeneratePayslip = () => {
  const [selectedEmpId, setSelectedEmpId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGeneratePayslip = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found. Please log in.');
      return;
    }

    if (!selectedEmpId) {
      toast.warning('Please enter an employee ID');
      return;
    }

    setLoading(true);

    try {
      const downloadUrl = `${API_BASE}/api/hr/generate-payslip/${selectedEmpId}`;

      const response = await fetch(downloadUrl, {
        method: 'POST', 
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Failed to generate payslip: ${errorData.message || 'Unknown error'}`);
        setLoading(false);
        return;
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Payslip_${selectedEmpId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Payslip generated and downloaded!');
    } catch (error) {
      toast.error('Error generating payslip');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
      <Navbar />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Generate Payslip</h2>
        <form className="space-y-4" onSubmit={handleGeneratePayslip}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Employee ID:
          </label>
          <input
            type="text"
            value={selectedEmpId}
            onChange={e => setSelectedEmpId(e.target.value)}
            placeholder="Enter employee ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {loading ? 'Generating...' : 'Generate Payslip'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslip;
