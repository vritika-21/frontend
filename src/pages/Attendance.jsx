import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Attendance = () => {
    const [attendance, setAttendance] = useState({
        checkedIn: false,
        checkedOut: false
    });

    const handleCheckIn = () => {
        if (attendance.checkedIn) {
            toast.warning("Attendance already marked!");
        } else {
            setAttendance({ ...attendance, checkedIn: true });
            toast.success("Checked in successfully!");
        }
    };

    const handleCheckOut = () => {
        if (!attendance.checkedIn) {
            toast.warning("Please check in first!");
        } else if (attendance.checkedOut) {
            toast.warning("Already checked out!");
        } else {
            setAttendance({ ...attendance, checkedOut: true });
            toast.success("Checked out successfully!");
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #d0f4de 0%, #a9def9 100%)',
                fontFamily: '"Poppins", sans-serif',
                padding: '2rem'
            }}>
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '600px',
                    border: '1px solid #e0e0e0'
                }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Mark Your Attendance</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f1f1f1' }}>
                                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Date</th>
                                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Check-In</th>
                                <th style={{ padding: '0.75rem', border: '1px solid #ddd' }}>Check-Out</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                                    {new Date().toLocaleDateString()}
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                                    {attendance.checkedIn ? '✔️' : '-'}
                                </td>
                                <td style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'center' }}>
                                    {attendance.checkedOut ? '✔️' : '-'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                        <button
                            onClick={handleCheckIn}
                            style={{
                                padding: '0.85rem 1.5rem',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Check In
                        </button>
                        <button
                            onClick={handleCheckOut}
                            style={{
                                padding: '0.85rem 1.5rem',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Attendance;