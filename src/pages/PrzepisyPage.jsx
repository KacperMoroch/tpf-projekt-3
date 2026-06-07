import React, { useState } from "react";
import FilterModal from "../components/FilterModal";
import Button from "../components/Button";
import Icon from "../components/Icon"; 
import BottomNav from "../components/BottomNav"; 
import "./PrzepisyPage.css"; 

const PrzepisyPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const [likedRecipes, setLikedRecipes] = useState([2]); 

  const toggleLike = (id) => {
    if (likedRecipes.includes(id)) {
      setLikedRecipes(likedRecipes.filter(recipeId => recipeId !== id));
    } else {
      setLikedRecipes([...likedRecipes, id]);
    }
  };

  const recipesData = [
    {
      id: 1,
      title: "Letnia Sałatka Buddy z Hummusem",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
      matchText: "Masz 90% składników!",
      matchLevel: "high",
      time: "15 min",
      difficulty: "Łatwe",
      calories: "420 kcal"
    },
    {
      id: 2,
      title: "Klasyczna Margherita na Cienkim Cieście",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
      matchText: "Masz 75% składników",
      matchLevel: "medium",
      time: "45 min",
      difficulty: "Średnie",
      calories: "550 kcal"
    },
    {
      id: 3,
      title: "Łosoś Pieczony z Szparagami",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80",
      matchText: "Masz wszystkie składniki!",
      matchLevel: "high",
      time: "25 min",
      difficulty: "Łatwe",
      calories: "380 kcal"
    }
  ];

  return (
    <div className="przepisy-page-wrapper">
      
      <header className="przepisy-topbar">
        <span style={{fontSize: '24px', cursor: 'pointer', lineHeight: '1'}}>≡</span>
        <span>Fridge2Table</span>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="profile" size={24} />
        </div>
      </header>

      <main className="przepisy-content">
        
        <div className="search-row">
          <div className="search-input-wrapper">
            <span className="search-icon"><Icon name="search" size={18} /></span>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Szukaj składników lub dań..." 
            />
          </div>
          <button 
            className="filter-action-btn"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Icon name="filter" size={20} />
          </button>
        </div>

        <div className="generate-btn-wrapper">
          <Button variant="cta" className="full-width-btn">
            <Icon name="sparkles" size={18} fill="currentColor" /> Generuj przepisy z lodówki
          </Button>
        </div>

        <h3 className="section-heading">Polecane dla Ciebie</h3>
        
        <div className="recipes-grid">
          {recipesData.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <div className="recipe-image-container">
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <div className={`match-badge ${recipe.matchLevel}`}>
                  <span style={{marginRight: '4px', display: 'flex'}}>
                    {recipe.matchLevel === 'high' 
                        ? <Icon name="checkCircle" size={14} /> 
                        : <Icon name="triangleAlert" size={14} />
                    }
                  </span> 
                  {recipe.matchText}
                </div>
              </div>
              
              <div className="recipe-content">
                <div className="recipe-title-row">
                  <h4 className="recipe-title">{recipe.title}</h4>
                  <button 
                    className={`heart-btn ${likedRecipes.includes(recipe.id) ? 'liked' : ''}`}
                    onClick={() => toggleLike(recipe.id)}
                  >
                    <Icon 
                      name="favorites" 
                      size={22} 
                      fill={likedRecipes.includes(recipe.id) ? "currentColor" : "none"} 
                    />
                  </button>
                </div>
                
                <div className="recipe-meta">
                  <div className="meta-item"><Icon name="timer" size={14} style={{marginRight: '4px'}}/> {recipe.time}</div>
                  <div className="meta-item"><Icon name="utensils" size={14} style={{marginRight: '4px'}}/> {recipe.difficulty}</div>
                  <div className="meta-item"><Icon name="flame" size={14} style={{marginRight: '4px'}}/> {recipe.calories}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <BottomNav currentTab="przepisy" />
      
      {isFilterModalOpen && (
        <FilterModal 
          isOpen={isFilterModalOpen} 
          onClose={() => setIsFilterModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default PrzepisyPage;