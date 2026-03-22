// import { Link } from "react-router-dom";

// const YEAR = new Date().getFullYear();

// function Footer() {
//   return (
//     <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-auto transition-colors">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

//           {/* Brand */}
//           <div>
//             <Link to="/" className="flex items-center gap-2 mb-3 w-fit group">
//               <span className="text-2xl group-hover:scale-110 transition-transform duration-200">☪️</span>
//               <span className="text-lg font-bold text-teal-500">AyahArchive</span>
//             </Link>
//             <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
//               Memorize and practice the Qur'an with ease. Track your progress, one ayah at a time.
//             </p>
//           </div>

//           {/* Navigation */}
//           <div>
//             <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
//               Navigate
//             </h4>
//             <ul className="space-y-2">
//               {[
//                 { to: "/",             label: "Home" },
//                 { to: "/chapters",     label: "Read the Qur'an" },
//                 { to: "/prayer-times", label: "Prayer Times" },
//                 { to: "/progress",     label: "My Vault" },
//                 { to: "/dashboard",    label: "Dashboard" },
//               ].map(({ to, label }) => (
//                 <li key={to}>
//                   <Link
//                     to={to}
//                     className="text-sm text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Dua / reminder */}
//           <div className="sm:text-right">
//             <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
//               Daily Reminder
//             </h4>
//             <p className="text-xl font-arabic text-gray-700 dark:text-gray-300 mb-1 leading-relaxed" dir="rtl">
//               وَلَقَدۡ يَسَّرۡنَا ٱلۡقُرۡءَانَ لِلذِّكۡرِ
//             </p>
//             <p className="text-xs text-gray-400 dark:text-gray-500 italic">
//               "And We have certainly made the Qur'an easy for remembrance."
//               <span className="block not-italic mt-0.5">— Al-Qamar 54:17</span>
//             </p>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 dark:text-gray-500">
//           <span>© {YEAR} AyahArchive. Built with sincerity.</span>
//           <span className="flex items-center gap-1">
//             Prayer times via{" "}
//             <a
//               href="https://aladhan.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-teal-500 hover:underline"
//             >
//               Aladhan API
//             </a>
//           </span>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;

import { Link } from "react-router-dom";
import LOGO from "./../assets/AYAHARCHIVE.png";

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-xl mt-auto transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3 w-fit group">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                {" "}
                <img src={LOGO} className="w-20 h-20" />{" "}
              </span>
              <span className="text-lg font-bold text-white">AyahArchive</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              Memorize and practice the Qur'an with ease. Track your progress,
              one ayah at a time.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">
              Navigate
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/chapters", label: "Read the Qur'an" },
                { to: "/prayer-times", label: "Prayer Times" },
                { to: "/progress", label: "My Vault" },
                { to: "/dashboard", label: "Dashboard" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quranic reminder */}
          <div className="sm:text-right">
            <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">
              Daily Reminder
            </h4>
            <p
              className="text-xl font-arabic text-white/80 mb-1 leading-relaxed"
              dir="rtl"
            >
              وَلَقَدۡ يَسَّرۡنَا ٱلۡقُرۡءَانَ لِلذِّكۡرِ
            </p>
            <p className="text-xs text-white/40 italic">
              "And We have certainly made the Qur'an easy for remembrance."
              <span className="block not-italic mt-0.5 text-white/30">
                — Al-Qamar 54:17
              </span>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© {YEAR} AyahArchive. Built with sincerity.</span>
          <span>
            Prayer times via{" "}
            <a
              href="https://aladhan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-400 hover:text-teal-300 transition-colors"
            >
              Aladhan API
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
