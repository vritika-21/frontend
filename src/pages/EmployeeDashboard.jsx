import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                fontFamily: '"Poppins", sans-serif'
            }}>
                <div style={{
                    backgroundColor: '#ffffff',
                    padding: '2rem 3rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    maxWidth: '450px',
                    width: '100%',
                    border: '1px solid #e0e0e0'
                }}>
                    <h1 style={{ marginBottom: '1rem', color: '#333' }}>Employee Panel</h1>
                    <p style={{ marginBottom: '2rem', color: '#555' }}>Manage your daily activities below:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button
                            onClick={() => navigate('/attendance')}
                            style={{
                                padding: '0.85rem',
                                borderRadius: '8px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            Mark Attendance
                        </button>
                        <button
                            onClick={() => navigate('/leave')}
                            style={{
                                padding: '0.85rem',
                                borderRadius: '8px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            Apply for Leave
                        </button>
                        <div style={{
                            marginTop: '2rem',
                            backgroundColor: '#fff8e1',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid #ffe082',
                            textAlign: 'center'
                        }}>
                            <p style={{ marginBottom: '1rem', color: '#856404', fontSize: '1.1rem' }}>
                                Hey! How was your experience? Want to give feedback?
                            </p>
                            <button
                                onClick={() => navigate('/feedback')}
                                style={{
                                    padding: '0.85rem 1.5rem',
                                    borderRadius: '8px',
                                    backgroundColor: '#ffc107',
                                    color: '#000',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    transition: 'background-color 0.3s ease'
                                }}
                            >
                                Give Feedback
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeDashboard;