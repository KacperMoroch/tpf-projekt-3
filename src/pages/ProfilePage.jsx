import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Icon from "../components/Icon";
import BottomNav from "../components/BottomNav";
import "./ProfilePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Wylogowano pomyślnie");
      navigate("/");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  const [currentView, setCurrentView] = useState(
    location.state?.openView || "main",
  );
  const [activeDiets, setActiveDiets] = useState(["Bez glutenu", "Wegańska"]);
  const [notifications, setNotifications] = useState({
    mainAlerts: true,
    expiry: true,
    newRecipes: false,
    shopping: true,
    zeroWaste: true,
  });

  const toggleDiet = (dietName) => {
    setActiveDiets((prevDiets) => {
      if (prevDiets.includes(dietName)) {
        return prevDiets.filter((d) => d !== dietName);
      } else {
        return [...prevDiets, dietName];
      }
    });
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Ekran główny profilu
  const renderMainView = () => (
    <>
      <div className="profile-header">
        <div className="avatar-wrapper">
          <div className="avatar-placeholder">JK</div>
          <div className="avatar-edit-badge">✎</div>
        </div>
        <h2>Jakub Kowalski</h2>
        <p className="email-text">jakub.kowalski@email.com</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Produkty</span>
          <span className="stat-value">42</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Odkryte przepisy</span>
          <span className="stat-value">28</span>
        </div>
      </div>

      <div className="menu-list">
        <div className="menu-item" onClick={() => setCurrentView("edit")}>
          <span className="menu-icon">
            <Icon name="profile" size={20} />
          </span>
          <span className="menu-text">Zmień dane</span>
          <span className="menu-chevron">›</span>
        </div>
        <div className="menu-item" onClick={() => setCurrentView("allergies")}>
          <span className="menu-icon">
            <Icon name="utensils" size={20} />
          </span>
          <span className="menu-text">Ustaw alergie i dietę</span>
          <span className="menu-chevron">›</span>
        </div>
        <div
          className="menu-item"
          onClick={() => setCurrentView("notifications")}
        >
          <span className="menu-icon">
            <Icon name="bell" size={20} />
          </span>
          <span className="menu-text">Powiadomienia</span>
          <span className="menu-chevron">›</span>
        </div>
        <div className="menu-item" onClick={() => setCurrentView("support")}>
          <span className="menu-icon">
            <Icon name="help" size={20} />
          </span>
          <span className="menu-text">Pomoc i wsparcie</span>
          <span className="menu-chevron">›</span>
        </div>
      </div>

      <button className="btn-logout" onClick={handleLogout}>
        <Icon name="logout" size={18} /> Wyloguj
      </button>
    </>
  );

  // Ekran zmień dane
  const renderEditView = () => (
    <>
      <div className="subpage-header">
        <button className="back-btn" onClick={() => setCurrentView("main")}>
          <Icon name="arrowLeft" size={24} />
        </button>
        <h2>Zmień dane</h2>
      </div>
      <p className="subpage-desc">
        Zaktualizuj swoje dane profilowe, aby utrzymać konto w aktualności.
      </p>

      <div className="edit-avatar-box">
        <div className="avatar-placeholder small">JK</div>
        <div className="edit-avatar-text">
          <strong>Zdjęcie profilowe</strong>
          <span>Kliknij ikonę, aby zmienić zdjęcie</span>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <Input label="Imię i Nazwisko" placeholder="Jakub Kowalski" />
        <Input
          label="Adres Email"
          type="email"
          placeholder="jakub.kowalski@email.com"
        />
        <Input label="Hasło" type="password" placeholder="********" />

        <div className="info-box">
          <span>ⓘ</span> Zalecamy używanie silnego hasła składającego się z co
          najmniej 8 znaków, w tym cyfr i znaków specjalnych.
        </div>

        <Button
          variant="cta"
          className="full-width-btn"
          onClick={() => setCurrentView("main")}
        >
          Zapisz zmiany
        </Button>
      </form>
    </>
  );

  // Ekran ustawienia i pomoc
  const renderSupportView = () => (
    <>
      <div className="subpage-header">
        <button className="back-btn" onClick={() => setCurrentView("main")}>
          <Icon name="arrowLeft" size={24} />
        </button>
        <h2>Ustawienia i Pomoc</h2>
      </div>
      <p className="subpage-desc">Dostosuj aplikację do swoich potrzeb</p>

      <div className="settings-group">
        <div className="settings-item">
          <span className="menu-icon">
            <Icon name="bell" size={20} />
          </span>
          <div className="settings-item-content">
            <div className="settings-item-title">Powiadomienia</div>
            <div className="settings-item-desc">
              Przypomnienia o terminach ważności
            </div>
          </div>
          <div
            className={`toggle-switch ${!notifications.mainAlerts ? "inactive" : ""}`}
            onClick={() => toggleNotification("mainAlerts")}
          ></div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-item">
          <span className="menu-icon">
            <Icon name="help" size={20} />
          </span>
          <div className="settings-item-title">FAQ</div>
          <div className="settings-item-action">›</div>
        </div>
        <div className="settings-item">
          <span className="menu-icon">
            <Icon name="file" size={20} />
          </span>
          <div className="settings-item-title">Regulamin</div>
          <div className="settings-item-action">›</div>
        </div>
        <div className="settings-item">
          <span className="menu-icon">
            <Icon name="shield" size={20} />
          </span>
          <div className="settings-item-title">Polityka prywatności</div>
          <div className="settings-item-action">›</div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-item">
          <span className="menu-icon">
            <Icon name="globe" size={20} />
          </span>
          <div className="settings-item-title">Język</div>
          <div className="settings-item-action green">Polski</div>
        </div>
        <div className="settings-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
          <span className="menu-icon" style={{ color: "#e11d48" }}>
            <Icon name="logout" size={20} />
          </span>
          <div className="settings-item-title" style={{ color: "#e11d48" }}>
            Wyloguj się
          </div>
        </div>
      </div>

      <div className="eco-banner">
        <h3>Dbaj o Planetę</h3>
        <p>Dzięki Tobie uratowaliśmy już 12kg żywności w tym miesiącu!</p>
      </div>
    </>
  );

  // Ekran alergie i dieta
  const renderAllergiesView = () => (
    <>
      <div className="subpage-header">
        <button className="back-btn" onClick={() => setCurrentView("main")}>
          <Icon name="arrowLeft" size={24} />
        </button>
        <h2>Twoje Diety i Alergie</h2>
      </div>
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
        <h3 style={{ color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
          Zdrowe wybory
        </h3>
      </div>

      <div className="options-section-title">Dostępne opcje</div>

      <div className="chips-grid">
        <div
          className={`chip ${activeDiets.includes("Bez laktozy") ? "active" : ""}`}
          onClick={() => toggleDiet("Bez laktozy")}
        >
          Bez laktozy
        </div>
        <div
          className={`chip ${activeDiets.includes("Bez glutenu") ? "active" : ""}`}
          onClick={() => toggleDiet("Bez glutenu")}
        >
          Bez glutenu
        </div>
        <div
          className={`chip ${activeDiets.includes("Wegetariańska") ? "active" : ""}`}
          onClick={() => toggleDiet("Wegetariańska")}
        >
          Wegetariańska
        </div>
        <div
          className={`chip ${activeDiets.includes("Wegańska") ? "active" : ""}`}
          onClick={() => toggleDiet("Wegańska")}
        >
          Wegańska
        </div>
        <div
          className={`chip ${activeDiets.includes("Keto") ? "active" : ""}`}
          onClick={() => toggleDiet("Keto")}
        >
          Keto
        </div>
        <div
          className={`chip ${activeDiets.includes("Niskie IG") ? "active" : ""}`}
          onClick={() => toggleDiet("Niskie IG")}
        >
          Niskie IG
        </div>
      </div>

      <Button
        variant="cta"
        className="full-width-btn"
        onClick={() => setCurrentView("main")}
        style={{
          backgroundColor: "#f59e0b",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 4px 12px rgba(245, 158, 11, 0.2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Icon name="file" size={18} fill="currentColor" /> Zapisz preferencje
      </Button>
      <div className="bottom-info-text">
        Możesz zmienić te ustawienia w dowolnym momencie w sekcji Profil.
      </div>
    </>
  );

  // Ekran powiadomienia
  const renderNotificationsView = () => (
    <>
      <div className="subpage-header">
        <button className="back-btn" onClick={() => setCurrentView("main")}>
          <Icon name="arrowLeft" size={24} />
        </button>
        <h2>Powiadomienia</h2>
      </div>
      <p className="subpage-desc">Zarządzaj swoją kuchnią efektywnie</p>

      <div
        className="hero-banner"
        style={{
          background:
            'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80") center/cover',
        }}
      >
        <h3>Powiadomienia</h3>
      </div>

      <div className="settings-group">
        <div className="settings-item">
          <span className="menu-icon" style={{ color: "#4ade80" }}>
            <Icon name="calendar" size={20} />
          </span>
          <div className="settings-item-content">
            <div className="settings-item-title">Terminy ważności</div>
            <div className="settings-item-desc">
              Przypomnienia o kończącej się dacie spożycia
            </div>
          </div>
          <div
            className={`toggle-switch ${!notifications.expiry ? "inactive" : ""}`}
            onClick={() => toggleNotification("expiry")}
          ></div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-item">
          <span className="menu-icon" style={{ color: "#fbbf24" }}>
            <Icon name="utensils" size={20} />
          </span>
          <div className="settings-item-content">
            <div className="settings-item-title">Nowe przepisy</div>
            <div className="settings-item-desc">
              Inspiracje dopasowane do Twojej lodówki
            </div>
          </div>
          <div
            className={`toggle-switch ${!notifications.newRecipes ? "inactive" : ""}`}
            onClick={() => toggleNotification("newRecipes")}
          ></div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-item">
          <span className="menu-icon" style={{ color: "#4ade80" }}>
            <Icon name="cart" size={20} />
          </span>
          <div className="settings-item-content">
            <div className="settings-item-title">Przypomnienia o zakupach</div>
            <div className="settings-item-desc">
              Alerty o brakujących składnikach
            </div>
          </div>
          <div
            className={`toggle-switch ${!notifications.shopping ? "inactive" : ""}`}
            onClick={() => toggleNotification("shopping")}
          ></div>
        </div>
      </div>

      <div className="settings-group">
        <div className="settings-item">
          <span className="menu-icon" style={{ color: "#f43f5e" }}>
            <Icon name="leaf" size={20} />
          </span>
          <div className="settings-item-content">
            <div className="settings-item-title">Alerty zero-waste</div>
            <div className="settings-item-desc">
              Sugestie jak wykorzystać nadmiar produktów
            </div>
          </div>
          <div
            className={`toggle-switch ${!notifications.zeroWaste ? "inactive" : ""}`}
            onClick={() => toggleNotification("zeroWaste")}
          ></div>
        </div>
      </div>

      <Button
        variant="cta"
        className="full-width-btn"
        onClick={() => setCurrentView("main")}
      >
        Zatwierdź
      </Button>
      <div className="bottom-info-text">
        Ustawienia zostaną zapisane w chmurze
      </div>
    </>
  );

  // Główny render pliku
  return (
    <div className="page-wrapper">
      <header className="mock-topbar">
        <div style={{ fontSize: "24px", cursor: "pointer", lineHeight: "1" }}>
          ≡
        </div>
        <div>Fridge2Table</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            name="profile"
            size={24}
            fill="var(--primary)"
            color="var(--primary)"
          />
        </div>
      </header>

      <main className="page-content">
        {currentView === "main" && renderMainView()}
        {currentView === "edit" && renderEditView()}
        {currentView === "support" && renderSupportView()}
        {currentView === "allergies" && renderAllergiesView()}
        {currentView === "notifications" && renderNotificationsView()}
      </main>

      <BottomNav currentTab="profil" />
    </div>
  );
};

export default ProfilePage;
