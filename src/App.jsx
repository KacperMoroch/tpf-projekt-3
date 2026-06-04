import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./auth/AuthContext";
import { PrivateRoute } from "./auth/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import MojaLodowka from "./pages/MojaLodowka";

import SzczegolyPrzepisu from "./pages/SzczegolyPrzepisu";
import PrzepisyPage from "./pages/PrzepisyPage";
import UlubionePage from "./pages/UlubionePage";
import ProfilePage from "./pages/ProfilePage";
import ListaZakupow from "./pages/ListaZakupow";
import SkanujParagon from "./pages/SkanujParagon";

function App() {
  return (
    <AuthProvider>
      <div className="app-gallery">
        <div className="mobile-mockup">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/logowanie" element={<LoginPage />} />
              <Route path="/rejestracja" element={<RegisterPage />} />
              <Route path="/zapomnialem-hasla" element={<ForgotPassword />} />
              <Route
                path="/lodowka"
                element={
                  <PrivateRoute>
                    <MojaLodowka />
                  </PrivateRoute>
                }
              />

              <Route
                path="/przepisy"
                element={
                  <PrivateRoute>
                    <PrzepisyPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/przepis/:id"
                element={
                  <PrivateRoute>
                    <SzczegolyPrzepisu />
                  </PrivateRoute>
                }
              />
              <Route
                path="/ulubione"
                element={
                  <PrivateRoute>
                    <UlubionePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profil"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/zakupy"
                element={
                  <PrivateRoute>
                    <ListaZakupow />
                  </PrivateRoute>
                }
              />
              <Route
                path="/skanuj-paragon"
                element={
                  <PrivateRoute>
                    <SkanujParagon onClose={() => window.history.back()} />
                  </PrivateRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
