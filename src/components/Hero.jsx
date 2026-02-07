import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {

  const [startBackFall, setStartBackFall] = useState(false);
  const [startFrontFall, setStartFrontFall] = useState(false);
  const [startPopUp, setStartPopUp] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const popupTimer = setTimeout(() => setStartPopUp(true), 14000);
    const timer1 = setTimeout(() => setStartBackFall(true), 16000);
    const timer2 = setTimeout(() => setStartFrontFall(true), 21000);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(popupTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleScreenClick = (e) => {
    const newPetals = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 20 + 10,
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 150
    }));
    setPetals(prev => [...prev, ...newPetals]);

    setTimeout(() => {
      setPetals(prev => prev.filter(p => !newPetals.find(np => np.id === p.id)));
    }, 3000);
  };

  return (
    <div className="hero" onClick={handleScreenClick}>
      <div className="fireflies">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              '--mx': `${mousePos.x}px`,
              '--my': `${mousePos.y}px`,
            }}
          ></div>
        ))}
      </div>

      {petals.map(petal => (
        <div
          key={petal.id}
          className="interactive-petal"
          style={{
            left: petal.x,
            top: petal.y,
            width: petal.size,
            height: petal.size * 1.5,
            '--rotation': `${petal.rotation}deg`,
            '--drift': `${petal.drift}px`
          }}
        />
      ))}

      <div className="message-container">
        <h1 className="title">Happy Rose Day</h1>
        <p className="subtitle">To my Senior 😉😃💕</p>
      </div>

      <div className="glass-dome">
        <div className="flower">
          <div className="stem"></div>
          <div className="leaf leaf-left"></div>
          <div className="leaf leaf-right"></div>

          <div className="rose-bud">
            <div className={`petal falling back-petal ${startBackFall ? 'fall-back-start' : ''}`}></div>
            <div className={`petal falling front-petal ${startFrontFall ? 'fall-front-start' : ''}`}></div>

            {/* Main petals */}
            <div className="petal center-petal"></div>
            <div className={`petal side-petal left p1 ${startPopUp ? 'pop-up' : ''}`}></div>
            <div className={`petal side-petal left p2 ${startPopUp ? 'pop-up' : ''}`}></div>
            <div className="petal side-petal left p3"></div>
            <div className={`petal side-petal right p1 ${startPopUp ? 'pop-up-right' : ''}`}></div>
            <div className={`petal side-petal right p2 ${startPopUp ? 'pop-up-right' : ''}`}></div>

            <div className="petal side-petal right p3"></div>
          </div>
        </div>
      </div>
      <div className="brown">

      </div>
    </div>
  );
};

export default Hero;
