import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

const GenerateOfferLetter = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);

  useEffect(() => {
    if (!employeeId || employeeId.length < 24) {  
      setEmployeeDetails(null);
      return;
    }

    const fetchEmployee = async () => {
      setLoadingDetails(true);
      try {
        const res = await fetch(`http://localhost:5001/api/hr/employees/${employeeId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          
        });
        if (res.ok) {
          const data = await res.json();
          setEmployeeDetails(data);
          toast.dismiss(); 
        } else {
          setEmployeeDetails(null);
          toast.error('Employee not found');
        }
      } catch (err) {
        setEmployeeDetails(null);
        toast.error('Error fetching employee details');
      }
      setLoadingDetails(false);
    };

    fetchEmployee();
  }, [employeeId]);

  // Generate Offer Letter PDF
  const handleGenerateOfferLetter = async (e) => {
    e.preventDefault();
    if (!employeeId || employeeId.length < 24) {
      toast.warning('Please enter a valid Employee ID');
      return;
    }
    setLoadingGenerate(true);
    try {
      const response = await fetch(`http://localhost:5001/api/hr/offer-letter/${employeeId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        toast.error('Failed to generate offer letter');
        setLoadingGenerate(false);
        return;
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Offer_Letter_${employeeDetails?.emp_name || employeeId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success('Offer letter generated and downloaded!');
    } catch (error) {
      toast.error('Error generating offer letter');
    }
    setLoadingGenerate(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
      <Navbar />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Generate Offer Letter</h2>
        <form className="space-y-4" onSubmit={handleGenerateOfferLetter}>
          <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Employee ID:
          </label>
          <input
            id="employeeId"
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value.trim())}
            placeholder="Enter Employee ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {loadingDetails && <p className="text-sm text-gray-500">Loading employee details...</p>}
          {employeeDetails && (
            <div className="bg-gray-50 p-4 rounded-lg mb-2">
              <div><strong>Name:</strong> {employeeDetails.emp_name}</div>
              <div><strong>Email:</strong> {employeeDetails.emp_email}</div>
              <div><strong>Department:</strong> {employeeDetails.emp_department}</div>
            </div>
          )}
          <button
            type="submit"
            disabled={loadingGenerate}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {loadingGenerate ? 'Generating...' : 'Generate Offer Letter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateOfferLetter;
