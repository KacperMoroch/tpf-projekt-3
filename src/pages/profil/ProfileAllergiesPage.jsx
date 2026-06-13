import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import TopBar from "../../components/TopBar";
import BottomNav from "../../components/BottomNav";
import "./ProfilePage.css";

const ProfileAllergiesPage = () => {
  const navigate = useNavigate();
  const [activeDiets, setActiveDiets] = useState(["Bez glutenu", "Wegańska"]);

  const toggleDiet = (dietName) => {
    setActiveDiets((prevDiets) => {
      if (prevDiets.includes(dietName)) {
        return prevDiets.filter((d) => d !== dietName);
      } else {
        return [...prevDiets, dietName];
      }
    });
  };

  return (
    <div className="page-wrapper">
      <TopBar
        title="Twoje Diety i Alergie"
        showBackButton={true}
        onBack={() => navigate("/profil")}
      />

      <main className="page-content">
        <p className="subpage-desc">
          Dostosujemy przepisy do Twoich potrzeb zdrowotnych i preferencji.
        </p>

        <div
          className="hero-banner"
          style={{
            background:
              'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80") center/cover',
          }}
        >
          <h3
            style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          >
            Zdrowe wybory
          </h3>
        </div>

        <div className="options-section-title">Dostępne opcje</div>

        <div className="chips-grid">
          {[
            "Bez laktozy",
            "Bez glutenu",
            "Wegetariańska",
            "Wegańska",
            "Keto",
            "Niskie IG",
          ].map((diet) => (
            <div
              key={diet}
              className={`chip ${activeDiets.includes(diet) ? "active" : ""}`}
              onClick={() => toggleDiet(diet)}
            >
              {diet}
            </div>
          ))}
        </div>

        <Button
          variant="cta"
          className="full-width-btn"
          onClick={() => navigate("/profil")}
          style={{
            backgroundColor: "#f59e0b",
            color: "#ffffff",
            border: "none",
            boxShadow: "0 4px 12px rgba(245, 158, 11, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "20px",
          }}
        >
          <Icon name="file" size={18} fill="currentColor" /> Zapisz preferencje
        </Button>
        <div className="bottom-info-text">
          Możesz zmienić te ustawienia w dowolnym momencie w sekcji Profil.
        </div>
      </main>
      <BottomNav currentTab="profil" />
    </div>
  );
};

export default ProfileAllergiesPage;
