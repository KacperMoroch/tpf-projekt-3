import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Icon from "../../components/Icon";
import TopBar from "../../components/TopBar";
import "./ProfilePage.css";

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarPreview(imageUrl);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="page-wrapper">
      <TopBar
        title="Zmień dane"
        showBackButton={true}
        onBack={() => navigate("/profil")}
      />

      <main className="page-content">
        <p className="subpage-desc">
          Zaktualizuj swoje dane profilowe, aby utrzymać konto w aktualności.
        </p>

        <div
          className="edit-avatar-box"
          onClick={handleAvatarClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
            padding: "12px",
            backgroundColor: "#fdfaf6",
            border: "1px solid #eaddd7",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#8bb174",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: "bold",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              "JK"
            )}

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "20px",
                backgroundColor: "rgba(78, 68, 60, 0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                color: "#fffdfa",
              }}
            >
              ✎
            </div>
          </div>

          <div
            className="edit-avatar-text"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <strong style={{ color: "#4e443c", fontSize: "16px" }}>
              Zdjęcie profilowe
            </strong>
            <span
              style={{ color: "#8a7f75", fontSize: "13px", marginTop: "2px" }}
            >
              Kliknij, aby wgrać nowe zdjęcie
            </span>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
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
            onClick={() => navigate("/profil")}
          >
            Zapisz zmiany
          </Button>
        </form>
      </main>
    </div>
  );
};

export default ProfileEditPage;
