import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TopBar";
import "./SzczegolyPrzepisu.css";

const SzczegolyPrzepisu = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("instrukcje");
  const [isCookingMode, setIsCookingMode] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([1, 2, 4]);
  const [isLiked, setIsLiked] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const cookingSteps = [
    {
      title: "Przygotowanie łososia",
      desc: "Umyj i osusz filety z łososia. Skrop oliwą z oliwek, natrzyj solą i pieprzem. Ułóż na blasze wyłożonej papierem do pieczenia.",
      time: null
    },
    {
      title: "Dodanie cytrusów",
      desc: "Cytrynę i pomarańczę pokrój w cienkie plasterki. Ułóż plastry na filetach z łososia. Posyp wierzch posiekanym świeżym koperkiem.",
      time: null
    },
    {
      title: "Pieczenie",
      desc: "Wstaw blachę do piekarnika nagrzanego do 200°C. Piecz przez 15-20 minut, aż ryba będzie miękka i łatwo dzielić się na płatki.",
      time: "15:00"
    }
  ];

  const parseTimeToSeconds = (timeStr) => {
    if (!timeStr) return 0;
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    const stepTime = cookingSteps[currentStep - 1].time;
    setTimeLeft(parseTimeToSeconds(stepTime));
    setIsRunning(false);
  }, [currentStep]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleIngredient = (id) => {
    if (checkedIngredients.includes(id)) {
      setCheckedIngredients(checkedIngredients.filter(i => i !== id));
    } else {
      setCheckedIngredients([...checkedIngredients, id]);
    }
  };

  const toggleTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    const stepTime = cookingSteps[currentStep - 1].time;
    setTimeLeft(parseTimeToSeconds(stepTime));
    setIsRunning(false);
  };

  const reviewsSection = (
    <>
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
        <div className="comment-avatar" style={{ backgroundColor: '#fed7aa' }}>AK</div>
        <div className="comment-content">
          <div className="comment-top">
            <span className="comment-name">Anna Kowalska</span>
            <span className="comment-time">2 dni temu</span>
          </div>
          <div className="comment-text">Przepis rewelacyjny! Łosoś wyszedł niesamowicie soczysty dzięki tym cytrusom. Na pewno powtórzę.</div>
        </div>
      </div>

      <div className="comment-item">
        <div className="comment-avatar" style={{ backgroundColor: '#bbf7d0' }}>MW</div>
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
    </>
  );

  if (isCookingMode) {
    const stepData = cookingSteps[currentStep - 1];

    return (
      <div className="cooking-mode-screen">
        <div className="cooking-topbar">
          <button className="icon-btn-round" onClick={() => setIsCookingMode(false)} style={{ boxShadow: 'none', border: '1px solid #e2e8f0' }}>
            <Icon name="close" size={20} />
          </button>
          <div className="status-pill">
            <Icon name="eye" size={14} /> EKRAN WŁĄCZONY
          </div>
          <div style={{ width: '40px' }}></div>
        </div>

        <div className="cooking-progress">KROK {currentStep} Z {cookingSteps.length}</div>
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${(currentStep / cookingSteps.length) * 100}%` }}></div>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--primary)', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {stepData.title}
        </div>
        
        <h2 className="cooking-instruction">
          {stepData.desc}
        </h2>

        {stepData.time && (
          <div className="timer-box">
            <div className="timer-time">
              <Icon name="timer" size={32} color="var(--secondary-container)" />
              {formatTime(timeLeft)}
            </div>
            <div className="timer-controls">
              <button className="btn-pause" onClick={toggleTimer}>
                <Icon name={isRunning ? "pause" : "play"} size={18} /> {isRunning ? "Pauza" : "Start"}
              </button>
              <button className="btn-reset" onClick={resetTimer}>
                <Icon name="reset" size={20} />
              </button>
            </div>
          </div>
        )}

        <div className="cooking-bottom-nav">
          <button 
            className="btn-prev" 
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            style={{ opacity: currentStep === 1 ? 0.3 : 1, pointerEvents: currentStep === 1 ? 'none' : 'auto' }}
          >
            ← Poprzedni krok
          </button>
          <button 
            className="btn-next" 
            onClick={() => setCurrentStep(prev => Math.min(cookingSteps.length, prev + 1))}
            style={{ opacity: currentStep === cookingSteps.length ? 0.3 : 1, pointerEvents: currentStep === cookingSteps.length ? 'none' : 'auto' }}
          >
            Następny krok →
          </button>
        </div>
      </div>
    );
  }

  const stepData = cookingSteps[currentStep - 1];

  return (
    <div className="recipe-details-wrapper">
      
      <TopBar title="Fridge2Table" />

      <div className="main-content-area">
        <div className="scrollable-content">
          <div className="recipe-hero">
            <div className="hero-overlay"></div>

            <div className="hero-floating-top">
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  className="icon-btn-round"
                  onClick={() => setIsLiked(!isLiked)}
                  style={{ color: isLiked ? 'var(--primary)' : 'var(--outline)' }}
                >
                  <Icon name="favorites" fill={isLiked ? "currentColor" : "none"} size={20} />
                </button>
                <button className="icon-btn-round" style={{ color: 'var(--on-background)' }}>
                  <Icon name="share" size={20} />
                </button>
              </div>
              <div style={{ background: 'white', color: 'var(--on-background)', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 'bold' }}>
                <Icon name="star" fill="var(--secondary-container)" color="var(--secondary-container)" size={14} /> 4.8 <span style={{ color: 'var(--outline)', fontWeight: 'normal' }}>(124)</span>
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
            {activeTab === "skladniki" && (
              <div>
                <div className="list-item-card" onClick={() => toggleIngredient(1)} style={{ alignItems: 'center', cursor: 'pointer' }}>
                  <div className="item-icon-box" style={{ backgroundColor: '#f0fdf4', color: '#166534' }}><Icon name="fish" size={24} /></div>
                  <div className="item-text">
                    <div className="item-title">Świeży Łosoś</div>
                    <div className="item-desc">2 filety (ok. 400g)</div>
                  </div>
                  <Icon name={checkedIngredients.includes(1) ? "checkCircle" : "circle"} size={24} color={checkedIngredients.includes(1) ? "var(--primary)" : "var(--outline)"} />
                </div>

                <div className="list-item-card" onClick={() => toggleIngredient(2)} style={{ alignItems: 'center', cursor: 'pointer' }}>
                  <div className="item-icon-box" style={{ backgroundColor: '#fef3c7', color: '#b45309' }}><Icon name="lemon" size={24} /></div>
                  <div className="item-text">
                    <div className="item-title">Cytryna i Pomarańcza</div>
                    <div className="item-desc">po 1 sztuce</div>
                  </div>
                  <Icon name={checkedIngredients.includes(2) ? "checkCircle" : "circle"} size={24} color={checkedIngredients.includes(2) ? "var(--primary)" : "var(--outline)"} />
                </div>

                <div className="list-item-card" onClick={() => toggleIngredient(3)} style={{ alignItems: 'center', cursor: 'pointer' }}>
                  <div className="item-icon-box" style={{ color: '#db2777', backgroundColor: '#fce7f3' }}><Icon name="leaf" size={24} /></div>
                  <div className="item-text">
                    <div className="item-title">Świeży Koperek</div>
                    <div className="item-desc">1 pęczek</div>
                  </div>
                  <Icon name={checkedIngredients.includes(3) ? "checkCircle" : "circle"} size={24} color={checkedIngredients.includes(3) ? "var(--primary)" : "var(--outline)"} />
                </div>

                <div className="list-item-card" onClick={() => toggleIngredient(4)} style={{ alignItems: 'center', cursor: 'pointer' }}>
                  <div className="item-icon-box" style={{ backgroundColor: '#f1f5f9', color: '#475569' }}><Icon name="droplet" size={24} /></div>
                  <div className="item-text">
                    <div className="item-title">Oliwa z Oliwek</div>
                    <div className="item-desc">2 łyżki stołowe</div>
                  </div>
                  <Icon name={checkedIngredients.includes(4) ? "checkCircle" : "circle"} size={24} color={checkedIngredients.includes(4) ? "var(--primary)" : "var(--outline)"} />
                </div>

                {reviewsSection}
              </div>
            )}

            {activeTab === "instrukcje" && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                  <span className="status-pill">Krok {currentStep} z {cookingSteps.length}</span>
                </div>

                {stepData.time && (
                  <div className="timer-floating-card">
                    <div className="timer-info">
                      <div className="timer-icon">
                        <Icon name="timer" size={20} />
                      </div>
                      <div>
                        <div className="timer-text-sm" style={{ lineHeight: 1.2, marginBottom: '2px' }}>
                          {stepData.title}
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#c2410c' }}>
                          {formatTime(timeLeft)}
                        </div>
                      </div>
                    </div>
                    <div className="timer-actions">
                      <button className="btn-outline-sm" onClick={resetTimer}>Reset</button>
                      <button className="btn-primary-sm" onClick={toggleTimer}>{isRunning ? "Pauza" : "Zacznij"}</button>
                    </div>
                  </div>
                )}

                {cookingSteps.map((step, index) => {
                  const stepNumber = index + 1;
                  let cardClass = "list-item-card";
                  let opacity = 1;
                  let statusText = `Krok ${stepNumber}`;

                  if (stepNumber === currentStep) {
                    cardClass += " active-step";
                    statusText += " • W toku";
                  } else if (stepNumber < currentStep) {
                    opacity = 0.7;
                    statusText += " • Zakończony";
                  } else {
                    opacity = 0.5;
                  }

                  return (
                    <div 
                      className={cardClass} 
                      style={{ opacity, cursor: 'pointer' }} 
                      key={index}
                      onClick={() => setCurrentStep(stepNumber)}
                    >
                      <div style={{ flexShrink: 0, marginTop: '2px' }}>
                        <Icon 
                          name={stepNumber < currentStep ? "checkCircle" : "circle"} 
                          size={24} 
                          color={stepNumber === currentStep ? "var(--primary)" : "var(--outline)"} 
                        />
                      </div>
                      <div className="item-text">
                        <div style={{ fontSize: '11px', fontWeight: 'bold', color: stepNumber === currentStep ? 'var(--primary)' : 'var(--outline)', textTransform: 'uppercase' }}>
                          {statusText}
                        </div>
                        <div className="item-title" style={{ marginTop: '4px' }}>{step.title}</div>
                        <div className="item-desc" style={{ marginTop: '6px' }}>{step.desc}</div>
                      </div>
                    </div>
                  );
                })}

                <div className="needed-now-card">
                  <img src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80" alt="Składniki łosoś" className="needed-img" />
                  <div className="needed-content">
                    <div className="needed-title">Potrzebne teraz:</div>
                    <ul className="needed-list">
                      <li>2 Filety z łososia</li>
                      <li>Oliwa z oliwek</li>
                      <li>Sól i pieprz</li>
                    </ul>
                  </div>
                </div>

                <div className="eko-tip">
                  <div className="eko-tip-title">
                    <Icon name="leaf" size={16} /> Eko Tip
                  </div>
                  <div className="eko-tip-text">
                    Niewykorzystane połówki cytrusów możesz wrzucić do zmywarki przed cyklem zmywania – świetnie odświeżą i nabłyszczą naczynia!
                  </div>
                </div>

                {reviewsSection}

              </div>
            )}
          </div>
        </div>

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