"use client";

import React, { useState } from "react";
import "./DodajRecznie.css";
import Icon from "../components/Icon";
import BottomNav from "../components/BottomNav";
import { useNavigate } from "react-router-dom";

export default function DodajRecznie({ onClose, onProductAdded }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "1",
    unit: "szt.",
    expiryDate: "",
  });

  const categories = [
    { value: "", label: "Wybierz kategorię" },
    { value: "warzywa", label: "Warzywa" },
    { value: "owoce", label: "Owoce" },
    { value: "nabial", label: "Nabiał" },
    { value: "mieso", label: "Mięso" },
    { value: "pieczywo", label: "Pieczywo" },
    { value: "napoje", label: "Napoje" },
    { value: "inne", label: "Inne" },
  ];

  const units = ["szt.", "g", "kg", "ml", "L"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    navigate("/lodowka", { state: { addedManually: true } });
  };

  const setQuickDate = (daysFromNow) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    const formatted = date.toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, expiryDate: formatted }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.category) {
      onProductAdded && onProductAdded(formData);
      if (onClose) onClose();
    }
  };

  return (
    <div className="add-manual-container">
      <header className="add-manual-header">
        <button
          className="add-manual-close-btn"
          onClick={onClose}
          aria-label="Zamknij"
        >
          <Icon name="close" size={24} />
        </button>
        <h1 className="add-manual-title">Dodaj ręcznie</h1>
        <button
          className="add-manual-notification-btn"
          aria-label="Powiadomienia"
          onClick={() =>
            navigate("/profil", { state: { openView: "notifications" } })
          }
        >
          <Icon name="bell" size={24} />
        </button>
      </header>

      <main className="add-manual-content">
        {/* Baner */}
        <div className="add-manual-banner">
          <img
            src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=200&fit=crop"
            alt="Organizacja kuchni"
            className="banner-image"
          />
          <div className="banner-overlay">
            <p className="banner-subtitle">Organizacja kuchni</p>
            <h2 className="banner-title">UTRZYMAJ ŚWIEŻOŚĆ NA DŁUŻEJ</h2>
          </div>
        </div>

        <form className="add-manual-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="14" y2="12" />
              </svg>
              Nazwa produktu
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="np. Mleko, Pomidory"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Kategoria
            </label>
            <div className="select-wrapper">
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <svg
                className="select-arrow"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
              </svg>
              Ilość / Waga
            </label>
            <div className="quantity-row">
              <input
                type="number"
                className="form-input quantity-input"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
              />
              <div className="select-wrapper unit-select">
                <select
                  className="form-select"
                  value={formData.unit}
                  onChange={(e) => handleInputChange("unit", e.target.value)}
                >
                  {units.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                <svg
                  className="select-arrow"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Data ważności
            </label>
            <input
              type="date"
              className="form-input date-input"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
            />
          </div>

          <div className="quick-dates">
            <span className="quick-dates-label">Szybkie sugestie daty:</span>
            <div className="quick-date-buttons">
              <button
                type="button"
                className="quick-date-btn"
                onClick={() => setQuickDate(0)}
              >
                Dziś
              </button>
              <button
                type="button"
                className="quick-date-btn"
                onClick={() => setQuickDate(3)}
              >
                + 3 dni
              </button>
              <button
                type="button"
                className="quick-date-btn"
                onClick={() => setQuickDate(7)}
              >
                + 7 dni
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn" onClick={handleSave}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Zapisz produkt
          </button>
        </form>

        <div className="info-cards">
          <div className="info-card eco-card">
            <div className="info-card-icon eco">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2a10 10 0 0 1 7.38 16.75" />
                <path d="M12 2a10 10 0 0 0-7.38 16.75" />
                <path d="M12 2v10l4 4" />
              </svg>
            </div>
            <h3 className="info-card-title">Porada eko</h3>
            <p className="info-card-text">
              Przechowuj pomidory poza lodówką, aby zachowały pełnię smaku.
            </p>
          </div>
          <div className="info-card recent-card">
            <div className="info-card-icon recent">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3 className="info-card-title">Ostatnio dodane</h3>
            <p className="info-card-text">Masło, Chleb żytni, Jogurt grecki</p>
          </div>
        </div>
      </main>

      <BottomNav currentTab="lodowka" />
    </div>
  );
}
