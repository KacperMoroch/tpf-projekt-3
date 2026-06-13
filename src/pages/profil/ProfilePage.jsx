import React from "react";
import Icon from "../../components/Icon";
import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const ProfilePage = () => {
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

  return (
    <div className="page-wrapper">
      <TopBar title="Profil" showBackButton={false} />

      <main className="page-content">
        <div className="profile-header">
          <div className="avatar-wrapper">
            <div className="avatar-placeholder">JK</div>
            <div
              className="avatar-edit-badge"
              onClick={() => navigate("/profil/edycja")}
            >
              ✎
            </div>
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
          <div className="menu-item" onClick={() => navigate("/profil/edycja")}>
            <span className="menu-icon">
              <Icon name="profile" size={20} />
            </span>
            <span className="menu-text">Zmień dane</span>
            <span className="menu-chevron">›</span>
          </div>
          <div
            className="menu-item"
            onClick={() => navigate("/profil/alergie")}
          >
            <span className="menu-icon">
              <Icon name="utensils" size={20} />
            </span>
            <span className="menu-text">Ustaw alergie i dietę</span>
            <span className="menu-chevron">›</span>
          </div>
          <div
            className="menu-item"
            onClick={() => navigate("/profil/powiadomienia")}
          >
            <span className="menu-icon">
              <Icon name="bell" size={20} />
            </span>
            <span className="menu-text">Powiadomienia</span>
            <span className="menu-chevron">›</span>
          </div>
          <div
            className="menu-item"
            onClick={() => navigate("/profil/wsparcie")}
          >
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
      </main>

      <BottomNav currentTab="profil" />
    </div>
  );
};

export default ProfilePage;
