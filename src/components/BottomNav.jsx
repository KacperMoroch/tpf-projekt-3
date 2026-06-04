import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import "./BottomNav.css";

const BottomNav = ({ currentTab }) => {
  const navigate = useNavigate();
  return (
    <nav className="bottom-nav">
      <div
        className={`nav-item ${currentTab === "lodowka" ? "active" : ""}`}
        onClick={() => navigate("/lodowka")}
      >
        <Icon name="fridge" size={22} style={{ marginBottom: "4px" }} />
        <span>Lodówka</span>
      </div>

      <div
        className={`nav-item ${currentTab === "przepisy" ? "active" : ""}`}
        onClick={() => navigate("/przepisy")}
      >
        <Icon name="recipes" size={22} style={{ marginBottom: "4px" }} />
        <span>Przepisy</span>
      </div>

      <div
        className={`nav-item ${currentTab === "ulubione" ? "active" : ""}`}
        onClick={() => navigate("/ulubione")}
      >
        <Icon name="favorites" size={22} style={{ marginBottom: "4px" }} />
        <span>Ulubione</span>
      </div>

      <div
        className={`nav-item ${currentTab === "zakupy" ? "active" : ""}`}
        onClick={() => navigate("/zakupy")}
      >
        <Icon name="cart" size={22} style={{ marginBottom: "4px" }} />
        <span>Lista Zakupów</span>
      </div>
    </nav>
  );
};

export default BottomNav;
