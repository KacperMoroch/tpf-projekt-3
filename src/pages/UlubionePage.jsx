import React, { useState, useEffect } from "react";
import FilterModal from "../components/FilterModal";
import Icon from "../components/Icon";
import BottomNav from "../components/BottomNav";
import "./profil/ProfilePage.css";
import "./UlubionePage.css";
import TopBar from "../components/TopBar";

const UlubionePage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const hardcodedRecipes = [
      {
        id: 101,
        category: "Sałatki",
        title: "Sałatka Quinoa z Awokado",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&q=80",
        time: "15 min",
        calories: "320 kcal",
      },
      {
        id: 102,
        category: "Zupy",
        title: "Krem z Pieczonych Pomidorów",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=150&q=80",
        time: "30 min",
        calories: "210 kcal",
      },
      {
        id: 104,
        category: "Lunch",
        title: "Kolorowy Buddha Bowl",
        image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=150&q=80",
        time: "25 min",
        calories: "380 kcal",
      },
    ];

    const saved = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const combined = [...hardcodedRecipes, ...saved];
    const uniqueRecipes = combined.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i);

    setRecipes(uniqueRecipes);
    setLikedRecipes(uniqueRecipes.map(r => r.id));
  }, []);

  const toggleLike = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      setLikedRecipes((prev) => prev.filter((recipeId) => recipeId !== id));

      const saved = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      const newSaved = saved.filter(r => r.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newSaved));

      setRemovingId(null);
    }, 500);
  };

  return (
    <div className="page-wrapper">
      <TopBar title="Ulubione" showBackButton={false} />

      <main className="page-content">
        <div className="favorites-header-row">
          <h2 className="favorites-title">Zapisane przepisy</h2>
          <span className="favorites-count">{recipes.length} pozycji</span>
        </div>

        <div className="search-row">
          <div className="search-input-wrapper">
            <span className="search-icon">
              <Icon name="search" size={18} />
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Szukaj w ulubionych..."
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

        <div className="favorites-list">
          {recipes
            .filter((recipe) =>
              recipe.title.toLowerCase().startsWith(searchQuery.toLowerCase()),
            )
            .map((recipe) => (
              <div
                className={`favorite-card ${removingId === recipe.id ? "is-removing" : ""}`}
                key={recipe.id}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="favorite-image"
                />

                <div className="favorite-content">
                  <div className="favorite-category">{recipe.category}</div>
                  <h4 className="favorite-title">{recipe.title}</h4>
                  <div className="favorite-meta">
                    <span>
                      <Icon name="clock" size={14} /> {recipe.time}
                    </span>
                    <span>
                      <Icon name="flame" size={14} /> {recipe.calories}
                    </span>
                  </div>
                </div>

                <button
                  className="favorite-action-btn"
                  onClick={() => toggleLike(recipe.id)}
                >
                  <Icon
                    name="favorites"
                    size={24}
                    fill={
                      removingId === recipe.id
                        ? "none"
                        : likedRecipes.includes(recipe.id)
                          ? "var(--primary)"
                          : "none"
                    }
                    color={
                      removingId === recipe.id
                        ? "var(--outline)"
                        : likedRecipes.includes(recipe.id)
                          ? "var(--primary)"
                          : "var(--outline)"
                    }
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