import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { usePrayerTimes, fmt12 } from "../hooks/usePrayerTimes";
import LOGO from "../assets/AYAHARCHIVE.png";

function pad(n) {
  return String(n).padStart(2, "0");
}

function NavCountdown() {
  const { nextPrayer, loading } = usePrayerTimes();
  if (loading || !nextPrayer) return null;
  return (
    <Link
      to="/prayer-times"
      className="hidden lg:flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
      title="View full prayer schedule"
    >
      <span className="text-base">🕌</span>
      <div className="text-left leading-tight">
        <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
          {nextPrayer.name} · {fmt12(nextPrayer.time)}
        </div>
        <div className="font-mono text-sm font-bold text-white tabular-nums">
          {pad(nextPrayer.hrs)}:{pad(nextPrayer.mins)}:{pad(nextPrayer.secs)}
        </div>
      </div>
    </Link>
  );
}

function Navbar({ transparent = false }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, []); // eslint-disable-line

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  // Glass style — always on since background is always the prayer canvas
  const navBg = scrolled
    ? "bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
    : "bg-black/20 backdrop-blur-md border-b border-white/10";

  const linkClass = (path) =>
    `relative text-sm font-medium transition-all duration-200 pb-0.5
     after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:transition-all after:duration-200
     ${
       isActive(path)
         ? "text-white after:w-full after:bg-teal-400"
         : "text-white/70 hover:text-white after:w-0 hover:after:w-full after:bg-white/50"
     }`;

  const mobileLinkClass = (path) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
     ${
       isActive(path)
         ? "bg-white/20 text-white"
         : "text-white/75 hover:bg-white/10 hover:text-white"
     }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const publicLinks = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/chapters", label: "QUR'AN", icon: "📖" },
    { to: "/prayer-times", label: "Prayers", icon: "🕌" },
  ];
  const authLinks = user
    ? [
        { to: "/progress", label: "My Vault", icon: "🗂️" },
        // { to: "/verses", label: "Verses", icon: "📜" },
        { to: "/quiz", label: "Quiz", icon: "🧠" },
        { to: "/dashboard", label: "Dashboard", icon: "📊" },
      ]
    : [];
  const allLinks = [...publicLinks, ...authLinks];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <span className="text-2xl select-none group-hover:scale-110 transition-transform duration-200">
              {/* ☪️ */}
              <img src={LOGO} className="w-12 h-12" alt="" /> 
            </span>
            <span className="text-xl font-bold text-white tracking-tight drop-shadow-sm">
              AyahArchive
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {allLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={linkClass(to)}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <NavCountdown />

            {!user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors px-3 py-1.5"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold bg-teal-500/90 hover:bg-teal-500 text-white px-4 py-1.5 rounded-lg transition-colors shadow-sm backdrop-blur-sm"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-white/70 font-medium max-w-[120px] truncate">
                  {user.name || user.email?.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-white/60 hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Dark toggle */}
            <button
              onClick={() => setDarkMode((p) => !p)}
              aria-label="Toggle dark mode"
              className="w-9 h-9 flex items-center justify-center rounded-xl text-base bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen((p) => !p)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
            >
              <span
                className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-3.5 opacity-100"}`}
              />
              <span
                className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1 border-t border-white/10 bg-black/30 backdrop-blur-xl">
          {allLinks.map(({ to, label, icon }) => (
            <Link key={to} to={to} className={mobileLinkClass(to)}>
              <span className="text-base w-5 text-center">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
          <div className="pt-2 mt-1 border-t border-white/10 space-y-1">
            {!user ? (
              <>
                <Link to="/login" className={mobileLinkClass("/login")}>
                  <span className="w-5 text-center">🔑</span> Login
                </Link>
                <Link to="/register" className={mobileLinkClass("/register")}>
                  <span className="w-5 text-center">✨</span> Register
                </Link>
              </>
            ) : (
              <>
                <div className="px-3 py-2 text-sm text-white/50">
                  Signed in as{" "}
                  <span className="font-semibold text-white/80">
                    {user.name || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <span className="w-5 text-center">👋</span> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
