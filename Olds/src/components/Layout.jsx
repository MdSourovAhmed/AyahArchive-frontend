// import Navbar from "./Navbar";
// import Footer from "./Footer";

// function Layout({ children }) {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
//       <Navbar />
//       <main className="flex-1 w-full">
//         {children}
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Layout;





import { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePrayerTimes } from "../hooks/usePrayerTimes";

function usePrayerPeriod(prayers) {
  if (!prayers) return "night";
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  const f = toMin(prayers.Fajr);
  const d = toMin(prayers.Dhuhr);
  const a = toMin(prayers.Asr);
  const m = toMin(prayers.Maghrib);
  const i = toMin(prayers.Isha);
  if (cur >= i || cur < f) return "night";
  if (cur >= f && cur < d) return "fajr";
  if (cur >= d && cur < a) return "dhuhr";
  if (cur >= a && cur < m) return "asr";
  return "maghrib";
}

const THEMES = {
  night:   { stops: ["#0a0a1a", "#0d0d2b", "#1a0a2e"], particle: [148, 163, 255], moon: true,  sun: false },
  fajr:    { stops: ["#0d0a1f", "#1f0a2e", "#3d1a30"], particle: [251, 191, 148], moon: true,  sun: false },
  dhuhr:   { stops: ["#0369a1", "#0891b2", "#0d9488"], particle: [255, 255, 255], moon: false, sun: true  },
  asr:     { stops: ["#92400e", "#b45309", "#0369a1"], particle: [255, 210, 100], moon: false, sun: true  },
  maghrib: { stops: ["#7c2d12", "#9f1239", "#1e1b4b"], particle: [255, 160, 80],  moon: true,  sun: false },
};

function PrayerBackground({ period }) {
  const canvasRef = useRef(null);
  const theme = THEMES[period] || THEMES.night;
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const particles = Array.from({ length: 70 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      r:  Math.random() * 1.8 + 0.3,
      vy: -(Math.random() * 0.25 + 0.04),
      vx: (Math.random() - 0.5) * 0.15,
      o:  Math.random() * 0.55 + 0.1,
    }));

    const draw = () => {
      const t = themeRef.current;
      const w = canvas.width, h = canvas.height;

      // Gradient background
      const grad = ctx.createLinearGradient(0, 0, w * 0.6, h);
      grad.addColorStop(0,   t.stops[0]);
      grad.addColorStop(0.5, t.stops[1]);
      grad.addColorStop(1,   t.stops[2]);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Islamic geometric tile pattern
      ctx.save();
      ctx.globalAlpha = 0.045;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.6;
      const tile = 72;
      for (let gx = 0; gx < w + tile; gx += tile) {
        for (let gy = 0; gy < h + tile; gy += tile) {
          // 8-pointed star
          ctx.beginPath();
          for (let k = 0; k < 8; k++) {
            const angle = (k / 8) * Math.PI * 2 - Math.PI / 8;
            const rr = k % 2 === 0 ? tile * 0.37 : tile * 0.17;
            const px = gx + Math.cos(angle) * rr;
            const py = gy + Math.sin(angle) * rr;
            k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();

          // Connecting diamonds between stars
          ctx.beginPath();
          ctx.moveTo(gx + tile * 0.5, gy);
          ctx.lineTo(gx + tile,       gy + tile * 0.5);
          ctx.lineTo(gx + tile * 0.5, gy + tile);
          ctx.lineTo(gx,              gy + tile * 0.5);
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.restore();

      // Crescent moon
      if (t.moon) {
        ctx.save();
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = "#fde68a";
        const mx = w * 0.83, my = h * 0.11, mr = 32;
        ctx.beginPath(); ctx.arc(mx, my, mr, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(mx + mr * 0.52, my - mr * 0.08, mr * 0.8, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      // Sun glow
      if (t.sun) {
        ctx.save();
        const sx = w * 0.8, sy = h * 0.12;
        const sunGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 80);
        sunGrad.addColorStop(0,   "rgba(255,220,80,0.5)");
        sunGrad.addColorStop(0.4, "rgba(255,180,40,0.12)");
        sunGrad.addColorStop(1,   "rgba(255,120,0,0)");
        ctx.fillStyle = sunGrad;
        ctx.beginPath(); ctx.arc(sx, sy, 80, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      // Horizon glow for fajr/maghrib
      if (period === "fajr" || period === "maghrib") {
        ctx.save();
        const hg = ctx.createLinearGradient(0, h * 0.55, 0, h);
        hg.addColorStop(0, period === "fajr" ? "rgba(251,146,60,0)" : "rgba(249,115,22,0)");
        hg.addColorStop(1, period === "fajr" ? "rgba(251,146,60,0.18)" : "rgba(249,115,22,0.22)");
        ctx.fillStyle = hg;
        ctx.fillRect(0, h * 0.55, w, h * 0.45);
        ctx.restore();
      }

      // Particles
      const [pr, pg, pb] = t.particle;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pr},${pg},${pb},${p.o})`;
        ctx.fill();
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5 || p.x > w + 5) p.x = Math.random() * w;
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [period]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none w-full h-full" />;
}

function Layout({ children }) {
  const { prayers } = usePrayerTimes();
  const period = usePrayerPeriod(prayers);

  return (
    <div className="min-h-screen flex flex-col relative">
      <PrayerBackground period={period} />
      <Navbar transparent />
      <main className="flex-1 w-full relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;