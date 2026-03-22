// // import { useContext } from "react";
// // import { Link } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";

// // function Home() {
// //   const { user } = useContext(AuthContext);

// //   return (
// //     <div className="text-center p-6">
// //       <h1
// //         className="text-5xl font-bold text-teal-500 font-arabic p-6"
// //         dir="rtl"
// //       >
// //         السلام عليكم
// //       </h1>
// //       {user ? (
// //         <>
// //           <h1 className="text-3xl font-bold text-teal-500 mb-4">
// //             Welcome, {user.name || user.email}
// //           </h1>
// //         </>
// //       ) : (
// //         <>
// //           <h1 className="text-3xl font-bold text-teal-500 mb-4">
// //             Welcome to AyahArchive
// //           </h1>
// //         </>
// //       )}
// //       <p className="text-lg text-gray-600 dark:text-gray-200 mb-8">
// //         Memorize and Practice The QURA'N with ease.
// //       </p>
// //       <Link
// //         to={user ? "/progress" : "/login"}
// //         className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
// //       >
// //         Get Started
// //       </Link>
// //       <div className="mt-12 grid md:grid-cols-3 gap-8">
// //         <Link
// //           to="/progress"
// //           className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
// //         >
// //           <h3 className="text-xl font-semibold text-teal-500">Add to your Vault</h3>
// //           <p className="text-gray-600 dark:text-gray-300">
// //             Save and organize your favorite Surahs.
// //           </p>
// //         </Link>
// //         <Link
// //           to="/chapters"
// //           className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
// //         >
// //           <h3 className="text-xl font-semibold text-teal-500">Read The QUR'AN</h3>
// //           <p className="text-gray-600 dark:text-gray-300">
// //             Read any Surah and its verses.
// //           </p>
// //         </Link>
// //         <Link
// //           to="/dashboard"
// //           className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
// //         >
// //           <h3 className="text-xl font-semibold text-teal-500">
// //             Track Progress
// //           </h3>
// //           <p className="text-gray-600 dark:text-gray-300">
// //             Monitor your memorization journey.
// //           </p>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Home;

// // // import { useContext, useState, useEffect, useCallback } from "react";
// // // import { Link } from "react-router-dom";
// // // import { AuthContext } from "../context/AuthContext";

// // // // ─── Prayer Times Hook ────────────────────────────────────────────────────────
// // // function usePrayerTimes() {
// // //   const [prayers, setPrayers] = useState(null);
// // //   const [location, setLocation] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [now, setNow] = useState(new Date());

// // //   // Tick every second
// // //   useEffect(() => {
// // //     const id = setInterval(() => setNow(new Date()), 1000);
// // //     return () => clearInterval(id);
// // //   }, []);

// // //   const fetchPrayers = useCallback(async (lat, lon, city) => {
// // //     try {
// // //       const today = new Date();
// // //       const dd = String(today.getDate()).padStart(2, "0");
// // //       const mm = String(today.getMonth() + 1).padStart(2, "0");
// // //       const yyyy = today.getFullYear();
// // //       const res = await fetch(
// // //         `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${lat}&longitude=${lon}&method=2`,
// // //       );
// // //       const data = await res.json();
// // //       if (data.code === 200) {
// // //         const t = data.data.timings;
// // //         setPrayers({
// // //           Sahri: t.Fajr, // Sahri ends at Fajr
// // //           Fajr: t.Fajr,
// // //           Dhuhr: t.Dhuhr,
// // //           Asr: t.Asr,
// // //           Maghrib: t.Maghrib, // Iftar at Maghrib
// // //           Isha: t.Isha,
// // //           Iftar: t.Maghrib,
// // //         });
// // //         setLocation(city);
// // //       } else {
// // //         setError("Could not fetch prayer times.");
// // //       }
// // //     } catch {
// // //       setError("Network error fetching prayer times.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!navigator.geolocation) {
// // //       // Fallback: Tangail, Bangladesh
// // //       fetchPrayers(24.2512, 89.9167, "Tangail, BD");
// // //       return;
// // //     }
// // //     navigator.geolocation.getCurrentPosition(
// // //       async (pos) => {
// // //         const { latitude, longitude } = pos.coords;
// // //         // Reverse geocode with Nominatim (free)
// // //         try {
// // //           const geo = await fetch(
// // //             `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
// // //           );
// // //           const gData = await geo.json();
// // //           const city =
// // //             gData.address?.city ||
// // //             gData.address?.town ||
// // //             gData.address?.village ||
// // //             "Your Location";
// // //           fetchPrayers(latitude, longitude, city);
// // //         } catch {
// // //           fetchPrayers(latitude, longitude, "Your Location");
// // //         }
// // //       },
// // //       () => fetchPrayers(24.2512, 89.9167, "Tangail, BD"),
// // //     );
// // //   }, [fetchPrayers]);

// // //   // Compute next prayer & countdown
// // //   const getNextPrayer = useCallback(() => {
// // //     if (!prayers) return null;
// // //     const displayOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
// // //     const toMinutes = (timeStr) => {
// // //       const [h, m] = timeStr.split(":").map(Number);
// // //       return h * 60 + m;
// // //     };
// // //     const currentMinutes = now.getHours() * 60 + now.getMinutes();
// // //     for (const name of displayOrder) {
// // //       const pMin = toMinutes(prayers[name]);
// // //       if (pMin > currentMinutes) {
// // //         const diff = pMin - currentMinutes;
// // //         const hrs = Math.floor(diff / 60);
// // //         const mins = diff % 60;
// // //         const secs = 59 - now.getSeconds();
// // //         return { name, time: prayers[name], hrs, mins, secs };
// // //       }
// // //     }
// // //     // After Isha, next is Fajr tomorrow
// // //     const fajrMin = toMinutes(prayers.Fajr);
// // //     const diff = 24 * 60 - (now.getHours() * 60 + now.getMinutes()) + fajrMin;
// // //     return {
// // //       name: "Fajr",
// // //       time: prayers.Fajr,
// // //       hrs: Math.floor(diff / 60),
// // //       mins: diff % 60,
// // //       secs: 59 - now.getSeconds(),
// // //     };
// // //   }, [prayers, now]);

// // //   return { prayers, location, loading, error, nextPrayer: getNextPrayer() };
// // // }

// // // // ─── Prayer Display Config ────────────────────────────────────────────────────
// // // const PRAYER_CONFIG = [
// // //   {
// // //     key: "Sahri",
// // //     label: "Sahri",
// // //     arabic: "سحري",
// // //     icon: "🌙",
// // //     note: "ends at Fajr",
// // //     special: true,
// // //   },
// // //   { key: "Fajr", label: "Fajr", arabic: "فجر", icon: "🌅" },
// // //   { key: "Dhuhr", label: "Dhuhr", arabic: "ظهر", icon: "☀️" },
// // //   { key: "Asr", label: "Asr", arabic: "عصر", icon: "🌤️" },
// // //   { key: "Maghrib", label: "Maghrib", arabic: "مغرب", icon: "🌇" },
// // //   {
// // //     key: "Iftar",
// // //     label: "Iftar",
// // //     arabic: "إفطار",
// // //     icon: "🍽️",
// // //     note: "at Maghrib",
// // //     special: true,
// // //   },
// // //   { key: "Isha", label: "Isha", arabic: "عشاء", icon: "🌙" },
// // // ];

// // // function fmt12(time24) {
// // //   if (!time24) return "--:--";
// // //   const [hStr, mStr] = time24.split(":");
// // //   let h = parseInt(hStr, 10);
// // //   const m = mStr;
// // //   const ampm = h >= 12 ? "PM" : "AM";
// // //   h = h % 12 || 12;
// // //   return `${h}:${m} ${ampm}`;
// // // }

// // // // ─── Prayer Times Section Component ──────────────────────────────────────────
// // // function PrayerTimesSection() {
// // //   const { prayers, location, loading, error, nextPrayer } = usePrayerTimes();

// // //   return (
// // //     <div className="mt-12 mb-6">
// // //       {/* Header */}
// // //       <div className="text-center mb-6">
// // //         <h2 className="text-2xl font-bold text-teal-500 mb-1">
// // //           🕌 Prayer Times
// // //         </h2>
// // //         {location && (
// // //           <p className="text-sm text-gray-500 dark:text-gray-400">
// // //             📍 {location} &mdash;{" "}
// // //             {new Date().toLocaleDateString("en-BD", {
// // //               weekday: "long",
// // //               year: "numeric",
// // //               month: "long",
// // //               day: "numeric",
// // //             })}
// // //           </p>
// // //         )}
// // //       </div>

// // //       {/* Countdown to next prayer */}
// // //       {nextPrayer && !loading && (
// // //         <div className="mx-auto mb-6 max-w-sm bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-5 text-white text-center shadow-lg">
// // //           <p className="text-sm font-medium uppercase tracking-widest opacity-80 mb-1">
// // //             Next Prayer
// // //           </p>
// // //           <p className="text-3xl font-bold mb-2">{nextPrayer.name}</p>
// // //           <p className="text-sm opacity-80 mb-3">at {fmt12(nextPrayer.time)}</p>
// // //           <div className="flex justify-center gap-4">
// // //             {[
// // //               { v: String(nextPrayer.hrs).padStart(2, "0"), l: "hrs" },
// // //               { v: String(nextPrayer.mins).padStart(2, "0"), l: "min" },
// // //               { v: String(nextPrayer.secs).padStart(2, "0"), l: "sec" },
// // //             ].map(({ v, l }) => (
// // //               <div
// // //                 key={l}
// // //                 className="bg-white/20 rounded-xl px-4 py-2 min-w-[56px]"
// // //               >
// // //                 <div className="text-2xl font-mono font-bold">{v}</div>
// // //                 <div className="text-xs opacity-75">{l}</div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Prayer cards grid */}
// // //       {loading && (
// // //         <div className="text-center text-gray-400 py-8 animate-pulse">
// // //           Loading prayer times…
// // //         </div>
// // //       )}
// // //       {error && <div className="text-center text-red-400 py-4">{error}</div>}
// // //       {prayers && !loading && (
// // //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
// // //           {PRAYER_CONFIG.map(({ key, label, arabic, icon, note, special }) => {
// // //             const isNext = nextPrayer?.name === label;
// // //             return (
// // //               <div
// // //                 key={key}
// // //                 className={`
// // //                   relative rounded-xl p-4 text-center transition-all duration-200
// // //                   ${
// // //                     isNext
// // //                       ? "bg-teal-500 text-white shadow-lg scale-105"
// // //                       : special
// // //                         ? "bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700"
// // //                         : "bg-white dark:bg-gray-800 shadow-md"
// // //                   }
// // //                 `}
// // //               >
// // //                 {isNext && (
// // //                   <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-yellow-400 text-gray-900 font-bold px-2 py-0.5 rounded-full">
// // //                     Next
// // //                   </span>
// // //                 )}
// // //                 <div className="text-2xl mb-1">{icon}</div>
// // //                 <div
// // //                   className={`text-sm font-bold ${isNext ? "text-white" : "text-teal-600 dark:text-teal-400"}`}
// // //                 >
// // //                   {label}
// // //                 </div>
// // //                 <div
// // //                   className={`text-xs mb-2 font-arabic ${isNext ? "text-white/80" : "text-gray-400"}`}
// // //                 >
// // //                   {arabic}
// // //                 </div>
// // //                 <div
// // //                   className={`text-base font-mono font-semibold ${isNext ? "text-white" : "text-gray-800 dark:text-gray-100"}`}
// // //                 >
// // //                   {fmt12(prayers[key])}
// // //                 </div>
// // //                 {note && (
// // //                   <div
// // //                     className={`text-xs mt-1 ${isNext ? "text-white/70" : "text-gray-400"}`}
// // //                   >
// // //                     {note}
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // // ─── Home Page ────────────────────────────────────────────────────────────────
// // // function Home() {
// // //   const { user } = useContext(AuthContext);
// // //   return (
// // //     <div className="text-center p-6">
// // //       <h1
// // //         className="text-5xl font-bold text-teal-500 font-arabic p-6"
// // //         dir="rtl"
// // //       >
// // //         السلام عليكم
// // //       </h1>
// // //       {user ? (
// // //         <h1 className="text-3xl font-bold text-teal-500 mb-4">
// // //           Welcome, {user.name || user.email}
// // //         </h1>
// // //       ) : (
// // //         <h1 className="text-3xl font-bold text-teal-500 mb-4">
// // //           Welcome to AyahArchive
// // //         </h1>
// // //       )}
// // //       <p className="text-lg text-gray-600 dark:text-gray-200 mb-8">
// // //         Memorize and Practice The QURA'N with ease.
// // //       </p>
// // //       <Link
// // //         to={user ? "/progress" : "/login"}
// // //         className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
// // //       >
// // //         Get Started
// // //       </Link>

// // //       {/* ── Prayer Times ── */}
// // //       <PrayerTimesSection />

// // //       {/* ── Feature Cards ── */}
// // //       <div className="mt-4 grid md:grid-cols-3 gap-8">
// // //         <Link
// // //           to="/progress"
// // //           className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
// // //         >
// // //           <h3 className="text-xl font-semibold text-teal-500">
// // //             Add to your Vault
// // //           </h3>
// // //           <p className="text-gray-600 dark:text-gray-300">
// // //             Save and organize your favorite Surahs.
// // //           </p>
// // //         </Link>
// // //         <Link
// // //           to="/chapters"
// // //           className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
// // //         >
// // //           <h3 className="text-xl font-semibold text-teal-500">
// // //             Read The QUR'AN
// // //           </h3>
// // //           <p className="text-gray-600 dark:text-gray-300">
// // //             Read any Surah and its verses.
// // //           </p>
// // //         </Link>
// // //         <Link
// // //           to="/dashboard"
// // //           className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
// // //         >
// // //           <h3 className="text-xl font-semibold text-teal-500">
// // //             Track Progress
// // //           </h3>
// // //           <p className="text-gray-600 dark:text-gray-300">
// // //             Monitor your memorization journey.
// // //           </p>
// // //         </Link>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Home;

// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { usePrayerTimes, fmt12 } from "../hooks/usePrayerTimes";

// function pad(n) {
//   return String(n).padStart(2, "0");
// }

// function PrayerSnapshot() {
//   const { prayers, location, loading, nextPrayer } = usePrayerTimes();

//   if (loading)
//     return (
//       <div className="mt-10 text-center text-gray-400 dark:text-gray-500 animate-pulse text-sm py-6">
//         Loading prayer times…
//       </div>
//     );
//   if (!prayers) return null;

//   const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

//   return (
//     <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
//       {/* Header row */}
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h2 className="text-lg font-bold text-teal-500">🕌 Prayer Times</h2>
//           {location && (
//             <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
//               📍 {location}
//             </p>
//           )}
//         </div>
//         <Link
//           to="/prayer-times"
//           className="text-xs text-teal-500 hover:text-teal-600 font-semibold border border-teal-300 dark:border-teal-600 rounded-lg px-3 py-1.5 transition-colors hover:bg-teal-50 dark:hover:bg-teal-900/20"
//         >
//           Full Schedule →
//         </Link>
//       </div>

//       {/* Countdown */}
//       {nextPrayer && (
//         <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-4 text-white flex items-center justify-between mb-5">
//           <div>
//             <p className="text-xs opacity-75 uppercase tracking-widest">Next</p>
//             <p className="text-xl font-bold">{nextPrayer.name}</p>
//             <p className="text-xs opacity-75">{fmt12(nextPrayer.time)}</p>
//           </div>
//           <div className="flex gap-2">
//             {[
//               { v: pad(nextPrayer.hrs), l: "h" },
//               { v: pad(nextPrayer.mins), l: "m" },
//               { v: pad(nextPrayer.secs), l: "s" },
//             ].map(({ v, l }) => (
//               <div
//                 key={l}
//                 className="bg-white/20 rounded-lg px-3 py-2 text-center min-w-[44px]"
//               >
//                 <div className="text-xl font-mono font-bold">{v}</div>
//                 <div className="text-xs opacity-70">{l}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* 5 prayers compact row */}
//       <div className="grid grid-cols-5 gap-2">
//         {order.map((name) => {
//           const isNext = nextPrayer?.name === name;
//           const icons = {
//             Fajr: "🌅",
//             Dhuhr: "☀️",
//             Asr: "🌤️",
//             Maghrib: "🌇",
//             Isha: "🌙",
//           };
//           return (
//             <div
//               key={name}
//               className={`rounded-xl p-2 text-center transition-all ${
//                 isNext
//                   ? "bg-teal-500 text-white shadow-md"
//                   : "bg-gray-50 dark:bg-gray-700"
//               }`}
//             >
//               <div className="text-lg mb-0.5">{icons[name]}</div>
//               <div
//                 className={`text-xs font-semibold mb-1 ${isNext ? "text-white" : "text-teal-600 dark:text-teal-400"}`}
//               >
//                 {name}
//               </div>
//               <div
//                 className={`text-xs font-mono font-bold ${isNext ? "text-white" : "text-gray-700 dark:text-gray-200"}`}
//               >
//                 {fmt12(prayers[name])}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Sahri & Iftar row */}
//       <div className="grid grid-cols-2 gap-3 mt-3">
//         {[
//           { key: "Sahri", label: "Sahri", icon: "🌙" },
//           { key: "Iftar", label: "Iftar", icon: "🍽️" },
//         ].map(({ key, label, icon }) => (
//           <div
//             key={key}
//             className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40 rounded-xl px-3 py-2"
//           >
//             <span className="text-xl">{icon}</span>
//             <div>
//               <div className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
//                 {label}
//               </div>
//               <div className="text-sm font-mono font-bold text-amber-700 dark:text-amber-300">
//                 {fmt12(prayers[key])}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function Home() {
//   const { user } = useContext(AuthContext);

//   return (
//     <div className="min-h-screen bg-gray-50  dark:bg-gray-900 transition-colors">
//       <div className="max-w-3xl mx-auto px-4 py-10 text-center">
//         {/* Greeting */}
//         <h1
//           className="text-5xl font-bold text-teal-500 font-arabic p-4"
//           dir="rtl"
//         >
//           السلام عليكم
//         </h1>

//         {user ? (
//           <h2 className="text-3xl font-bold text-teal-500 mb-3">
//             Welcome back, {user.name || user.email}
//           </h2>
//         ) : (
//           <h2 className="text-3xl font-bold text-teal-500 mb-3">
//             Welcome to AyahArchive
//           </h2>
//         )}

//         <p className="text-base text-gray-500 dark:text-gray-400 mb-7">
//           Memorize and Practice The QUR'AN with ease.
//         </p>

//         <Link
//           to={user ? "/progress" : "/login"}
//           className="inline-block bg-teal-500 text-white px-8 py-3 rounded-xl hover:bg-teal-600 transition-colors font-semibold shadow-md hover:shadow-lg"
//         >
//           Get Started
//         </Link>

//         {/* Prayer times snapshot */}
//         <PrayerSnapshot />

//         {/* Feature cards */}
//         <div className="mt-10 grid md:grid-cols-3 gap-5">
//           {[
//             {
//               to: user ? "/progress" : "/login",
//               title: "Add to your Vault",
//               desc: "Save and organize your favorite Surahs.",
//               icon: "📖",
//             },
//             {
//               to: "/chapters",
//               title: "Read The QUR'AN",
//               desc: "Read any Surah and its verses.",
//               icon: "🕌",
//             },
//             {
//               to: "/dashboard",
//               title: "Track Progress",
//               desc: "Monitor your memorization journey.",
//               icon: "📊",
//             },
//           ].map(({ to, title, desc, icon }) => (
//             <Link
//               key={to}
//               to={to}
//               className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 text-left"
//             >
//               <span className="text-3xl mb-3 block">{icon}</span>
//               <h3 className="text-base font-semibold text-teal-500 mb-1">
//                 {title}
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;




import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { usePrayerTimes, fmt12 } from "../hooks/usePrayerTimes";

function pad(n) { return String(n).padStart(2, "0"); }

function PrayerSnapshot() {
  const { prayers, location, loading, nextPrayer } = usePrayerTimes();

  if (loading) return (
    <div className="mt-10 text-center text-white/40 animate-pulse text-sm py-6">
      Loading prayer times…
    </div>
  );
  if (!prayers) return null;

  const order = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const icons  = { Fajr: "🌅", Dhuhr: "☀️", Asr: "🌤️", Maghrib: "🌇", Isha: "🌙" };

  return (
    <div className="mt-10 rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-white">🕌 Prayer Times</h2>
          {location && <p className="text-xs text-white/45 mt-0.5">📍 {location}</p>}
        </div>
        <Link
          to="/prayer-times"
          className="text-xs font-semibold text-teal-300 border border-teal-400/40 rounded-lg px-3 py-1.5 hover:bg-teal-400/10 transition-colors"
        >
          Full Schedule →
        </Link>
      </div>

      {/* Countdown */}
      {nextPrayer && (
        <div className="bg-teal-500/20 border border-teal-400/30 rounded-xl p-4 flex items-center justify-between mb-5 backdrop-blur-sm">
          <div>
            <p className="text-[10px] text-teal-300/80 uppercase tracking-widest font-bold">Next Prayer</p>
            <p className="text-2xl font-bold text-white">{nextPrayer.name}</p>
            <p className="text-xs text-white/50">{fmt12(nextPrayer.time)}</p>
          </div>
          <div className="flex gap-2">
            {[{ v: pad(nextPrayer.hrs), l: "h" }, { v: pad(nextPrayer.mins), l: "m" }, { v: pad(nextPrayer.secs), l: "s" }].map(({ v, l }) => (
              <div key={l} className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-center min-w-[44px]">
                <div className="text-xl font-mono font-bold text-white">{v}</div>
                <div className="text-[10px] text-white/50">{l}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5 prayer tiles */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        {order.map((name) => {
          const isNext = nextPrayer?.name === name;
          return (
            <div
              key={name}
              className={`rounded-xl p-2 text-center transition-all border ${
                isNext
                  ? "bg-teal-500/30 border-teal-400/50 scale-105 shadow-lg shadow-teal-900/30"
                  : "bg-white/6 border-white/10 hover:bg-white/10"
              }`}
            >
              <div className="text-lg mb-0.5">{icons[name]}</div>
              <div className={`text-[11px] font-bold mb-1 ${isNext ? "text-teal-300" : "text-white/60"}`}>{name}</div>
              <div className={`text-[11px] font-mono font-bold ${isNext ? "text-white" : "text-white/80"}`}>
                {fmt12(prayers[name])}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sahri & Iftar */}
      <div className="grid grid-cols-2 gap-2">
        {[{ key: "Sahri", label: "Sahri", icon: "🌙" }, { key: "Iftar", label: "Iftar", icon: "🍽️" }].map(({ key, label, icon }) => (
          <div key={key} className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-xl px-3 py-2">
            <span className="text-lg">{icon}</span>
            <div>
              <div className="text-[10px] text-amber-300/80 font-bold uppercase tracking-wider">{label}</div>
              <div className="text-sm font-mono font-bold text-amber-200">{fmt12(prayers[key])}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">

        {/* Hero */}
        <div className="mb-3">
          <h1 className="text-6xl font-bold font-arabic text-white drop-shadow-lg mb-4" dir="rtl">
            السلام عليكم
          </h1>
          <h2 className="text-2xl font-bold text-white/90 mb-3">
            {user ? `Welcome back, ${user.name || user.email?.split("@")[0]}` : "Welcome to AyahArchive"}
          </h2>
          <p className="text-base text-white/55 mb-8">
            Memorize and Practice The QUR'AN with ease.
          </p>
          {/* <Link
            to={user ? "/progress" : "/login"}
            className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-teal-900/40 hover:shadow-teal-900/60 hover:-translate-y-0.5"
          >
            Get Started
          </Link> */}
        </div>

        {/* Prayer snapshot */}
        <PrayerSnapshot />

        {/* Feature cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { to: "/progress",  title: "My Vault",      desc: "Save and organize your favorite Surahs.", icon: "📖" },
            { to: "/chapters",  title: "Read The Qur'an", desc: "Read any Surah and its verses.",         icon: "🕌" },
            { to: "/dashboard", title: "Track Progress", desc: "Monitor your memorization journey.",      icon: "📊" },
          ].map(({ to, title, desc, icon }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md p-5 text-left hover:bg-white/13 hover:-translate-y-1 hover:border-white/20 transition-all duration-200"
            >
              <span className="text-3xl mb-3 block">{icon}</span>
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-teal-300 transition-colors">{title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;