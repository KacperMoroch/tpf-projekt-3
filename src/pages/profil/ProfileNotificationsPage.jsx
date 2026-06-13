import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import TopBar from "../../components/TopBar";
import "./ProfilePage.css";
import BottomNav from "../../components/BottomNav";

const ProfileNotificationsPage = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState({
    expiry: true,
    newRecipes: false,
    shopping: true,
    zeroWaste: true,
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="page-wrapper">
      <TopBar
        title="Powiadomienia"
        showBackButton={true}
        onBack={() => navigate("/profil")}
      />

      <main className="page-content">
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
              <div className="settings-item-title">
                Przypomnienia o zakupach
              </div>
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
          onClick={() => navigate("/profil")}
        >
          Zatwierdź
        </Button>
        <div className="bottom-info-text">
          Ustawienia zostaną zapisane w chmurze
        </div>
      </main>
      <BottomNav currentTab="profil" />
    </div>
  );
};

export default ProfileNotificationsPage;
