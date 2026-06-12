import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MojaLodowka.css";
import BottomNav from "../components/BottomNav";
import Icon from "../components/Icon";
import SkanujParagon from "./SkanujParagon";

const initialProducts = [
  {
    id: 1,
    name: "Marchew",
    amount: "500g",
    daysLeft: 3,
    image:
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop",
    category: "warzywa",
  },
  {
    id: 2,
    name: "Mleko 3.2%",
    amount: "1L",
    daysLeft: 0,
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    category: "nabial",
  },
  {
    id: 3,
    name: "Pierś z kurczaka",
    amount: "450g",
    daysLeft: 2,
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop",
    category: "mieso",
  },
  {
    id: 4,
    name: "Papryka Czerwona",
    amount: "2 szt.",
    daysLeft: 6,
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&h=200&fit=crop",
    category: "warzywa",
  },
];

const simulatedScannedProducts = [
  {
    id: 101,
    name: "Jogurt naturalny",
    amount: "1 szt.",
    daysLeft: 5,
    image:
      "https://www.krasnystaw.eu/pliki/pobierz/WHXdI1eEZQoAEibwjdM0zmMyWx3mrl7q/jogurt-naturalny-kubek-175png.png",
    category: "nabial",
  },
  {
    id: 102,
    name: "Pomidory",
    amount: "500g",
    daysLeft: 4,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop",
    category: "warzywa",
  },
  {
    id: 103,
    name: "Szynka z indyka",
    amount: "200g",
    daysLeft: 3,
    image:
      "https://esklep.spolembialystok.pl/140-large_default/szynka-z-indyka-prasowana-kg.jpg",
    category: "mieso",
  },
  {
    id: 104,
    name: "Jajka",
    amount: "10 szt.",
    daysLeft: 10,
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=200&h=200&fit=crop",
    category: "nabial",
  },
];

const categories = [
  { id: "wszystko", label: "Wszystko" },
  { id: "mieso", label: "Mięso" },
  { id: "nabial", label: "Nabiał" },
  { id: "warzywa", label: "Warzywa" },
];

export default function MojaLodowka() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState(() => {
    if (location.state?.showNewProduct) {
      return [...simulatedScannedProducts, ...initialProducts];
    }
    return initialProducts;
  });
  const [activeCategory, setActiveCategory] = useState("wszystko");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentScreen, setCurrentScreen] = useState("main");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "wszystko" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDaysLabel = (days) => {
    if (days === 0) return "DZIŚ";
    if (days === 1) return "1 DZIEŃ";
    return `${days} DNI`;
  };

  const getBadgeClass = (days) => {
    if (days === 0) return "badge badge-today";
    if (days <= 2) return "badge badge-soon";
    return "badge badge-normal";
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <div className="app-container">
      <header className="mock-topbar">
        <span style={{ fontSize: "24px", cursor: "pointer", lineHeight: "1" }}>
          ≡
        </span>
        <span>Fridge2Table</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => navigate("/profil")}
        >
          <Icon name="profile" size={24} />
        </div>
      </header>

      <main className="main-content">
        <div className="action-buttons">
          <button
            className="action-btn"
            onClick={() => navigate("/skanuj-paragon")}
          >
            <div className="action-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="14" y2="12" />
                <line x1="7" y1="16" x2="11" y2="16" />
              </svg>
            </div>
            <span>Skanuj paragon</span>
          </button>

          <button
            className="action-btn"
            onClick={() => navigate("/skanuj-kod")}
          >
            <div className="action-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="7" y1="7" x2="7" y2="17" />
                <line x1="10" y1="7" x2="10" y2="17" />
                <line x1="13" y1="7" x2="13" y2="17" />
                <line x1="16" y1="7" x2="16" y2="17" />
              </svg>
            </div>
            <span>Skanuj kod</span>
          </button>

          <button
            className="action-btn"
            onClick={() => navigate("/dodaj-recznie")}
          >
            <div className="action-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <span>Dodaj ręcznie</span>
          </button>
        </div>

        <div className="search-container">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Szukaj składników..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <button
                className="delete-btn"
                aria-label="Usuń produkt"
                onClick={() => handleDeleteProduct(product.id)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 6h18v2H3V6zm2 3h14l-1 12H6L5 9zm5-6h4v2h-4V3z" />
                </svg>
              </button>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta">
                  <span className="product-amount">{product.amount}</span>
                  <span className={getBadgeClass(product.daysLeft)}>
                    {getDaysLabel(product.daysLeft)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav currentTab="lodowka" />
    </div>
  );
}
