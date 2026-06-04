"use client";

import React, { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Password reset requested for:', email);
    };
    return (
        <div className="forgot-password-container">
            <div className="forgot-password-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2v6h-6" />
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                    <path d="M3 22v-6h6" />
                    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                </svg>
            </div>

            <div className="forgot-password-header">
                <h1 className="forgot-password-title">Odzyskaj hasło</h1>
                <p className="forgot-password-subtitle">
                    Wpisz swój adres e-mail, aby otrzymać instrukcję resetowania hasła.
                </p>
            </div>

            <div className="forgot-password-card">
                <form className="forgot-password-form" onSubmit={handleSubmit}>
                    <div className="forgot-password-input-group">
                        <label className="forgot-password-input-label">Adres e-mail</label>
                        <div className="forgot-password-input-wrapper">
                            <svg className="forgot-password-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <input
                                type="email"
                                className="forgot-password-input"
                                placeholder="twoj@email.pl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="forgot-password-submit-btn">
                        Wyślij link
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </form>
            </div>

            <button className="forgot-password-back-link" onClick={() => navigate('/logowanie')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
                Wróć do logowania
            </button>
        </div>
    );
};

export default ForgotPassword;
