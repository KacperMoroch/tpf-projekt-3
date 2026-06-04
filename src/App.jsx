import React from 'react';
import SzczegolyPrzepisu from './pages/SzczegolyPrzepisu'; 
import PrzepisyPage from './pages/PrzepisyPage'; 
import UlubionePage from './pages/UlubionePage'; 
import ProfilePage from './pages/ProfilePage'; 
import './App.css'; 

function App() {
  return (
    <div className="app-gallery">
      
      {/* Szczegóły Przepisu */}
      <div className="mobile-mockup">
        <SzczegolyPrzepisu /> 
      </div>

      {/* Główna lista Przepisów */}
      <div className="mobile-mockup">
        <PrzepisyPage /> 
      </div>

      {/* Ulubione */}
      <div className="mobile-mockup">
        <UlubionePage /> 
      </div>

      {/* Profil */}
      <div className="mobile-mockup">
        <ProfilePage /> 
      </div>

    </div>
  );
}

export default App;