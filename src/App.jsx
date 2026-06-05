import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Hotjar from "@hotjar/browser";
import ReactGA from "react-ga4";
import AnalyticsListener from "./components/AnalyticsListener";

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
import SkanujKod from "./pages/SkanujKod";
import DodajRecznie from "./pages/DodajRecznie";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-QSKFENW2HJ");

    const siteId = 861236;
    const hotjarVersion = 6;
    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return (
    <AuthProvider>
      <div className="app-gallery">
        <div className="mobile-mockup">
          <BrowserRouter>
            <AnalyticsListener />
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
              <Route
                path="/skanuj-kod"
                element={
                  <PrivateRoute>
                    <SkanujKod onClose={() => window.history.back()} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dodaj-recznie"
                element={
                  <PrivateRoute>
                    <DodajRecznie onClose={() => window.history.back()} />
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
