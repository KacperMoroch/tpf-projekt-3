import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="not-found-container">
            <div className="not-found-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>

            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Ups! Pusta lodówka...</h2>

            <p className="not-found-text">
                Wygląda na to, że strona, której szukasz, nie istnieje lub została zjedzona.
            </p>

            <button className="not-found-button" onClick={() => navigate('/lodowka')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Wróć do lodówki
            </button>
        </div>
    );
}

export default NotFoundPage;