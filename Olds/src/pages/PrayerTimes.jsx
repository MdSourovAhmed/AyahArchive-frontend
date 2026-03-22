import {
  usePrayerTimes,
  fmt12,
  PRAYER_CONFIG,
  SPECIAL_CONFIG,
} from "../hooks/usePrayerTimes";


function pad(n) {
  return String(n).padStart(2, "0");
}

function PrayerTimes() {
  const { prayers, location, loading, error, now, nextPrayer } =
    usePrayerTimes();

  const dayStr = now.toLocaleDateString("en-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen px-4 py-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">🕌 Prayer Times</h1>
        {location && (
          <p className="text-sm text-white/45">
            📍 {location} &nbsp;·&nbsp; {dayStr}
          </p>
        )}
      </div>

      {loading && (
        <div className="text-center text-white/30 animate-pulse py-20 text-base">
          Fetching prayer times…
        </div>
      )}
      {error && (
        <div className="text-center text-red-400 py-10 text-sm">{error}</div>
      )}

      {prayers && !loading && (
        <div className="space-y-6">
          {/* ── Countdown Banner ── */}
          {nextPrayer && (
            <div className="rounded-2xl border border-teal-400/25 bg-teal-500/15 backdrop-blur-md p-6 text-center">
              <p className="text-xs font-bold text-teal-300/70 uppercase tracking-[0.2em] mb-1">
                Next Prayer
              </p>
              <p className="text-5xl font-bold text-white mb-1">
                {nextPrayer.name}
              </p>
              <p className="text-sm text-white/45 mb-5">
                at {fmt12(nextPrayer.time)}
              </p>
              <div className="flex justify-center gap-3">
                {[
                  { v: pad(nextPrayer.hrs), l: "hrs" },
                  { v: pad(nextPrayer.mins), l: "min" },
                  { v: pad(nextPrayer.secs), l: "sec" },
                ].map(({ v, l }) => (
                  <div
                    key={l}
                    className="bg-white/10 border border-white/15 rounded-xl px-5 py-3 min-w-[72px]"
                  >
                    <div className="text-4xl font-mono font-bold text-white">
                      {v}
                    </div>
                    <div className="text-xs text-white/40 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── 5 Prayer Cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PRAYER_CONFIG.map(({ key, label, arabic, icon }) => {
              const isNext = nextPrayer?.name === label;
              return (
                <div
                  key={key}
                  className={`relative rounded-2xl p-5 text-center border transition-all duration-300 backdrop-blur-md ${
                    isNext
                      ? "bg-teal-500/25 border-teal-400/45 scale-105 shadow-xl shadow-teal-900/30"
                      : "bg-white/7 border-white/12 hover:bg-white/12 hover:-translate-y-0.5"
                  }`}
                >
                  {isNext && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] bg-teal-400 text-teal-950 font-bold px-3 py-0.5 rounded-full shadow">
                      Next
                    </span>
                  )}
                  <div className="text-3xl mb-2">{icon}</div>
                  <div
                    className={`text-sm font-bold mb-0.5 ${isNext ? "text-teal-300" : "text-white/70"}`}
                  >
                    {label}
                  </div>
                  <div
                    className={`text-xs font-arabic mb-2 ${isNext ? "text-teal-200/70" : "text-white/35"}`}
                  >
                    {arabic}
                  </div>
                  <div
                    className={`text-base font-mono font-bold ${isNext ? "text-white" : "text-white/85"}`}
                  >
                    {fmt12(prayers[key])}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Sahri & Iftar ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SPECIAL_CONFIG.map(({ key, label, arabic, icon, note }) => (
              <div
                key={key}
                className="rounded-2xl border border-amber-400/20 bg-amber-400/8 backdrop-blur-md p-5 flex items-center gap-4"
              >
                <span className="text-4xl">{icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-amber-200 text-base">
                      {label}
                    </span>
                    <span className="font-arabic text-amber-300/60 text-sm">
                      {arabic}
                    </span>
                  </div>
                  <div className="text-xs text-white/35 mb-1">{note}</div>
                  <div className="text-xl font-mono font-bold text-amber-200">
                    {fmt12(prayers[key])}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Daily Timeline ── */}
          <div>
            <p className="text-xs font-bold text-white/25 uppercase tracking-widest text-center mb-3">
              Daily Timeline
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden divide-y divide-white/8">
              {[
                { key: "Sahri", label: "Sahri", arabic: "سحري", icon: "🌙" },
                { key: "Fajr", label: "Fajr", arabic: "فجر", icon: "🌅" },
                { key: "Dhuhr", label: "Dhuhr", arabic: "ظهر", icon: "☀️" },
                { key: "Asr", label: "Asr", arabic: "عصر", icon: "🌤️" },
                {
                  key: "Maghrib",
                  label: "Maghrib / Iftar",
                  arabic: "مغرب / إفطار",
                  icon: "🌇",
                },
                { key: "Isha", label: "Isha", arabic: "عشاء", icon: "🌙" },
              ].map(({ key, label, arabic, icon }) => {
                const isNext =
                  nextPrayer?.name === (key === "Sahri" ? "Fajr" : key);
                return (
                  <div
                    key={key}
                    className={`flex items-center justify-between px-5 py-3.5 transition-colors ${
                      isNext ? "bg-teal-500/10" : "hover:bg-white/4"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl w-7 text-center">{icon}</span>
                      <div>
                        <span className="text-sm font-semibold text-white/85">
                          {label}
                        </span>
                        <span className="ml-2 text-xs text-white/30 font-arabic">
                          {arabic}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isNext && (
                        <span className="text-[10px] bg-teal-500/30 border border-teal-400/40 text-teal-300 px-2 py-0.5 rounded-full font-bold">
                          Next
                        </span>
                      )}
                      <span className="font-mono font-bold text-teal-300 text-sm">
                        {fmt12(prayers[key])}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PrayerTimes;
