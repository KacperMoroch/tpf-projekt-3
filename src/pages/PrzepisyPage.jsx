import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "../components/FilterModal";
import Button from "../components/Button";
import Icon from "../components/Icon";
import BottomNav from "../components/BottomNav";
import "./PrzepisyPage.css";
import TopBar from "../components/TopBar";

const PrzepisyPage = () => {
  const navigate = useNavigate();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const initialRecipesData = [
    {
      id: 2,
      category: "Pizza",
      title: "Klasyczna Margherita na Cienkim Cieście",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
      matchText: "Masz 75% składników",
      matchLevel: "medium",
      time: "45 min",
      difficulty: "Średnie",
      calories: "550 kcal",
    },
    {
      id: 1,
      category: "Dania główne",
      title: "Pieczony Łosoś z Cytrusami",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80",
      matchText: "Masz wszystkie składniki!",
      matchLevel: "high",
      time: "25 min",
      difficulty: "Łatwe",
      calories: "450 kcal",
    },
    {
      id: 3,
      category: "Sałatki",
      title: "Letnia Sałatka Buddy z Hummusem",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
      matchText: "Masz 90% składników!",
      matchLevel: "high",
      time: "15 min",
      difficulty: "Łatwe",
      calories: "420 kcal",
    },
  ];

  const [recipesList, setRecipesList] = useState(initialRecipesData);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setLikedRecipes(saved.map(r => r.id));
  }, []);

  const toggleLike = (recipe) => {
    const saved = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isAlreadyLiked = saved.some(r => r.id === recipe.id);

    if (isAlreadyLiked) {
      const newSaved = saved.filter(r => r.id !== recipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newSaved));
      setLikedRecipes(newSaved.map(r => r.id));
    } else {
      const favoriteRecipe = {
        id: recipe.id,
        category: recipe.category,
        title: recipe.title,
        image: recipe.image,
        time: recipe.time,
        calories: recipe.calories
      };
      const newSaved = [...saved, favoriteRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newSaved));
      setLikedRecipes(newSaved.map(r => r.id));
    }
  };

  const handleGenerateFromFridge = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
      const sortedRecipes = [...recipesList].sort((a, b) => {
        if (a.matchLevel === "high" && b.matchLevel !== "high") return -1;
        if (a.matchLevel !== "high" && b.matchLevel === "high") return 1;
        return 0;
      });
      setRecipesList(sortedRecipes);
    }, 1500);
  };

  const filteredRecipes = recipesList.filter((recipe) =>
    recipe.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
  );

  return (
    <div className="przepisy-page-wrapper">
      <TopBar title="Przepisy" showBackButton={false} />

      <main className="przepisy-content">
        <div className="search-row">
          <div className="search-input-wrapper">
            <span className="search-icon">
              <Icon name="search" size={18} />
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Szukaj składników lub dań..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <Button 
            variant="cta" 
            className="full-width-btn"
            onClick={handleGenerateFromFridge}
            style={{ opacity: isGenerating ? 0.8 : 1 }}
          >
            <Icon name="sparkles" size={18} fill="currentColor" /> 
            {isGenerating ? "Analizowanie lodówki..." : (isGenerated ? "Dopasowano przepisy!" : "Generuj przepisy z lodówki")}
          </Button>
        </div>

        <h3 className="section-heading">Polecane dla Ciebie</h3>

        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <div 
              className="recipe-card" 
              key={recipe.id}
              onClick={() => navigate(`/przepis/${recipe.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="recipe-image-container">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-image"
                />
                <div className={`match-badge ${recipe.matchLevel}`}>
                  <span style={{ marginRight: "4px", display: "flex" }}>
                    {recipe.matchLevel === "high" ? (
                      <Icon name="checkCircle" size={14} />
                    ) : (
                      <Icon name="triangleAlert" size={14} />
                    )}
                  </span>
                  {recipe.matchText}
                </div>
              </div>

              <div className="recipe-content">
                <div className="recipe-title-row">
                  <h4 className="recipe-title">{recipe.title}</h4>
                  <button
                    className={`heart-btn ${likedRecipes.includes(recipe.id) ? "liked" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(recipe);
                    }}
                  >
                    <Icon
                      name="favorites"
                      size={22}
                      fill={
                        likedRecipes.includes(recipe.id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                </div>

                <div className="recipe-meta">
                  <div className="meta-item">
                    <Icon
                      name="timer"
                      size={14}
                      style={{ marginRight: "4px" }}
                    />{" "}
                    {recipe.time}
                  </div>
                  <div className="meta-item">
                    <Icon
                      name="utensils"
                      size={14}
                      style={{ marginRight: "4px" }}
                    />{" "}
                    {recipe.difficulty}
                  </div>
                  <div className="meta-item">
                    <Icon
                      name="flame"
                      size={14}
                      style={{ marginRight: "4px" }}
                    />{" "}
                    {recipe.calories}
                  </div>
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