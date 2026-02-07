import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
 
 const [startBackFall, setStartBackFall] = useState(false);
  const [startFrontFall, setStartFrontFall] = useState(false);
const [startPopUp, setStartPopUp] = useState(false);

useEffect(() => {
  const popupTimer = setTimeout(() => setStartPopUp(true), 14000); 
  const timer1 = setTimeout(() => setStartBackFall(true), 16000);
  const timer2 = setTimeout(() => setStartFrontFall(true), 21000);

  return () => {
    clearTimeout(popupTimer);
    clearTimeout(timer1);
    clearTimeout(timer2);
  };
}, []);

  return (
    <div className="hero">
      <div className="fireflies">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="firefly"></div>
        ))}
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
