// // // import { useState } from 'react';
// // // import VerseCard from './VerseCard';

// // // function ChapterList({ chapters, surah, verses, isSearchResult = false }) {
// // //   const [selectedSurah, setSelectedSurah] = useState(null);

// // //   const handleSurahClick = (surahData) => {
// // //     if (selectedSurah?._id === surahData._id) {
// // //       setSelectedSurah(null);
// // //     } else {
// // //       setSelectedSurah(surahData);
// // //     }
// // //   };

// // //   const handleOutsideClick = (e) => {
// // //     if (e.target.classList.contains('overlay')) {
// // //       setSelectedSurah(null);
// // //     }
// // //   };

// // //   const renderSurahCard = (surahData) => (
// // //     <div
// // //       key={surahData._id}
// // //       className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer ${
// // //         selectedSurah?._id === surahData._id ? 'bg-gray-100 fixed inset-0 z-50 overflow-auto p-4' : ''
// // //       }`}
// // //       onClick={(e) => {
// // //         e.stopPropagation(); // Prevent click from bubbling to overlay
// // //         handleSurahClick(surahData);
// // //       }}
// // //     >
// // //       <h3 className="text-lg font-semibold dark:text-gray-300">
// // //         {surahData.surahNameArabic} ({surahData.surahNameEnglish}, {surahData.surahNumber})
// // //       </h3>
// // //       <p className="text-gray-600 dark:text-gray-300">
// // //         Revelation: {surahData.revelationType.charAt(0).toUpperCase() + surahData.revelationType.slice(1)} | Verses: {surahData.totalVerses}
// // //       </p>
// // //       {selectedSurah?._id === surahData._id && (
// // //         <div className="mt-4">
// // //           <VerseCard
// // //             verse={{ surahId: surahData, verseRange: `1-${surahData.totalVerses}` }}
// // //             isQuranVerse={true}
// // //             isFullScreen={true}
// // //             onCollapse={() => setSelectedSurah(null)}
// // //           />
// // //         </div>
// // //       )}
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="grid md:grid-cols-2 gap-4 pt-4 relative">
// // //       {isSearchResult ? (
// // //         renderSurahCard(surah)
// // //       ) : chapters.length === 0 ? (
// // //         <p className="text-gray-600 dark:text-gray-300">No chapters available.</p>
// // //       ) : (
// // //         chapters.map(renderSurahCard)
// // //       )}
// // //       {selectedSurah && (
// // //         <div
// // //           className="fixed inset-0 bg-black bg-opacity-50 z-40 overlay"
// // //           onClick={handleOutsideClick}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default ChapterList;




// // // import { useState } from 'react';
// // // import VerseCard from './VerseCard';

// // // function ChapterList({ chapters = [], surah, verses, isSearchResult = false }) {
// // //   const [selectedSurah, setSelectedSurah] = useState(null);

// // //   const handleSurahClick = (surahData) => {
// // //     setSelectedSurah((prev) => (prev?._id === surahData._id ? null : surahData));
// // //   };

// // //   const handleOverlayClick = (e) => {
// // //     if (e.target.classList.contains('overlay')) setSelectedSurah(null);
// // //   };

// // //   const renderSurahCard = (surahData) => {
// // //     const isOpen = selectedSurah?._id === surahData._id;
// // //     return (
// // //       <div
// // //         key={surahData._id}
// // //         className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer ${
// // //           isOpen ? 'bg-gray-100 fixed inset-0 z-50 overflow-auto p-4' : ''
// // //         }`}
// // //         onClick={(e) => {
// // //           e.stopPropagation();
// // //           handleSurahClick(surahData);
// // //         }}
// // //       >
// // //         <h3 className="text-lg font-semibold dark:text-gray-300">
// // //           {surahData.surahNameArabic} ({surahData.surahNameEnglish}, {surahData.surahNumber})
// // //         </h3>
// // //         <p className="text-gray-600 dark:text-gray-300">
// // //           Revelation:{' '}
// // //           {surahData.revelationType.charAt(0).toUpperCase() + surahData.revelationType.slice(1)}{' '}
// // //           | Verses: {surahData.totalVerses}
// // //         </p>
// // //         {isOpen && (
// // //           <div className="mt-4">
// // //             <VerseCard
// // //               verse={{ surahId: surahData, verseRange: `1-${surahData.totalVerses}` }}
// // //               isQuranVerse={true}
// // //               isFullScreen={true}
// // //               onCollapse={() => setSelectedSurah(null)}
// // //             />
// // //           </div>
// // //         )}
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="grid md:grid-cols-2 gap-4 pt-4 relative">
// // //       {isSearchResult ? (
// // //         renderSurahCard(surah)
// // //       ) : chapters.length === 0 ? (
// // //         <p className="text-gray-600 dark:text-gray-300 col-span-2">No chapters found.</p>
// // //       ) : (
// // //         chapters.map(renderSurahCard)
// // //       )}
// // //       {selectedSurah && (
// // //         <div
// // //           className="fixed inset-0 bg-black bg-opacity-50 z-40 overlay"
// // //           onClick={handleOverlayClick}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default ChapterList;



// // import { useState } from 'react';
// // import VerseCard from './VerseCard';

// // function ChapterList({ chapters = [], surah, verses, isSearchResult = false }) {
// //   const [selectedSurah, setSelectedSurah] = useState(null);

// //   const handleSurahClick = (surahData) => {
// //     setSelectedSurah((prev) => (prev?._id === surahData._id ? null : surahData));
// //   };

// //   const handleOverlayClick = (e) => {
// //     if (e.target.classList.contains('overlay')) setSelectedSurah(null);
// //   };

// //   const renderSurahCard = (surahData) => {
// //     if (!surahData) return null;
// //     const isOpen = selectedSurah?._id === surahData._id;

// //     // Safe capitalise — guards against undefined/empty revelationType
// //     const revType = surahData.revelationType || '';
// //     const revLabel = revType ? revType.charAt(0).toUpperCase() + revType.slice(1) : '—';

// //     return (
// //       <div
// //         key={surahData._id}
// //         className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer ${
// //           isOpen ? 'fixed inset-0 z-50 overflow-auto p-4 bg-white dark:bg-gray-800' : ''
// //         }`}
// //         onClick={(e) => {
// //           e.stopPropagation();
// //           handleSurahClick(surahData);
// //         }}
// //       >
// //         <h3 className="text-lg font-semibold dark:text-gray-300">
// //           {surahData.surahNameArabic} ({surahData.surahNameEnglish}, {surahData.surahNumber})
// //         </h3>
// //         <p className="text-gray-600 dark:text-gray-300">
// //           Revelation: {revLabel} | Verses: {surahData.totalVerses ?? '—'}
// //         </p>
// //         {isOpen && (
// //           <div className="mt-4">
// //             <VerseCard
// //               verse={{ surahId: surahData, verseRange: `1-${surahData.totalVerses}` }}
// //               isQuranVerse={true}
// //               isFullScreen={true}
// //               onCollapse={() => setSelectedSurah(null)}
// //             />
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="grid md:grid-cols-2 gap-4 pt-4 relative">
// //       {isSearchResult ? (
// //         renderSurahCard(surah)
// //       ) : chapters.length === 0 ? (
// //         <p className="text-gray-600 dark:text-gray-300 col-span-2">No chapters found.</p>
// //       ) : (
// //         chapters.map(renderSurahCard)
// //       )}
// //       {selectedSurah && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-40 overlay"
// //           onClick={handleOverlayClick}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // export default ChapterList;












// import { useState } from 'react';
// import VerseCard from './VerseCard';

// function ChapterList({ chapters = [], surah, isSearchResult = false }) {
//   const [selectedSurah, setSelectedSurah] = useState(null);

//   const handleSurahClick = (surahData) => {
//     setSelectedSurah((prev) => (prev?._id === surahData._id ? null : surahData));
//   };

//   const handleOverlayClick = (e) => {
//     if (e.target.classList.contains('overlay')) setSelectedSurah(null);
//   };

//   const renderSurahCard = (surahData) => {
//     if (!surahData) return null;
//     const isOpen   = selectedSurah?._id === surahData._id;
//     const revType  = surahData.revelationType || '';
//     const revLabel = revType ? revType.charAt(0).toUpperCase() + revType.slice(1) : '—';
//     const isMeccan = revLabel === 'Meccan';

//     return (
//       <div
//         key={surahData._id}
//         onClick={(e) => { e.stopPropagation(); handleSurahClick(surahData); }}
//         className={`
//           group relative rounded-2xl border backdrop-blur-md cursor-pointer transition-all duration-200
//           ${isOpen
//             ? 'fixed inset-0 z-50 overflow-auto rounded-none border-0 bg-black/70 backdrop-blur-xl p-4'
//             : 'border-white/12 bg-white/7 hover:bg-white/12 hover:border-white/22 hover:-translate-y-0.5'
//           }
//         `}
//       >
//         {/* Collapsed card */}
//         {!isOpen && (
//           <div className="p-4">
//             {/* Top row: number badge + Arabic name */}
//             <div className="flex items-start justify-between gap-3 mb-2">
//               <div className="flex items-center gap-3">
//                 {/* Surah number badge */}
//                 <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
//                   <span className="text-xs font-bold text-teal-300">{surahData.surahNumber}</span>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-bold text-white leading-tight group-hover:text-teal-300 transition-colors">
//                     {surahData.surahNameEnglish}
//                   </h3>
//                   <p className="text-xs text-white/45 mt-0.5">{surahData.surahNameArabic}</p>
//                 </div>
//               </div>
//               {/* Revelation badge */}
//               <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
//                 isMeccan
//                   ? 'bg-amber-400/15 border-amber-400/25 text-amber-300'
//                   : 'bg-teal-400/15 border-teal-400/25 text-teal-300'
//               }`}>
//                 {revLabel}
//               </span>
//             </div>

//             {/* Bottom row: verse count + expand hint */}
//             <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
//               <span className="text-xs text-white/40">
//                 {surahData.totalVerses} verses
//               </span>
//               <span className="text-xs text-white/30 group-hover:text-teal-400 transition-colors">
//                 Read →
//               </span>
//             </div>
//           </div>
//         )}

//         {/* Expanded fullscreen view */}
//         {isOpen && (
//           <div className="max-w-3xl mx-auto py-6 px-4">
//             <VerseCard
//               verse={{ surahId: surahData, verseRange: `1-${surahData.totalVerses}` }}
//               isQuranVerse={true}
//               isFullScreen={true}
//               onCollapse={() => setSelectedSurah(null)}
//             />
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="relative">
//       {isSearchResult ? (
//         <div className="grid md:grid-cols-2 gap-3 pt-4">
//           {renderSurahCard(surah)}
//         </div>
//       ) : chapters.length === 0 ? (
//         <p className="text-white/50 text-sm py-8 text-center">No chapters found.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-4">
//           {chapters.map(renderSurahCard)}
//         </div>
//       )}

//       {/* Overlay */}
//       {selectedSurah && (
//         <div
//           className="fixed inset-0 z-40 overlay"
//           onClick={handleOverlayClick}
//         />
//       )}
//     </div>
//   );
// }

// export default ChapterList;



import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import VerseCard from './VerseCard';

// ── Fullscreen reader modal rendered via portal into document.body ────────────
function ReaderModal({ surahData, onClose }) {
  const overlayRef  = useRef(null);
  const contentRef  = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Close when clicking the backdrop (outside the card)
  const handleOverlayClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
    >
      {/* Nudge content down a bit, allow scroll on tall surahs */}
      <div
        ref={contentRef}
        className="w-full max-w-3xl mx-4 my-10"
        // stop clicks inside the card from bubbling to the overlay
        onClick={(e) => e.stopPropagation()}
      >
        <VerseCard
          verse={{ surahId: surahData, verseRange: `1-${surahData.totalVerses}` }}
          isQuranVerse={true}
          isFullScreen={true}
          onCollapse={onClose}
        />
      </div>
    </div>,
    document.body
  );
}

// ── Chapter grid card ─────────────────────────────────────────────────────────
function SurahCard({ surahData, onOpen }) {
  const revType  = surahData.revelationType || '';
  const revLabel = revType ? revType.charAt(0).toUpperCase() + revType.slice(1) : '—';
  const isMeccan = revLabel === 'Meccan';

  return (
    <div
      onClick={onOpen}
      className="group relative rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md cursor-pointer transition-all duration-200 hover:bg-white/12 hover:border-white/22 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20"
    >
      <div className="p-4">
        {/* Top: number badge + names + revelation pill */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-teal-300">{surahData.surahNumber}</span>
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-white leading-tight truncate group-hover:text-teal-300 transition-colors">
                {surahData.surahNameEnglish}
              </h3>
              <p className="text-xs text-white/45 mt-0.5 font-arabic">{surahData.surahNameArabic}</p>
            </div>
          </div>
          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isMeccan
              ? 'bg-amber-400/15 border-amber-400/25 text-amber-300'
              : 'bg-teal-400/15 border-teal-400/25 text-teal-300'
          }`}>
            {revLabel}
          </span>
        </div>

        {/* Bottom: verse count + read hint */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
          <span className="text-xs text-white/40">{surahData.totalVerses} verses</span>
          <span className="text-xs text-white/30 group-hover:text-teal-400 transition-colors">Read →</span>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
function ChapterList({ chapters = [], surah, isSearchResult = false }) {
  const [selectedSurah, setSelectedSurah] = useState(null);

  const open  = (s) => setSelectedSurah(s);
  const close = ()  => setSelectedSurah(null);

  return (
    <>
      {/* Grid */}
      <div className="relative">
        {isSearchResult ? (
          <div className="grid md:grid-cols-2 gap-3 pt-4">
            {surah && <SurahCard surahData={surah} onOpen={() => open(surah)} />}
          </div>
        ) : chapters.length === 0 ? (
          <p className="text-white/50 text-sm py-8 text-center">No chapters found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-4">
            {chapters.map((ch) => (
              <SurahCard key={ch._id} surahData={ch} onOpen={() => open(ch)} />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal — rendered outside the grid via portal */}
      {selectedSurah && (
        <ReaderModal surahData={selectedSurah} onClose={close} />
      )}
    </>
  );
}

export default ChapterList;