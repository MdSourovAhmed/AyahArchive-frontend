

import { useState, useEffect, useCallback } from "react";

// ─── Module-level cache (shared across all hook instances) ────────────────────
// Once fetched, every component that calls usePrayerTimes() gets data instantly.
let cachedData = null; // { prayers, location, fetchedAt (dateStr) }
let fetchPromise = null; // in-flight promise so we never double-fetch

const TODAY = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

// Also persist to sessionStorage so a page reload within the same session is instant
function loadFromSession() {
  try {
    const raw = sessionStorage.getItem("prayerCache");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.fetchedAt !== TODAY()) return null; // stale day, re-fetch
    return parsed;
  } catch {
    return null;
  }
}

function saveToSession(data) {
  try {
    sessionStorage.setItem("prayerCache", JSON.stringify(data));
  } catch {}
}

// Initialise cache from session on module load (synchronous — no delay)
if (!cachedData) cachedData = loadFromSession();

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function fmt12(time24) {
  if (!time24) return "--:--";
  const [hStr, mStr] = time24.split(":");
  let h = parseInt(hStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${mStr} ${ampm}`;
}

export const PRAYER_CONFIG = [
  {
    key: "Fajr",
    label: "Fajr",
    arabic: "فجر",
    icon: "🌅",
    color: "from-indigo-400 to-blue-500",
  },
  {
    key: "Dhuhr",
    label: "Dhuhr",
    arabic: "ظهر",
    icon: "☀️",
    color: "from-yellow-400 to-orange-400",
  },
  {
    key: "Asr",
    label: "Asr",
    arabic: "عصر",
    icon: "🌤️",
    color: "from-orange-300 to-amber-500",
  },
  {
    key: "Maghrib",
    label: "Maghrib",
    arabic: "مغرب",
    icon: "🌇",
    color: "from-rose-400 to-pink-500",
  },
  {
    key: "Isha",
    label: "Isha",
    arabic: "عشاء",
    icon: "🌙",
    color: "from-violet-500 to-indigo-600",
  },
];

export const SPECIAL_CONFIG = [
  {
    key: "Sahri",
    label: "Sahri",
    arabic: "سحري",
    icon: "🌙",
    note: "Last moment to eat before Fajr",
    prayerRef: "Fajr",
  },
  {
    key: "Iftar",
    label: "Iftar",
    arabic: "إفطار",
    icon: "🍽️",
    note: "Break fast at Maghrib",
    prayerRef: "Maghrib",
  },
];

// ─── Core fetch (only runs once per session) ──────────────────────────────────
async function doFetch(lat, lon, city) {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const res = await fetch(
    `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lon}&method=1`,
  );
  const data = await res.json();
  if (data.code !== 200) throw new Error("Bad response from Aladhan");
  const t = data.data.timings;
  return {
    prayers: {
      Fajr: t.Fajr,
      Dhuhr: t.Dhuhr,
      Asr: t.Asr,
      Maghrib: t.Maghrib,
      Isha: t.Isha,
      Sahri: t.Fajr,
      Iftar: t.Maghrib,
    },
    location: city,
    fetchedAt: TODAY(),
  };
}

function getPrayerData() {
  // Already cached in memory for this session
  if (cachedData) return Promise.resolve(cachedData);

  // Deduplicate concurrent calls — only one fetch in flight at a time
  if (fetchPromise) return fetchPromise;

  fetchPromise = new Promise((resolve, reject) => {
    const finish = async (lat, lon, city) => {
      try {
        const result = await doFetch(lat, lon, city);
        cachedData = result;
        saveToSession(result);
        fetchPromise = null;
        resolve(result);
      } catch (e) {
        fetchPromise = null;
        reject(e);
      }
    };

    if (!navigator.geolocation) {
      finish(24.2512, 89.9167, "Tangail, Bangladesh");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        let city = "Your Location";
        try {
          const geo = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          );
          const gd = await geo.json();
          city =
            gd.address?.city || gd.address?.town || gd.address?.village || city;
        } catch {}
        finish(latitude, longitude, city);
      },
      () => finish(24.2512, 89.9167, "Tangail, Bangladesh"),
    );
  });

  return fetchPromise;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function usePrayerTimes() {
  // If cache is already warm, initialise with data immediately (no loading flash)
  const [prayers, setPrayers] = useState(cachedData?.prayers ?? null);
  const [location, setLocation] = useState(cachedData?.location ?? null);
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(new Date());

  // Tick
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch (no-op if cache is already warm)
  useEffect(() => {
    if (cachedData) return; // already have data, skip
    getPrayerData()
      .then(({ prayers: p, location: l }) => {
        setPrayers(p);
        setLocation(l);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load prayer times.");
        setLoading(false);
      });
  }, []);

  const toMin = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const getNextPrayer = useCallback(() => {
    if (!prayers) return null;
    const cur = now.getHours() * 60 + now.getMinutes();
    const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    for (const name of order) {
      const pm = toMin(prayers[name]);
      if (pm > cur) {
        const diff = pm - cur;
        return {
          name,
          time: prayers[name],
          hrs: Math.floor(diff / 60),
          mins: diff % 60,
          secs: 59 - now.getSeconds(),
        };
      }
    }
    const diff = 24 * 60 - cur + toMin(prayers.Fajr);
    return {
      name: "Fajr",
      time: prayers.Fajr,
      hrs: Math.floor(diff / 60),
      mins: diff % 60,
      secs: 59 - now.getSeconds(),
    };
  }, [prayers, now]);

  return {
    prayers,
    location,
    loading,
    error,
    now,
    nextPrayer: getNextPrayer(),
  };
}
