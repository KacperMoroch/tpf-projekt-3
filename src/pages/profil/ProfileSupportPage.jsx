import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import TopBar from "../../components/TopBar";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import "./ProfilePage.css";
import BottomNav from "../../components/BottomNav";

const ProfileSupportPage = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const [language, setLanguage] = useState("Polski");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Wylogowano pomyślnie");
      navigate("/");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case "faq":
        return (
          <p>
            Tutaj znajdą się najczęściej zadawane pytania, np. jak dodać własny
            przepis lub usunąć konto.
          </p>
        );
      case "regulamin":
        return (
          <p>
            Pełna treść regulaminu aplikacji. Korzystając z naszego rozwiązania,
            zgadzasz się na określone warunki świadczenia usług...
          </p>
        );
      case "polityka":
        return (
          <p>
            Twoje dane są u nas bezpieczne. W tej sekcji opisujemy, w jaki
            sposób przechowujemy i przetwarzamy Twoje informacje...
          </p>
        );
      case "language":
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button
              onClick={() => {
                setLanguage("Polski");
                setActiveModal(null);
              }}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: `1px solid ${language === "Polski" ? "#8bb174" : "#eaddd7"}`,
                backgroundColor: language === "Polski" ? "#fdfaf6" : "#fffdfa",
                color: "#4e443c",
                cursor: "pointer",
                fontWeight: language === "Polski" ? "bold" : "normal",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
            >
              🇵🇱 Polski
            </button>
            <button
              onClick={() => {
                setLanguage("English");
                setActiveModal(null);
              }}
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: `1px solid ${language === "English" ? "#8bb174" : "#eaddd7"}`,
                backgroundColor: language === "English" ? "#fdfaf6" : "#fffdfa",
                color: "#4e443c",
                cursor: "pointer",
                fontWeight: language === "English" ? "bold" : "normal",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
            >
              🇬🇧 English
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderModalTitle = () => {
    switch (activeModal) {
      case "faq":
        return "FAQ";
      case "regulamin":
        return "Regulamin";
      case "polityka":
        return "Polityka prywatności";
      case "language":
        return "Wybierz język";
      default:
        return "";
    }
  };

  return (
    <div className="page-wrapper">
      <TopBar
        title="Ustawienia i Pomoc"
        showBackButton={true}
        onBack={() => navigate("/profil")}
      />

      <main className="page-content">
        <p className="subpage-desc">Dostosuj aplikację do swoich potrzeb</p>

        <div className="settings-group">
          <div
            className="settings-item"
            onClick={() => setActiveModal("faq")}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-icon">
              <Icon name="help" size={20} />
            </span>
            <div className="settings-item-title">FAQ</div>
            <div className="settings-item-action">›</div>
          </div>

          <div
            className="settings-item"
            onClick={() => setActiveModal("regulamin")}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-icon">
              <Icon name="file" size={20} />
            </span>
            <div className="settings-item-title">Regulamin</div>
            <div className="settings-item-action">›</div>
          </div>

          <div
            className="settings-item"
            onClick={() => setActiveModal("polityka")}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-icon">
              <Icon name="shield" size={20} />
            </span>
            <div className="settings-item-title">Polityka prywatności</div>
            <div className="settings-item-action">›</div>
          </div>
        </div>

        <div className="settings-group">
          <div
            className="settings-item"
            onClick={() => setActiveModal("language")}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-icon">
              <Icon name="globe" size={20} />
            </span>
            <div className="settings-item-title">Język</div>
            <div className="settings-item-action green">{language}</div>
          </div>

          <div
            className="settings-item"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <span className="menu-icon" style={{ color: "#e11d48" }}>
              <Icon name="logout" size={20} />
            </span>
            <div className="settings-item-title" style={{ color: "#e11d48" }}>
              Wyloguj się
            </div>
          </div>
        </div>
      </main>

      {activeModal && (
        <div
          className="info-modal-overlay"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="info-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="info-modal-header">
              <h3>{renderModalTitle()}</h3>
              <button
                className="info-modal-close"
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
            </div>
            <div className="info-modal-body">{renderModalContent()}</div>
          </div>
        </div>
      )}
      <BottomNav currentTab="profil" />
    </div>
  );
};

export default ProfileSupportPage;
