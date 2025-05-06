import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const API_BASE = process.env.REACT_APP_API_BASE;

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/hr/view-feedback`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (res.ok) {
          const data = await res.json();
          setFeedbacks(data);
        }
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-600 font-poppins">
      <Navbar />
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Feedbacks</h2>
        <div className="flex flex-col items-center gap-6">
          {feedbacks.map((fb, index) => (
            <div key={index} className="w-full">
              <div className="bg-yellow-100 p-6 rounded-xl shadow-lg border border-yellow-300 transition-transform hover:scale-105 w-full">
                <p className="text-gray-700 text-base italic text-center">"{fb.message}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFeedback;
