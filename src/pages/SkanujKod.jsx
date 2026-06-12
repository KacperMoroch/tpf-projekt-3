"use client";

import React, { useState, useEffect } from "react";
import "./SkanujKod.css";
import Icon from "../components/Icon";
import kodKreskowy from "../assets/kod_kreskowy.jpg";
import { useNavigate } from "react-router-dom";

export default function SkanujKod({ onClose, onProductAdded, onManualEntry }) {
  const [scanPhase, setScanPhase] = useState("scanning");
  const navigate = useNavigate();

  const finishSimulation = () => {
    if (onProductAdded) onProductAdded();
    navigate("/lodowka", { state: { addedFromBarcode: true } });
  };

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setScanPhase("found");
    }, 3000);

    const timer2 = setTimeout(() => {
      setScanPhase("success");
    }, 4500);

    const timer3 = setTimeout(() => {
      finishSimulation();
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onProductAdded, navigate]);

  return (
    <div className="code-scanner-container">
      <header className="code-scanner-header">
        <button
          className="code-scanner-close-btn"
          onClick={onClose}
          aria-label="Zamknij"
        >
          <Icon name="close" size={24} />
        </button>
        <h1 className="code-scanner-title">Skanuj kod</h1>
        <button className="code-scanner-flash-btn" aria-label="Lampa błyskowa">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </button>
      </header>

      <div className="code-scanner-camera-view">
        <img
          src={kodKreskowy}
          alt="Kod kreskowy produktu"
          className="code-scanner-background-image"
        />

        <div className="code-scan-frame">
          <div className="code-frame-corner top-left"></div>
          <div className="code-frame-corner top-right"></div>
          <div className="code-frame-corner bottom-left"></div>
          <div className="code-frame-corner bottom-right"></div>

          {scanPhase === "scanning" && <div className="code-scan-line"></div>}
        </div>

        {scanPhase === "scanning" && (
          <div className="code-scan-instructions">
            <p className="instruction-main">
              Zeskanuj kod kreskowy na opakowaniu
            </p>
            <p className="instruction-sub">
              Trzymaj telefon stabilnie w świetle
            </p>
          </div>
        )}

        {scanPhase === "found" && (
          <div className="code-scan-status found">
            <div className="code-status-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <p>Rozpoznaję produkt...</p>
          </div>
        )}

        {scanPhase === "success" && (
          <div className="code-scan-status success">
            <div className="code-status-icon success-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p>Dodano: Awokado Hass</p>
          </div>
        )}
      </div>

      <div className="manual-entry-card">
        <div className="manual-entry-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </div>
        <div className="manual-entry-text">
          <p className="manual-entry-title">Wpisz ręcznie</p>
          <p className="manual-entry-subtitle">Jeśli kod jest nieczytelny</p>
        </div>
        <button className="manual-entry-btn" onClick={onManualEntry}>
          Wpisz
        </button>
      </div>
    </div>
  );
}
