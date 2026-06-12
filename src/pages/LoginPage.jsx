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

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log('Zalogowano pomyślnie!', userCredential.user);
            navigate('/lodowka');
        } catch (error) {
            console.error('Błąd logowania:', error.code, error.message);

            let errorMessage = "Wystąpił błąd podczas logowania.";

            if (error.code === 'auth/invalid-credential') {
                errorMessage = "Błędny e-mail lub hasło. Spróbuj ponownie.";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Konto tymczasowo zablokowane po wielu nieudanych próbach. Odczekaj chwilę.";
            }

            setError(errorMessage);
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
                {error && (
                    <div className="login-error-message">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

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
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
                </svg>
                Przejdź jako gość
            </button>
        </div>
    );
};

export default Login;