"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListaZakupow.css";
import BottomNav from "../components/BottomNav";
import Icon from "../components/Icon";
import TopBar from "../components/TopBar";

const initialShoppingList = [
  {
    id: 1,
    name: "Mleko owsiane",
    quantity: "2 szt.",
    details: "1 litr",
    category: "nabial",
    checked: false,
    important: false,
  },
  {
    id: 2,
    name: "Szpinak baby",
    quantity: "1 opakowanie",
    details: "200g",
    category: "warzywa",
    checked: false,
    important: false,
  },
  {
    id: 3,
    name: "Awokado Hass",
    quantity: "2 szt.",
    details: "",
    category: "owoce",
    checked: true,
    important: false,
  },
];

const categoryOptions = [
  { id: "warzywa", label: "Warzywa" },
  { id: "nabial", label: "Nabiał" },
  { id: "mieso", label: "Mięso" },
  { id: "owoce", label: "Owoce" },
];

const unitOptions = ["szt.", "kg", "g", "l", "ml", "opakowanie"];

export default function ListaZakupow({ onMoveToFridge }) {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialShoppingList);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: 1,
    unit: "szt.",
    category: "warzywa",
    important: false,
  });

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleAddProduct = () => {
    if (!newProduct.name.trim()) return;

    const product = {
      id: Date.now(),
      name: newProduct.name,
      quantity: `${newProduct.quantity} ${newProduct.unit}`,
      details: "",
      category: newProduct.category,
      checked: false,
      important: newProduct.important,
    };

    if (newProduct.important) {
      setItems((prev) => [product, ...prev]);
    } else {
      setItems((prev) => [...prev, product]);
    }

    setNewProduct({
      name: "",
      quantity: 1,
      unit: "szt.",
      category: "warzywa",
      important: false,
    });
    setShowModal(false);
  };

  const handleMoveToFridge = () => {
    const checkedItems = items.filter((item) => item.checked);
    const remainingItems = items.filter((item) => !item.checked);
    setItems(remainingItems);
    if (onMoveToFridge) {
      onMoveToFridge(checkedItems);
    }
    setTimeout(() => {
      navigate("/lodowka", { state: { addedFromBarcode: true } });
    }, 500);
  };

  const checkedCount = items.filter((item) => item.checked).length;
  const totalCount = items.length;

  return (
    <div className="lista-container">
      <TopBar />

      <div className="lista-title-section">
        <h2 className="lista-title">Lista Zakupów</h2>
        <span className="lista-count">{totalCount} produktów</span>
      </div>

      <main className="lista-content">
        <div className="lista-section-header">ŚWIEŻE PRODUKTY</div>

        <div className="lista-items">
          {items.map((item) => (
            <div
              key={item.id}
              className={`lista-item ${item.checked ? "lista-item--checked" : ""}`}
              onClick={() => toggleItem(item.id)}
            >
              <div
                className={`lista-checkbox ${item.checked ? "lista-checkbox--checked" : ""}`}
              >
                {item.checked && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="lista-item-content">
                <span className="lista-item-name">{item.name}</span>
                <span className="lista-item-details">
                  {item.quantity}
                  {item.details && ` • ${item.details}`}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="lista-actions">
          <button className="lista-add-btn" onClick={() => setShowModal(true)}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Dodaj produkt
          </button>

          <button
            className="lista-move-btn"
            onClick={handleMoveToFridge}
            disabled={checkedCount === 0}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="4" y1="10" x2="20" y2="10" />
            </svg>
            Przenieś kupione do lodówki
          </button>
        </div>
      </main>

      <BottomNav currentTab="zakupy" />

      {showModal && (
        <div
          className="lista-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div className="lista-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lista-modal-header">
              <h3 className="lista-modal-title">Dodaj produkt</h3>
              <button
                className="lista-modal-close"
                onClick={() => setShowModal(false)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="lista-modal-body">
              <div className="lista-modal-field">
                <label className="lista-modal-label">Nazwa produktu</label>
                <input
                  type="text"
                  className="lista-modal-input"
                  placeholder="np. Pomidory malinowe"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>

              <div className="lista-modal-row">
                <div className="lista-modal-field lista-modal-field--quantity">
                  <label className="lista-modal-label">Ilość</label>
                  <div className="lista-quantity-control">
                    <button
                      className="lista-quantity-btn"
                      onClick={() =>
                        setNewProduct({
                          ...newProduct,
                          quantity: Math.max(1, newProduct.quantity - 1),
                        })
                      }
                      aria-label="Zmniejsz ilość"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                    <span className="lista-quantity-value">
                      {newProduct.quantity}
                    </span>
                    <button
                      className="lista-quantity-btn"
                      onClick={() =>
                        setNewProduct({
                          ...newProduct,
                          quantity: newProduct.quantity + 1,
                        })
                      }
                      aria-label="Zwiększ ilość"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="lista-modal-field lista-modal-field--unit">
                  <label className="lista-modal-label">Jednostka</label>
                  <div className="lista-select-wrapper">
                    <select
                      className="lista-modal-select"
                      value={newProduct.unit}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, unit: e.target.value })
                      }
                    >
                      {unitOptions.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="lista-select-chevron"
                      width="16"
                      height="16"
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

              <div className="lista-modal-field">
                <label className="lista-modal-label">Kategoria</label>
                <div className="lista-category-pills">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat.id}
                      className={`lista-category-pill ${newProduct.category === cat.id ? "lista-category-pill--active" : ""}`}
                      onClick={() =>
                        setNewProduct({ ...newProduct, category: cat.id })
                      }
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lista-toggle-row">
                <div className="lista-toggle-info">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <div className="lista-toggle-text">
                    <span className="lista-toggle-label">Ważne</span>
                    <span className="lista-toggle-description">
                      Pokaż na górze listy
                    </span>
                  </div>
                </div>
                <label className="lista-toggle-switch">
                  <input
                    type="checkbox"
                    checked={newProduct.important}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        important: e.target.checked,
                      })
                    }
                  />
                  <span className="lista-toggle-slider"></span>
                </label>
              </div>

              <button className="lista-modal-submit" onClick={handleAddProduct}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3v18M5.5 8.5L12 3l6.5 5.5M5.5 15.5L12 21l6.5-5.5" />
                </svg>
                Dodaj do listy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
