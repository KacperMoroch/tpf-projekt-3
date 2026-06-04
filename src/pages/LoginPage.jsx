"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log('Zalogowano pomyślnie!', userCredential.user);
            navigate('/lodowka');
        } catch (error) {
            console.error('Błąd logowania:', error.message);
            alert("Błędny e-mail lub hasło!");
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo-section">
                <div className="login-logo-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <line x1="4" y1="10" x2="20" y2="10" />
                        <line x1="10" y1="2" x2="10" y2="10" />
                    </svg>
                </div>
                <h1 className="login-brand-name">Fridge2Table</h1>
                <p className="login-tagline">Twój asystent niemarnowania żywności</p>
            </div>

            <div className="login-card">
                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="login-input-group">
                        <label className="login-input-label">Adres e-mail</label>
                        <div className="login-input-wrapper">
                            <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                className="login-input"
                                placeholder="Wpisz swój e-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="login-input-group">
                        <label className="login-input-label">Hasło</label>
                        <div className="login-input-wrapper">
                            <svg className="login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input
                                type="password"
                                name="password"
                                className="login-input"
                                placeholder="Wpisz swoje hasło"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="login-forgot-password">
                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/zapomnialem-hasla'); }}>
                            Zapomniałeś hasła?
                        </a>
                    </div>

                    <button type="submit" className="login-submit-btn">
                        Zaloguj się
                    </button>
                </form>
            </div>

            <div className="login-divider">
                <div className="login-divider-line"></div>
                <span className="login-divider-text">Lub dołącz do nas</span>
                <div className="login-divider-line"></div>
            </div>

            <button className="login-register-btn" onClick={() => navigate('/rejestracja')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
                Zarejestruj się
            </button>

            <button className="login-guest-link" onClick={() => navigate('/lodowka')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 4v16" />
                    <path d="M19 4v16" />
                    <path d="M5 4l6 8-6 8" />
                </svg>
                Przejdź jako gość
            </button>
        </div>
    );
};

export default Login;