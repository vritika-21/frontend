import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        
        const loggedUser = JSON.parse(localStorage.getItem('employee'));
        if (loggedUser) {
            setUser(loggedUser); 
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('employee'); 
        setUser(null); 
        navigate('/login'); 
    };

    return (
        <nav style={{
            backgroundColor: '#FFFAE1',
            padding: '1rem 2rem',
            color: 'black',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 4px 10px rgba(220, 187, 78, 0.1)',
            fontFamily: 'Arial, sans-serif',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
            }}>
                <img 
                    src="/images/logo.png" 
                    alt="Logo" 
                    style={{ height: '45px', width: '45px', objectFit: 'contain' }} 
                />
                <span style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                }}>
                    Work Nest
                </span>
            </div>

            <div style={{
                fontSize: '1.1rem',
                fontWeight: '500',
            }}>
                {user ? (
                    <div>
                        <span>Welcome, {user.name}!</span>
                        <button 
                            onClick={handleLogout} 
                            style={{ marginLeft: '1rem', backgroundColor: 'transparent', border: 'none', color: 'black', cursor: 'pointer' }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" style={{ color: 'black', textDecoration: 'none' }}>Login/Register</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;