import React from "react";
import Icon from "./Icon";
import "./BottomNav.css";

const BottomNav = ({ currentTab }) => {
  return (
    <nav className="bottom-nav">
      <div className={`nav-item ${currentTab === "lodowka" ? "active" : ""}`}>
        <Icon name="fridge" size={22} style={{ marginBottom: '4px' }} />
        <span>Lodówka</span>
      </div>
      
      <div className={`nav-item ${currentTab === "przepisy" ? "active" : ""}`}>
        <Icon name="recipes" size={22} style={{ marginBottom: '4px' }} />
        <span>Przepisy</span>
      </div>
      
      <div className={`nav-item ${currentTab === "ulubione" ? "active" : ""}`}>
        <Icon name="favorites" size={22} style={{ marginBottom: '4px' }} />
        <span>Ulubione</span>
      </div>
      
      <div className={`nav-item ${currentTab === "zakupy" ? "active" : ""}`}>
        <Icon name="cart" size={22} style={{ marginBottom: '4px' }} />
        <span>Lista Zakupów</span>
      </div>
    </nav>
  );
};

export default BottomNav;