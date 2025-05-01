import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('/api/feedbacks');
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
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100 text-center">Feedbacks</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{fb.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFeedback;