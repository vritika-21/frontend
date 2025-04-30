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
                backgroundColor: '#f0f4f8',
                fontFamily: 'Arial, sans-serif'
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '2rem 3rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%'
                }}>
                    <h1 style={{ marginBottom: '1rem', color: '#333' }}>Employee Panel</h1>
                    <p style={{ marginBottom: '2rem', color: '#555' }}>Manage your daily activities below:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button
                            onClick={() => navigate('/attendance')}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '5px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Mark Attendance
                        </button>
                        <button
                            onClick={() => navigate('/leave')}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '5px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Apply for Leave
                        </button>
                        <div style={{
                            marginTop: '2rem',
                            backgroundColor: '#fff3cd',
                            padding: '1.5rem',
                            borderRadius: '8px',
                            border: '1px solid #ffeeba',
                            textAlign: 'center'
                        }}>
                            <p style={{ marginBottom: '1rem', color: '#856404', fontSize: '1.1rem' }}>
                                Hey! How was your experience? Want to give feedback?
                            </p>
                            <button
                                onClick={() => navigate('/feedback')}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '5px',
                                    backgroundColor: '#ffc107',
                                    color: '#000',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
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