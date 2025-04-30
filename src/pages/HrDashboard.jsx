import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HrDashboard = () => {
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
                    <h1 style={{ marginBottom: '1rem', color: '#333' }}>HR Panel</h1>
                    <p style={{ marginBottom: '2rem', color: '#555' }}>Manage Employees, Feedback, Leaves, Payslips</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button
                            onClick={() => navigate('/manage-employees')}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '5px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Manage Employees
                        </button>
                        <button
                            onClick={() => navigate('/view-feedback')}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '5px',
                                backgroundColor: '#17a2b8',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            View Feedback
                        </button>
                        <button
                            onClick={() => navigate('/approve-leaves')}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '5px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Approve Leaves
                        </button>
                        <button
                            onClick={() => navigate('/generate-payslip')}
                            style={{
                                padding: '0.75rem',
                                borderRadius: '5px',
                                backgroundColor: '#ffc107',
                                color: '#000',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Generate Payslip
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HrDashboard;