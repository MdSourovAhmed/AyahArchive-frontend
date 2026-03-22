// // import { useMemo } from 'react';

// // // Utility function to parse verseRange (e.g., "1-3" → [1, 2, 3], "1,3,5" → [1, 3, 5])
// // const parseVerseRange = (verseRange) => {
// //   if (!verseRange) return [];
// //   if (verseRange.includes('-')) {
// //     const [start, end] = verseRange.split('-').map(Number);
// //     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
// //   }
// //   return verseRange.split(',').map(Number).filter((n) => !isNaN(n));
// // };

// // function VerseCard({ verse, onEdit, onDelete }) {
// //   // Parse verse numbers and text using useMemo for performance
// //   const verses = useMemo(() => {
// //     const verseNumbers = parseVerseRange(verse.verseRange);
// //     const verseTexts = verse.text.split('\n').map((text) => text.trim()).filter((text) => text);
// //     return verseNumbers.map((number, index) => {
// //       const [original, translation = 'No translation provided'] = verseTexts[index]?.split('|') || ['Text missing'];
// //       return { number, original, translation };
// //     });
// //   }, [verse.verseRange, verse.text]);

// //   return (
// //     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
// //       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
// //         {verse.book} {verse.chapter}:{verse.verseRange}
// //       </h3>
// //       <div className="divide-y divide-gray-200 dark:divide-gray-600">
// //         {verses.map((v) => (
// //           <div key={v.number} className="py-2">
// //             <p className="text-sm font-medium text-teal-500">
// //               Verse {v.number}:
// //             </p>
// //             <p className="text-2xl font-bold text-gray-600 dark:text-gray-200 ml-4">
// //               {v.original}
// //             </p>
// //             <p className="text-base text-gray-700 dark:text-gray-300 ml-4">
// //               {v.translation}
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //       <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
// //         Theme: {verse.theme.join(', ') || 'None'} | Status: {verse.status}
// //       </p>
// //       <div className="flex gap-2 mt-4">
// //         <button
// //           onClick={() => onEdit(verse)}
// //           className="text-teal-500 hover:text-teal-600"
// //         >
// //           Edit
// //         </button>
// //         <button
// //           onClick={() => onDelete(verse._id)}
// //           className="text-red-500 hover:text-red-600"
// //         >
// //           Delete
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default VerseCard;

// // import { useState, useEffect } from "react";
// // import api from "../utils/api";

// // function VerseCard({
// //   verse,
// //   isQuranVerse = false,
// //   isFullScreen = false,
// //   onCollapse,
// //   onEdit,
// //   onDelete,
// // }) {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editVerseRange, setEditVerseRange] = useState(verse.verseRange || "");
// //   const [editStatus, setEditStatus] = useState(verse.status || "in-progress");
// //   const [verseTexts, setVerseTexts] = useState([]);

// //   useEffect(() => {
// //     if (isQuranVerse && isFullScreen) {
// //       const query = verse.verseRange
// //         ? `${verse.surahId.surahNumber}:${verse.verseRange}`
// //         : `${verse.surahId.surahNumber}:${verse.verseNumber}`;
// //       api
// //         .get(`/quran/search?query=${encodeURIComponent(query)}`)
// //         .then((res) => setVerseTexts(res.data.verses || [res.data]))
// //         .catch((err) => console.error("Error fetching verse texts:", err));
// //     } else {
// //       setVerseTexts([]); // Clear texts when not expanded
// //     }
// //   }, [verse, isQuranVerse, isFullScreen]);

// //   const handleEditSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await onEdit(verse._id, {
// //         surahNumber: verse.surahId.surahNumber,
// //         surahName: verse.surahId.surahNameEnglish,
// //         verseRange: editVerseRange,
// //         status: editStatus,
// //       });
// //       setIsEditing(false);
// //     } catch (err) {
// //       console.error(
// //         "Error submitting edit:",
// //         err.response?.data?.message || err.message,
// //       );
// //       alert(
// //         `Failed to edit verse range: ${
// //           err.response?.data?.message || "Unknown error"
// //         }`,
// //       );
// //     }
// //   };

// //   return (
// //     <div
// //       className={`bg-white dark:bg-gray-800 p-4 cursor-pointer rounded-lg shadow-md transition-all ${
// //         isFullScreen ? "max-w-4xl mx-auto" : ""
// //       }`}
// //     >
// //       {isEditing ? (
// //         <form onSubmit={handleEditSubmit} className="space-y-2">
// //           <div>
// //             <label className="block text-gray-700 dark:text-gray-300">
// //               Verse Range (e.g., 1-5)
// //             </label>
// //             <input
// //               type="text"
// //               value={editVerseRange}
// //               onChange={(e) => setEditVerseRange(e.target.value)}
// //               className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
// //               placeholder="e.g., 1-5"
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-gray-700 dark:text-gray-300">
// //               Status
// //             </label>
// //             <select
// //               value={editStatus}
// //               onChange={(e) => setEditStatus(e.target.value)}
// //               className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
// //             >
// //               <option value="in-progress">In Progress</option>
// //               <option value="memorized">Memorized</option>
// //             </select>
// //           </div>
// //           <div className="flex gap-2">
// //             <button
// //               type="submit"
// //               className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
// //             >
// //               Save
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => setIsEditing(false)}
// //               className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       ) : (
// //         <>
// //           <div className="flex justify-between items-center">
// //             <div>
// //               <h3 className="text-lg font-semibold dark:text-gray-300">
// //                 {isQuranVerse
// //                   ? `${verse.surahId?.surahNameArabic || "Surah"} (${
// //                       verse.surahId?.surahNameEnglish || verse.surahNumber
// //                     })`
// //                   : `${verse.book} ${verse.chapter}`}
// //               </h3>
// //               {isQuranVerse && (
// //                 <p className="text-gray-600 dark:text-gray-300">
// //                   Total Verses: {verse.surahId?.totalVerses || "Unknown"},
// //                   Range: {verse.verseRange}
// //                 </p>
// //               )}
// //               {!isQuranVerse && (
// //                 <>
// //                   <p className="text-gray-600 dark:text-gray-300">
// //                     Range: {verse.verseRange}
// //                   </p>
// //                   <p className="text-gray-500 dark:text-gray-400">
// //                     Status: {verse.status}
// //                   </p>
// //                   <p className="text-gray-500 dark:text-gray-400">
// //                     Themes: {verse.theme?.join(", ") || "None"}
// //                   </p>
// //                 </>
// //               )}
// //             </div>
// //             {isQuranVerse && !isFullScreen && (
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => setIsEditing(true)}
// //                   className="text-blue-500 hover:text-blue-600"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => onDelete(verse._id)}
// //                   className="text-red-500 hover:text-red-600"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //           {isQuranVerse && isFullScreen && (
// //             <>
// //               <button
// //                 onClick={onCollapse}
// //                 className="mt-2 text-teal-500 hover:text-teal-600"
// //               >
// //                 Collapse
// //               </button>
// //               <div className="mt-4 space-y-4">
// //                 {verseTexts.length === 0 ? (
// //                   <p className="text-gray-600 dark:text-gray-300">
// //                     Loading verses...
// //                   </p>
// //                 ) : (
// //                   verseTexts.map((v, index) => (
// //                     <div
// //                       key={v._id}
// //                       className={`py-2 ${
// //                         index < verseTexts.length - 1
// //                           ? "border-b border-gray-200 dark:border-gray-600"
// //                           : ""
// //                       }`}
// //                     >
// //                       <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
// //                         Verse {v.verseNumber}:
// //                       </p>
// //                       <p className="text-right font-arabic text-lg dark:text-gray-300">
// //                         {v.arabicText}
// //                       </p>
// //                       <p className="text-gray-600 dark:text-gray-300">
// //                         {v.englishTranslation}
// //                       </p>
// //                     </div>
// //                   ))
// //                 )}
// //               </div>
// //             </>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // export default VerseCard;






// import { useState } from "react";
// import api from "../utils/api";

// function VerseCard({
//   verse,
//   isQuranVerse = false,
//   isFullScreen = false,
//   onCollapse,
//   onEdit,
//   onDelete,
// }) {
//   const [isEditing, setIsEditing]       = useState(false);
//   const [editVerseRange, setEditVerseRange] = useState(verse.verseRange || "");
//   const [editStatus, setEditStatus]     = useState(verse.status || "in-progress");

//   // ── Resolve verses from the surahId object (already contains full verse array
//   //    from Quran.json) — no API call needed. ──────────────────────────────────
//   const getVerses = () => {
//     const allVerses = verse.surahId?.verses ?? [];
//     if (!verse.verseRange || !allVerses.length) return allVerses;

//     // Parse "start-end" range, e.g. "2-5"
//     const [startStr, endStr] = verse.verseRange.split("-");
//     const start = parseInt(startStr, 10);
//     const end   = endStr ? parseInt(endStr, 10) : start;

//     if (isNaN(start)) return allVerses;
//     return allVerses.filter((v) => v.verse >= start && v.verse <= end);
//   };

//   const verseTexts = isQuranVerse && isFullScreen ? getVerses() : [];

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await onEdit(verse._id, {
//         surahNumber:  verse.surahId.surahNumber,
//         surahName:    verse.surahId.surahNameEnglish,
//         verseRange:   editVerseRange,
//         status:       editStatus,
//       });
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Error submitting edit:", err.response?.data?.message || err.message);
//       alert(`Failed to edit verse range: ${err.response?.data?.message || "Unknown error"}`);
//     }
//   };

//   return (
//     <div
//       className={`bg-white dark:bg-gray-800 p-4 cursor-pointer rounded-lg shadow-md transition-all ${
//         isFullScreen ? "max-w-4xl mx-auto" : ""
//       }`}
//     >
//       {isEditing ? (
//         <form onSubmit={handleEditSubmit} className="space-y-2">
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300">
//               Verse Range (e.g., 1-5)
//             </label>
//             <input
//               type="text"
//               value={editVerseRange}
//               onChange={(e) => setEditVerseRange(e.target.value)}
//               className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
//               placeholder="e.g., 1-5"
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300">Status</label>
//             <select
//               value={editStatus}
//               onChange={(e) => setEditStatus(e.target.value)}
//               className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
//             >
//               <option value="in-progress">In Progress</option>
//               <option value="memorized">Memorized</option>
//             </select>
//           </div>
//           <div className="flex gap-2">
//             <button type="submit" className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600">
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsEditing(false)}
//               className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       ) : (
//         <>
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="text-lg font-semibold dark:text-gray-300">
//                 {isQuranVerse
//                   ? `${verse.surahId?.surahNameArabic || "Surah"} (${
//                       verse.surahId?.surahNameEnglish || verse.surahNumber
//                     })`
//                   : `${verse.book} ${verse.chapter}`}
//               </h3>
//               {isQuranVerse && (
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Total Verses: {verse.surahId?.totalVerses || "Unknown"} | Range: {verse.verseRange}
//                 </p>
//               )}
//               {!isQuranVerse && (
//                 <>
//                   <p className="text-gray-600 dark:text-gray-300">Range: {verse.verseRange}</p>
//                   <p className="text-gray-500 dark:text-gray-400">Status: {verse.status}</p>
//                   <p className="text-gray-500 dark:text-gray-400">
//                     Themes: {verse.theme?.join(", ") || "None"}
//                   </p>
//                 </>
//               )}
//             </div>
//             {isQuranVerse && !isFullScreen && (
//               <div className="flex gap-2">
//                 <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-600">
//                   Edit
//                 </button>
//                 <button onClick={() => onDelete(verse._id)} className="text-red-500 hover:text-red-600">
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>

//           {isQuranVerse && isFullScreen && (
//             <>
//               <button onClick={onCollapse} className="mt-2 text-teal-500 hover:text-teal-600">
//                 Collapse
//               </button>
//               <div className="mt-4 space-y-4">
//                 {verseTexts.length === 0 ? (
//                   <p className="text-gray-500 dark:text-gray-400 text-sm">No verses found.</p>
//                 ) : (
//                   verseTexts.map((v, index) => (
//                     <div
//                       key={v.verse}
//                       className={`py-2 ${
//                         index < verseTexts.length - 1
//                           ? "border-b border-gray-200 dark:border-gray-600"
//                           : ""
//                       }`}
//                     >
//                       <p className="text-sm font-semibold text-teal-500 mb-1">
//                         Verse {v.verse}
//                       </p>
//                       <p className="text-right font-arabic text-xl leading-loose dark:text-gray-200 mb-1">
//                         {v.arabic_text}
//                       </p>
//                       <p className="text-gray-600 dark:text-gray-300 text-sm">
//                         {v.english_translation}
//                       </p>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default VerseCard;



import { useState } from "react";
import api from "../utils/api";

function VerseCard({
  verse,
  isQuranVerse = false,
  isFullScreen = false,
  onCollapse,
  onEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing]           = useState(false);
  const [editVerseRange, setEditVerseRange] = useState(verse.verseRange || "");
  const [editStatus, setEditStatus]         = useState(verse.status || "in-progress");

  const getVerses = () => {
    const allVerses = verse.surahId?.verses ?? [];
    if (!verse.verseRange || !allVerses.length) return allVerses;
    const [startStr, endStr] = verse.verseRange.split("-");
    const start = parseInt(startStr, 10);
    const end   = endStr ? parseInt(endStr, 10) : start;
    if (isNaN(start)) return allVerses;
    return allVerses.filter((v) => v.verse >= start && v.verse <= end);
  };

  const verseTexts = isQuranVerse && isFullScreen ? getVerses() : [];

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await onEdit(verse._id, {
        surahNumber: verse.surahId.surahNumber,
        surahName:   verse.surahId.surahNameEnglish,
        verseRange:  editVerseRange,
        status:      editStatus,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Edit error:", err.response?.data?.message || err.message);
      alert(`Failed to edit: ${err.response?.data?.message || "Unknown error"}`);
    }
  };

  // ── Edit form ──────────────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md p-5">
        <h4 className="text-sm font-bold text-white mb-4">Edit Entry</h4>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-white/60 mb-1.5 font-medium uppercase tracking-wider">
              Verse Range (e.g. 1-5)
            </label>
            <input
              type="text"
              value={editVerseRange}
              onChange={(e) => setEditVerseRange(e.target.value)}
              placeholder="e.g. 1-5"
              className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/60 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1.5 font-medium uppercase tracking-wider">
              Status
            </label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all text-sm"
            >
              <option value="in-progress" className="bg-gray-900">In Progress</option>
              <option value="memorized"   className="bg-gray-900">Memorized</option>
            </select>
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" className="bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
              Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-white/10 hover:bg-white/18 text-white/80 text-sm font-medium px-4 py-2 rounded-xl border border-white/15 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ── Full screen (chapter reader) ───────────────────────────────────────────
  if (isQuranVerse && isFullScreen) {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/8 backdrop-blur-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {verse.surahId?.surahNameEnglish}
            </h2>
            <p className="text-2xl font-arabic text-white/70 mt-0.5" dir="rtl">
              {verse.surahId?.surahNameArabic}
            </p>
            <p className="text-xs text-white/40 mt-1">
              {verse.surahId?.totalVerses} verses · {verse.surahId?.revelationType}
            </p>
          </div>
          <button
            onClick={onCollapse}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white/70 hover:text-white transition-all text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Bismillah */}
        {verse.surahId?.surahNumber !== 9 && (
          <div className="text-center py-5 border-b border-white/8">
            <p className="font-arabic text-2xl text-white/80 leading-loose">
              بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
            </p>
          </div>
        )}

        {/* Verses */}
        <div className="px-6 py-4 space-y-0">
          {verseTexts.length === 0 ? (
            <p className="text-white/40 text-sm py-8 text-center">No verses found.</p>
          ) : (
            verseTexts.map((v, index) => (
              <div
                key={v.verse}
                className={`py-5 ${index < verseTexts.length - 1 ? "border-b border-white/8" : ""}`}
              >
                {/* Verse number bubble */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-teal-300">{v.verse}</span>
                  </div>
                </div>
                {/* Arabic */}
                <p className="text-right font-arabic text-2xl text-white/90 leading-loose mb-3" dir="rtl">
                  {v.arabic_text}
                </p>
                {/* Translation */}
                <p className="text-white/55 text-sm leading-relaxed">
                  {v.english_translation}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // ── Compact card (vault / progress list) ──────────────────────────────────
  return (
    <div className="rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md p-4 transition-all hover:bg-white/10">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white truncate">
            {isQuranVerse
              ? `${verse.surahId?.surahNameArabic || "Surah"} · ${verse.surahId?.surahNameEnglish || verse.surahNumber}`
              : `${verse.book} ${verse.chapter}`}
          </h3>
          {isQuranVerse ? (
            <p className="text-xs text-white/45 mt-1">
              {verse.surahId?.totalVerses} verses · Range: {verse.verseRange}
            </p>
          ) : (
            <div className="mt-1 space-y-0.5">
              <p className="text-xs text-white/45">Range: {verse.verseRange}</p>
              <p className="text-xs text-white/45">Themes: {verse.theme?.join(", ") || "None"}</p>
            </div>
          )}

          {/* Status badge */}
          {!isQuranVerse && (
            <span className={`inline-flex mt-2 items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              verse.status === "memorized"
                ? "bg-teal-400/15 border-teal-400/30 text-teal-300"
                : "bg-amber-400/15 border-amber-400/30 text-amber-300"
            }`}>
              {verse.status === "memorized" ? "✓ Memorized" : "⋯ In Progress"}
            </span>
          )}
        </div>

        {/* Actions */}
        {isQuranVerse && !isFullScreen && onEdit && onDelete && (
          <div className="flex gap-1 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-400/15 border border-blue-400/25 text-blue-300 hover:bg-blue-400/25 transition-colors text-xs font-bold"
            >
              ✎
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(verse._id); }}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-400/15 border border-red-400/25 text-red-300 hover:bg-red-400/25 transition-colors text-xs"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerseCard;