import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";
import Icon from "./Icon";

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <header className="top-bar">
      <div className="top-bar-logo" onClick={() => navigate("/lodowka")}>
        Fridge2Table
      </div>

      <button
        className="top-bar-profile"
        onClick={() => navigate("/profil")}
        aria-label="Profil użytkownika"
      >
        <Icon name="profile" size={24} />
      </button>
    </header>
  );
}
