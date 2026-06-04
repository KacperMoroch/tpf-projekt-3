import React, { useState } from "react";
import Icon from "../components/Icon";
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";
import "./SzczegolyPrzepisu.css"; 

const SzczegolyPrzepisu = () => {
  const [activeTab, setActiveTab] = useState("instrukcje"); 
  const [isCookingMode, setIsCookingMode] = useState(false); 
  const [checkedIngredients, setCheckedIngredients] = useState([1, 2, 4]); 
  
  const [isLiked, setIsLiked] = useState(true);
  const [userRating, setUserRating] = useState(0);
  
  const toggleIngredient = (id) => {
    if (checkedIngredients.includes(id)) {
      setCheckedIngredients(checkedIngredients.filter(i => i !== id));
    } else {
      setCheckedIngredients([...checkedIngredients, id]);
    }
  };

  // Tryb gotowania
  if (isCookingMode) {
    return (
      <div className="cooking-mode-screen">
        <div className="cooking-topbar">
          <button className="icon-btn-round" onClick={() => setIsCookingMode(false)} style={{boxShadow: 'none', border: '1px solid #e2e8f0'}}>
            <Icon name="close" size={20} />
          </button>
          <div className="status-pill">
            <Icon name="eye" size={14} /> EKRAN WŁĄCZONY
          </div>
          <button className="icon-btn-round" style={{boxShadow: 'none', background: 'transparent'}}>
            <Icon name="more" size={20} />
          </button>
        </div>

        <div className="cooking-progress">KROK 2 Z 5</div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>

        <h2 className="cooking-instruction">
          Dodaj dynię, cebulę i czosnek do garnka. Smaż przez 10 minut, aż warzywa lekko zmiękną i zaczną pachnieć.
        </h2>

        <div className="timer-box">
          <div className="timer-time">
            <Icon name="timer" size={32} color="var(--secondary-container)" />
            04:52
          </div>
          <div className="timer-controls">
            <button className="btn-pause">
              <Icon name="pause" size={18} /> Pauza
            </button>
            <button className="btn-reset">
              <Icon name="reset" size={20} />
            </button>
          </div>
        </div>

        <div className="cooking-bottom-nav">
          <button className="btn-prev">← Poprzedni krok</button>
          <button className="btn-next">Następny krok →</button>
        </div>
      </div>
    );
  }

  // Widok główny
  return (
    <div className="recipe-details-wrapper">
      
      {/* Górny pasek */}
      <header className="recipe-topbar-white">
        <button style={{background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: 0}}>
          <Icon name="arrowLeft" size={24} />
        </button>
        <div className="topbar-title">Fridge2Table</div>
        <div style={{width: '32px', height: '32px', border: '1px solid var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)'}}>
          <Icon name="profile" size={16} />
        </div>
      </header>
      
      {/* Zawartość przewijana */}
      <div className="main-content-area">
        
        <div className="scrollable-content">
          <div className="recipe-hero">
            <div className="hero-overlay"></div>
            
            <div className="hero-floating-top">
              <div style={{display: 'flex', gap: '12px'}}>
                <button 
                    className="icon-btn-round" 
                    onClick={() => setIsLiked(!isLiked)}
                    style={{ color: isLiked ? 'var(--primary)' : 'var(--outline)' }}
                    >
                    <Icon name="favorites" fill={isLiked ? "currentColor" : "none"} size={20} />
                    </button>
                <button className="icon-btn-round" style={{color: 'var(--on-background)'}}>
                  <Icon name="share" size={20} />
                </button>
              </div>
              <div style={{background: 'white', color: 'var(--on-background)', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 'bold'}}>
                <Icon name="star" fill="var(--secondary-container)" color="var(--secondary-container)" size={14} /> 4.8 <span style={{color: 'var(--outline)', fontWeight: 'normal'}}>(124)</span>
              </div>
            </div>

            <div className="hero-info">
              <h1 className="hero-title">Pieczony Łosoś z Cytrusami</h1>
              <div className="hero-meta">
                <span>25 min</span> • <span>Średnie</span> • <span>450 kcal</span>
              </div>
            </div>
          </div>

          <div className="recipe-tabs">
            <button 
              className={`tab-btn ${activeTab === "skladniki" ? "active" : ""}`}
              onClick={() => setActiveTab("skladniki")}
            >
              Składniki
            </button>
            <button 
              className={`tab-btn ${activeTab === "instrukcje" ? "active" : ""}`}
              onClick={() => setActiveTab("instrukcje")}
            >
              Instrukcje
            </button>
          </div>

          <div className="tab-content">
            
            {/* Zakładka składniki */}
            {activeTab === "skladniki" && (
              <div>
                <div className="list-item-card" onClick={() => toggleIngredient(1)} style={{alignItems: 'center'}}>
                  <div className="item-icon-box" style={{backgroundColor: '#f0fdf4', color: '#166534'}}><Icon name="fish" size={24} /></div>
                  <div className="item-text">
                    <div className="item-title">Świeży Łosoś</div>
                    <div className="item-desc">2 filety (ok. 400g)</div>
                  </div>
                  <Icon name={checkedIngredients.includes(1) ? "checkCircle" : "circle"} size={24} color={checkedIngredients.includes(1) ? "var(--primary)" : "var(--outline)"} />
                </div>

                <div className="list-item-card" onClick={() => toggleIngredient(2)} style={{alignItems: 'center'}}>
                  <div className="item-icon-box" style={{backgroundColor: '#fef3c7', color: '#b45309'}}><Icon name="lemon" size={24} /></div>
                  <div className="item-text">
                    <div className="item-title">Cytryna i Pomarańcza</div>
                    <div className="item-desc">po 1 sztuce</div>
                  </div>
                  <Icon name={checkedIngredients.includes(2) ? "checkCircle" : "circle"} size={24} color={checkedIngredients.includes(2) ? "var(--primary)" : "var(--outline)"} />
                </div>

                <div className="list-item-card" onClick={() => toggleIngredient(3)} style={{alignItems: 'center'}}>
                  <div className="item-icon-box" style={{color: '#db2777', backgroundColor: '#fce7f3'}}><Icon name="leaf" size={24} /></div>
                  <div className="item-text">
                    <div className="item-title">Świeży Koperek</div>
                    <div className="item-desc">1 pęczek</div>
                  </div>
                  <Icon name={checkedIngredients.includes(3) ? "checkCircle" : "circle"} size={24} color={checkedIngredients.includes(3) ? "var(--primary)" : "var(--outline)"} />
                </div>

                <div className="list-item-card" onClick={() => toggleIngredient(4)} style={{alignItems: 'center'}}>
                  <div className="item-icon-box" style={{backgroundColor: '#f1f5f9', color: '#475569'}}><Icon name="droplet" size={24} /></div>
                  <div className="item-text">
                    <div className="item-title">Oliwa z Oliwek</div>
                    <div className="item-desc">2 łyżki stołowe</div>
                  </div>
                  <Icon name={checkedIngredients.includes(4) ? "checkCircle" : "circle"} size={24} color={checkedIngredients.includes(4) ? "var(--primary)" : "var(--outline)"} />
                </div>

                <div className="rating-section">
                  <div>Oceń ten przepis</div>
                  <div className="stars-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        onClick={() => setUserRating(star)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#b45309' }}
                      >
                        <Icon 
                          name="star" 
                          size={28} 
                          fill={star <= userRating ? "currentColor" : "none"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="comments-header">
                  <Icon name="message" size={20} /> Komentarze
                </div>
                
                <div className="comment-item">
                  <div className="comment-avatar" style={{backgroundColor: '#fed7aa'}}>AK</div>
                  <div className="comment-content">
                    <div className="comment-top">
                      <span className="comment-name">Anna Kowalska</span>
                      <span className="comment-time">2 dni temu</span>
                    </div>
                    <div className="comment-text">Przepis rewelacyjny! Łosoś wyszedł niesamowicie soczysty dzięki tym cytrusom. Na pewno powtórzę.</div>
                  </div>
                </div>

                <div className="comment-item">
                  <div className="comment-avatar" style={{backgroundColor: '#bbf7d0'}}>MW</div>
                  <div className="comment-content">
                    <div className="comment-top">
                      <span className="comment-name">Marek Wiśniewski</span>
                      <span className="comment-time">Wczoraj</span>
                    </div>
                    <div className="comment-text">Dodałem jeszcze odrobinę miodu do marynaty i wyszło perfekcyjnie. Polecam!</div>
                  </div>
                </div>

                <div className="comment-input-row">
                  <input type="text" className="comment-input" placeholder="Dodaj komentarz..." />
                  <button className="comment-send-btn">
                    <Icon name="send" size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Zakładka instrukcje */}
            {activeTab === "instrukcje" && (
              <div>
                
                {/* Górny pasek ze statusem */}
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center'}}>
                  <span className="status-pill">Krok 2 z 5</span>
                  <span style={{fontSize: '12px', color: 'var(--primary)', fontWeight: 'bold'}}>
                    <span style={{color: 'var(--outline)', display: 'block', fontSize: '10px', textAlign: 'right'}}>Pozostało</span>
                    15:00 min
                  </span>
                </div>

                {/* Karta odliczania */}
                <div className="timer-floating-card">
                  <div className="timer-info">
                    <div className="timer-icon">
                      <Icon name="timer" size={20} />
                    </div>
                    <div>
                      <div className="timer-text-sm">Pieczenie<br/>warzyw</div>
                      <div style={{fontSize: '14px', fontWeight: 'bold', color: '#c2410c'}}>08:45</div>
                    </div>
                  </div>
                  <div className="timer-actions">
                    <button className="btn-outline-sm">Reset</button>
                    <button className="btn-primary-sm">Wznów</button>
                  </div>
                </div>

                {/* Krok 1 */}
                <div className="list-item-card" style={{opacity: 0.7}}>
                  <div className="step-checkbox"></div>
                  <div className="item-text">
                    <div style={{fontSize: '11px', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase'}}>Krok 1</div>
                    <div className="item-title" style={{marginTop: '4px'}}>Przygotowanie bazy</div>
                    <div className="item-desc" style={{marginTop: '6px'}}>
                      Pokrój dynię w kostkę, usuwając gniazda nasienne. Cebulę i czosnek posiekaj drobno. Rozgrzej oliwę w dużym garnku na średnim ogniu.
                    </div>
                  </div>
                </div>

                {/* Krok 2 */}
                <div className="list-item-card active-step">
                  <div className="step-checkbox"></div>
                  <div className="item-text">
                    <div style={{fontSize: '11px', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase'}}>Krok 2 • W toku</div>
                    <div className="item-title" style={{marginTop: '4px'}}>Smażenie i duszenie</div>
                    <div className="item-desc" style={{marginTop: '6px'}}>
                      Dodaj dynię, cebulę i czosnek do garnka. Smaż przez 10 minut, aż warzywa lekko zmiękną i zaczną pachnieć. Mieszaj regularnie, aby nie przypalić czosnku.
                    </div>
                    
                    {/* Alert */}
                    <div style={{display: 'flex', gap: '8px', alignItems: 'flex-start', marginTop: '16px', color: '#c2410c', fontSize: '12px', fontWeight: '600'}}>
                      <Icon name="alert" size={16} style={{flexShrink: 0}} />
                      Uważaj, aby czosnek nie stał się brązowy – będzie gorzki.
                    </div>
                  </div>
                </div>

                {/* Krok 3 */}
                <div className="list-item-card" style={{opacity: 0.5}}>
                  <div className="step-checkbox"></div>
                  <div className="item-text">
                    <div style={{fontSize: '11px', fontWeight: 'bold', color: 'var(--outline)', textTransform: 'uppercase'}}>Krok 3</div>
                    <div className="item-title" style={{marginTop: '4px'}}>Gotowanie bulionu</div>
                    <div className="item-desc" style={{marginTop: '6px'}}>
                      Wlej 1 litr bulionu warzywnego. Doprowadź do wrzenia, a następnie zmniejsz ogień i gotuj pod przykryciem przez 20 minut.
                    </div>
                  </div>
                </div>

                {/* Karta "Potrzebne teraz" */}
                <div className="needed-now-card">
                  <img src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=600&q=80" alt="Składniki dynia" className="needed-img" />
                  <div className="needed-content">
                    <div className="needed-title">Potrzebne teraz:</div>
                    <ul className="needed-list">
                      <li>800g Dyni Hokkaido</li>
                      <li>1 Duża cebula</li>
                      <li>3 Ząbki czosnku</li>
                    </ul>
                  </div>
                </div>

                {/* Eko Tip */}
                <div className="eko-tip">
                  <div className="eko-tip-title">
                    <Icon name="leaf" size={16} /> Eko Tip
                  </div>
                  <div className="eko-tip-text">
                    Skórki z dyni możesz wysuszyć w niskiej temperaturze i zmielić na aromatyczną posypkę lub dodać do kompostu!
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* Przycisk */}
        <div className="sticky-action-bar">
          <Button variant="cta" className="full-width-btn" onClick={() => setIsCookingMode(true)}>
            <Icon name="play" size={18} fill="currentColor" /> Gotuj
          </Button>
        </div>

      </div>

      <BottomNav currentTab="przepisy" />
    </div>
  );
};

export default SzczegolyPrzepisu;