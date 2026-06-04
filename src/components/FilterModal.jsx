import React, { useState } from "react";
import Button from "./Button";
import "./FilterModal.css";

const FilterModal = ({ isOpen, onClose }) => {
  const [kuchnia, setKuchnia] = useState(["Polska"]); 
  const [czas, setCzas] = useState("15-30 min"); 
  const [trudnosc, setTrudnosc] = useState("Łatwy"); 
  const [dieta, setDieta] = useState(["Bezglutenowa"]); 
  const [sortowanie, setSortowanie] = useState("Najnowsze"); 

  if (!isOpen) return null;

  // Funkcja dla filtrów wielokrotnego wyboru (Kuchnia, Dieta)
  const toggleMultiple = (item, stateGetter, stateSetter) => {
    if (stateGetter.includes(item)) {
      stateSetter(stateGetter.filter((i) => i !== item));
    } else {
      stateSetter([...stateGetter, item]);
    }
  };

  // Funkcja resetująca wszystkie filtry do ustawień domyślnych
  const handleReset = () => {
    setKuchnia([]);
    setCzas("");
    setTrudnosc("");
    setDieta([]);
    setSortowanie("Najnowsze");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Nagłówek */}
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>✕</button>
          <h2>Filtry</h2>
          <button className="reset-btn" onClick={handleReset}>Resetuj</button>
        </div>

        {/* Przewijana treść */}
        <div className="modal-body">
          
          {/* Typ kuchni */}
          <div className="filter-section">
            <div className="filter-section-title">Typ kuchni</div>
            <div className="chips-row">
              {["Polska", "Włoska", "Azjatycka", "Indyjska"].map((item) => (
                <div 
                  key={item} 
                  className={`filter-chip ${kuchnia.includes(item) ? "active" : ""}`}
                  onClick={() => toggleMultiple(item, kuchnia, setKuchnia)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Czas przygotowania */}
          <div className="filter-section">
            <div className="filter-section-title">Czas przygotowania</div>
            <div className="chips-row">
              {["< 15 min", "15-30 min", "> 30 min"].map((item) => (
                <div 
                  key={item} 
                  className={`filter-chip ${czas === item ? "active" : ""}`}
                  onClick={() => setCzas(item === czas ? "" : item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Poziom trudności */}
          <div className="filter-section">
            <div className="filter-section-title">Poziom trudności</div>
            <div className="chips-row">
              {["Łatwy", "Średni", "Trudny"].map((item) => (
                <div 
                  key={item} 
                  className={`filter-chip ${trudnosc === item ? "active" : ""}`}
                  onClick={() => setTrudnosc(item === trudnosc ? "" : item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Dieta */}
          <div className="filter-section">
            <div className="filter-section-title">Dieta</div>
            <div className="chips-row">
              {["Wegetariańska", "Wegańska", "Bezglutenowa", "Keto"].map((item) => (
                <div 
                  key={item} 
                  className={`filter-chip ${dieta.includes(item) ? "active" : ""}`}
                  onClick={() => toggleMultiple(item, dieta, setDieta)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Sortuj według */}
          <div className="filter-section">
            <div className="filter-section-title">Sortuj według</div>
            <div className="sort-container">
              {["Najnowsze", "Najlepiej oceniane", "Najmniej kalorii"].map((item) => (
                <div 
                  key={item} 
                  className={`sort-item ${sortowanie === item ? "active" : ""}`}
                  onClick={() => setSortowanie(item)}
                >
                  <span className="sort-label">{item}</span>
                  <div className="custom-radio"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Baner */}
          <div className="filter-banner">
            <p>Odkryj ponad 200+ przepisów<br/>dopasowanych do Twoich filtrów</p>
          </div>

        </div>

        {/* Stopka */}
        <div className="modal-footer">
          <Button variant="primary" onClick={onClose}>
            Pokaż wyniki (42)
          </Button>
        </div>

      </div>
    </div>
  );
};

export default FilterModal;