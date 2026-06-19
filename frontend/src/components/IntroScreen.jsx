

import { useEffect, useRef, useState } from 'react';
import './IntroScreen.css';

const PARTICLES_PER_HALF = 140;

function makeParticle(vertical, maxDist) {
  const dx = Math.random() * 2 - 1;
  const dyMag = 0.25 + Math.random() * 0.9;
  const dy = vertical * dyMag;
  const len = Math.hypot(dx, dy) || 1;
  return {
    dx: dx / len,
    dy: dy / len,
    dist: Math.random() * maxDist * 0.3,
    speed: 30 + Math.random() * 90,
  };
}

export const IntroScreen = ({ title = 'VECTORSHIFT', onEnter }) => {
  const canvasRef = useRef(null);
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);

  useEffect(() => {
    leavingRef.current = leaving;
  }, [leaving]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let last = performance.now();
    let burst = 1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const maxDist = () => Math.hypot(canvas.width / 2, canvas.height / 2) * 1.1;
    const bandHeight = () => Math.min(140, canvas.height * 0.16);

    const particlesTop = [];
    const particlesBottom = [];
    for (let i = 0; i < PARTICLES_PER_HALF; i++) {
      particlesTop.push(makeParticle(-1, maxDist()));
      particlesBottom.push(makeParticle(1, maxDist()));
    }

    const draw = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      ctx.fillStyle = 'rgba(10, 10, 9, 0.32)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const topEdge = canvas.height / 2 - bandHeight() / 2;
      const bottomEdge = canvas.height / 2 + bandHeight() / 2;
      const md = maxDist();

      if (leavingRef.current) burst += dt * 14;
      ctx.fillStyle = '#f4f3ee';

      const step = (p, originY) => {
        p.dist += p.speed * burst * dt;
        if (p.dist > md) {
          const fresh = makeParticle(Math.sign(p.dy) || 1, md);
          p.dx = fresh.dx;
          p.dy = fresh.dy;
          p.speed = fresh.speed;
          p.dist = 0;
        }
        const x = cx + p.dx * p.dist;
        const y = originY + p.dy * p.dist;
        const size = Math.max(0.6, (p.dist / md) * 3.2);
        if (y >= 0 && y <= canvas.height) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      particlesTop.forEach((p) => step(p, topEdge));
      particlesBottom.forEach((p) => step(p, bottomEdge));

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(() => onEnter?.(), 650);
  };

  return (
    <div className={`intro ${leaving ? 'intro--leaving' : ''}`}>
      <canvas ref={canvasRef} className="intro__canvas" />
      <button className="intro__title" onClick={handleEnter}>
        {title}
        <span className="intro__cursor">_</span>
      </button>
      <span className="intro__hint">[ click to enter ]</span>
    </div>
  );
};
