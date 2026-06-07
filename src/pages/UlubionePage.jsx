import React, { useState } from "react";
import FilterModal from "../components/FilterModal";
import Icon from "../components/Icon";
import BottomNav from "../components/BottomNav";
import "./ProfilePage.css"; 
import "./UlubionePage.css"; 

const UlubionePage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const favoritesData = [
    {
      id: 1,
      category: "Sałatki",
      title: "Sałatka Quinoa z Awokado",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&q=80",
      time: "15 min",
      calories: "320 kcal"
    },
    {
      id: 2,
      category: "Zupy",
      title: "Krem z Pieczonych Pomidorów",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=150&q=80",
      time: "30 min",
      calories: "210 kcal"
    },
    {
      id: 3,
      category: "Dania główne",
      title: "Łosoś z Szparagami",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=150&q=80",
      time: "20 min",
      calories: "450 kcal"
    },
    {
      id: 4,
      category: "Lunch",
      title: "Kolorowy Buddha Bowl",
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=150&q=80",
      time: "25 min",
      calories: "380 kcal"
    }
  ];

  const [likedRecipes, setLikedRecipes] = useState([1, 2, 3, 4]);

  const toggleLike = (id) => {
    if (likedRecipes.includes(id)) {
      setLikedRecipes(likedRecipes.filter(recipeId => recipeId !== id));
    } else {
      setLikedRecipes([...likedRecipes, id]);
    }
  };

  return (
    <div className="page-wrapper">
      <header className="mock-topbar">
        <span>≡</span>
        <span>Fridge2Table</span>
        <span><Icon name="profile" size={20} /></span>
      </header>

      <main className="page-content">
        
        <div className="favorites-header-row">
          <h2 className="favorites-title">Zapisane przepisy</h2>
          <span className="favorites-count">{favoritesData.length} pozycji</span>
        </div>

        <div className="search-row">
          <div className="search-input-wrapper">
            <span className="search-icon"><Icon name="search" size={18} /></span>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Szukaj w ulubionych..." 
            />
          </div>
          <button 
            className="filter-action-btn"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Icon name="filter" size={20} />
          </button>
        </div>

        <div className="favorites-list">
          {favoritesData.map((recipe) => (
            <div className="favorite-card" key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} className="favorite-image" />
              
              <div className="favorite-content">
                <div className="favorite-category">{recipe.category}</div>
                <h4 className="favorite-title">{recipe.title}</h4>
                <div className="favorite-meta">
                  <span><Icon name="clock" size={14} /> {recipe.time}</span>
                  <span><Icon name="flame" size={14} /> {recipe.calories}</span>
                </div>
              </div>

              <button 
                className="favorite-action-btn"
                onClick={() => toggleLike(recipe.id)}
              >
                <Icon 
                  name="favorites" 
                  size={24} 
                  fill={likedRecipes.includes(recipe.id) ? "var(--primary)" : "none"} 
                  color={likedRecipes.includes(recipe.id) ? "var(--primary)" : "var(--outline)"} 
                />
              </button>
            </div>
          ))}
        </div>

      </main>

      <BottomNav currentTab="ulubione" />

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
      />
    </div>
  );
};

export default UlubionePage;