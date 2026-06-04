"use client";

import React, { useState, useEffect } from "react";
import "./SkanujParagon.css";
import Icon from "../components/Icon";
import BottomNav from "../components/BottomNav";
import paragon_fiskalny from "../assets/paragon_fiskalny.jpg";

export default function SkanujParagon({ onClose, onProductAdded }) {
  const [scanPhase, setScanPhase] = useState("scanning");
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setScanPhase("found");
    }, 2500);

    const timer2 = setTimeout(() => {
      setScanPhase("success");
    }, 4000);

    const timer3 = setTimeout(() => {
      onProductAdded && onProductAdded();
      onClose();
    }, 5500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onClose, onProductAdded]);

  const handleCapture = () => {
    setScanPhase("found");
    setTimeout(() => setScanPhase("success"), 1500);
    setTimeout(() => {
      onProductAdded && onProductAdded();
      onClose();
    }, 3000);
  };

  return (
    <div className="scanner-container">
      <header className="scanner-header">
        <button
          className="scanner-close-btn"
          onClick={onClose}
          aria-label="Zamknij"
        >
          <Icon name="close" size={24} />
        </button>
        <h1 className="scanner-title">Skanuj paragon</h1>
        <button
          className={`scanner-flash-btn ${showFlash ? "active" : ""}`}
          onClick={() => setShowFlash(!showFlash)}
          aria-label="Lampa błyskowa"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            {!showFlash && (
              <line x1="4" y1="4" x2="20" y2="20" strokeWidth="2" />
            )}
          </svg>
        </button>
      </header>

      <div className="scanner-camera-view">
        <img
          src={paragon_fiskalny}
          alt="Paragon"
          className="scanner-background-image"
        />

        <div className="scan-frame receipt-frame">
          <div className="frame-corner top-left"></div>
          <div className="frame-corner top-right"></div>
          <div className="frame-corner bottom-left"></div>
          <div className="frame-corner bottom-right"></div>

          {scanPhase === "scanning" && <div className="scan-line"></div>}
        </div>

        {scanPhase === "found" && (
          <div className="scan-status found">
            <div className="status-icon">
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
            <p>Analizuję paragon...</p>
          </div>
        )}

        {scanPhase === "success" && (
          <div className="scan-status success">
            <div className="status-icon success-icon">
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
            <p>Dodano 4 produkty!</p>
          </div>
        )}
      </div>

      <div className="scanner-controls">
        <button className="control-btn gallery-btn" aria-label="Galeria">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>
        <button
          className="control-btn capture-btn"
          onClick={handleCapture}
          aria-label="Zrób zdjęcie"
        >
          <div className="capture-inner"></div>
        </button>
        <button className="control-btn history-btn" aria-label="Historia">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </button>
      </div>

      <BottomNav currentTab="lodowka" />
    </div>
  );
}
