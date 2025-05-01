import React from 'react';
import Navbar from '../components/Navbar';

const Leave = () => {
    return (
        <>
            <Navbar />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #ffd6e0 0%, #f6abb6 100%)',
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
                    <h1 style={{ marginBottom: '1rem', color: '#333' }}>Leave Application</h1>
                    <p style={{ marginBottom: '2rem', color: '#555' }}>Fill in your leave details below:</p>
                    <form>
                        <input
                            type="text"
                            placeholder="Reason for Leave"
                            style={{
                                padding: '0.75rem',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                marginBottom: '1rem',
                                width: '100%'
                            }}
                        />
                        <input
                            type="date"
                            style={{
                                padding: '0.75rem',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                marginBottom: '1rem',
                                width: '100%'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '0.85rem',
                                borderRadius: '8px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                width: '100%',
                                transition: 'background-color 0.3s ease'
                            }}
                        >
                            Submit Leave Request
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Leave;