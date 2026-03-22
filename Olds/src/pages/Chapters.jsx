// // import { useState, useEffect } from 'react';
// // import api from '../utils/api';
// // import ChapterList from '../components/ChapterList';
// // import SearchBar from '../components/SearchBar';

// // function Chapters() {
// //   const [chapters, setChapters] = useState([]);
// //   const [searchResults, setSearchResults] = useState([]);

// //   useEffect(() => {
// //     api.get('/quran/chapters')
// //       .then((res) => {
// //         console.log('Chapters fetched:', res.data);
// //         setChapters(res.data);
// //       })
// //       .catch((err) => console.error('Error fetching chapters:', err));
// //   }, []);

// //   const handleSearch = (query) => {
// //     if (!query) {
// //       setSearchResults([]);
// //       return;
// //     }
// //     api.get(`/quran/search?query=${encodeURIComponent(query)}`)
// //       .then((res) => {
// //         console.log('Search results:', res.data);
// //         // Ensure search results are an array
// //         setSearchResults(Array.isArray(res.data) ? res.data : []);
// //       })
// //       .catch((err) => {
// //         console.error('Error searching:', err);
// //         setSearchResults([]);
// //         alert('Failed to search: ' + (err.response?.data?.message || err.message));
// //       });
// //   };

// //   return (
// //     <div className="container mx-auto px-4">
// //       <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">Quran Chapters</h2>
// //       <SearchBar onSearch={handleSearch} />
// //       {searchResults.length > 0 ? (
// //         <div className="mt-4">
// //           <h3 className="text-xl font-bold mb-2">Search Results</h3>
// //           <div className="grid md:grid-cols-2 gap-4">
// //             {searchResults.map(({ surah, verses }) => (
// //               <ChapterList key={surah._id} surah={surah} verses={verses} isSearchResult />
// //             ))}
// //           </div>
// //         </div>
// //       ) : (
// //         <ChapterList chapters={chapters} />
// //       )}
// //     </div>
// //   );
// // }

// // export default Chapters;




// // import { useState, useMemo } from 'react';
// // import ChapterList from '../components/ChapterList';
// // import SearchBar from '../components/SearchBar';
// // import quranData from '../../public/quran.json';

// // // ── Transform JSON once at module load into the shape ChapterList expects ──────
// // const ALL_CHAPTERS = Object.entries(quranData).map(([number, data]) => ({
// //   _id: number,
// //   surahNumber: parseInt(number, 10),
// //   surahNameArabic: data.arabic_name,
// //   surahNameEnglish: data.english_name,
// //   revelationType: data.revelation_type,
// //   totalVerses: data.total_verses,
// //   verses: data.verses, // full verse array available for text search
// // }));

// // function Chapters() {
// //   const [searchState, setSearchState] = useState({ term: '', filterType: 'all' });

// //   const results = useMemo(() => {
// //     const { term, filterType } = searchState;
// //     if (!term.trim()) return ALL_CHAPTERS;

// //     const q = term.toLowerCase().trim();

// //     return ALL_CHAPTERS.filter((ch) => {
// //       switch (filterType) {
// //         case 'chapter':
// //           // Match surah name (English or Arabic) or number
// //           return (
// //             ch.surahNameEnglish.toLowerCase().includes(q) ||
// //             ch.surahNameArabic.includes(term) ||
// //             String(ch.surahNumber).includes(q)
// //           );

// //         case 'text':
// //           // Match any verse's Arabic or English text
// //           return ch.verses.some(
// //             (v) =>
// //               v.arabic_text.includes(term) ||
// //               v.english_translation.toLowerCase().includes(q)
// //           );

// //         case 'status':
// //           // Match revelation type (meccan / medinan)
// //           return ch.revelationType.toLowerCase().includes(q);

// //         case 'all':
// //         default:
// //           return (
// //             ch.surahNameEnglish.toLowerCase().includes(q) ||
// //             ch.surahNameArabic.includes(term) ||
// //             String(ch.surahNumber).includes(q) ||
// //             ch.revelationType.toLowerCase().includes(q) ||
// //             ch.verses.some(
// //               (v) =>
// //                 v.arabic_text.includes(term) ||
// //                 v.english_translation.toLowerCase().includes(q)
// //             )
// //           );
// //       }
// //     });
// //   }, [searchState]);

// //   return (
// //     <div className="container mx-auto px-4 py-6">
// //       <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">Quran Chapters</h2>

// //       <SearchBar onSearch={setSearchState} />

// //       {searchState.term && (
// //         <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">
// //           {results.length} result{results.length !== 1 ? 's' : ''} for "{searchState.term}"
// //         </p>
// //       )}

// //       <ChapterList chapters={results} />
// //     </div>
// //   );
// // }

// // export default Chapters;



// // import { useState, useMemo } from 'react';
// // import ChapterList from '../components/ChapterList';
// // import SearchBar from '../components/SearchBar';
// // import quranData from '../../public/quran.json';

// // // ── Transform JSON once — keep field names exactly as ChapterList expects ──────
// // const ALL_CHAPTERS = Object.entries(quranData).map(([number, data]) => ({
// //   _id: number,
// //   surahNumber: parseInt(number, 10),
// //   surahNameArabic:  data.arabic_name    ?? '',
// //   surahNameEnglish: data.english_name   ?? '',
// //   revelationType:   data.revelation_type ?? 'unknown',   // ← was the bug: json key is revelation_type
// //   totalVerses:      data.total_verses   ?? 0,
// //   verses:           data.verses         ?? [],
// // }));
// // console.log(ALL_CHAPTERS);

// // const PAGE_SIZE = 20;

// // function Chapters() {
// //   const [searchState, setSearchState] = useState({ term: '', filterType: 'all' });
// //   const [page, setPage] = useState(1);

// //   // Reset to page 1 whenever search changes
// //   const handleSearch = (state) => {
// //     setSearchState(state);
// //     setPage(1);
// //   };

// //   const filtered = useMemo(() => {
// //     const { term, filterType } = searchState;
// //     if (!term.trim()) return ALL_CHAPTERS;
// //     const q = term.toLowerCase().trim();

// //     return ALL_CHAPTERS.filter((ch) => {
// //       switch (filterType) {
// //         case 'chapter':
// //           return (
// //             ch.surahNameEnglish.toLowerCase().includes(q) ||
// //             ch.surahNameArabic.includes(term) ||
// //             String(ch.surahNumber).includes(q)
// //           );
// //         case 'text':
// //           return ch.verses.some(
// //             (v) =>
// //               v.arabic_text.includes(term) ||
// //               v.english_translation.toLowerCase().includes(q)
// //           );
// //         case 'status':
// //           return ch.revelationType.toLowerCase().includes(q);
// //         default: // 'all'
// //           return (
// //             ch.surahNameEnglish.toLowerCase().includes(q) ||
// //             ch.surahNameArabic.includes(term) ||
// //             String(ch.surahNumber).includes(q) ||
// //             ch.revelationType.toLowerCase().includes(q) ||
// //             ch.verses.some(
// //               (v) =>
// //                 v.arabic_text.includes(term) ||
// //                 v.english_translation.toLowerCase().includes(q)
// //             )
// //           );
// //       }
// //     });
// //   }, [searchState]);

// //   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
// //   const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

// //   return (
// //     <div className="container mx-auto px-4 py-6">
// //       <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">Quran Chapters</h2>

// //       <SearchBar onSearch={handleSearch} />

// //       {searchState.term && (
// //         <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">
// //           {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchState.term}"
// //         </p>
// //       )}

// //       <ChapterList chapters={paginated} />

// //       {/* Pagination — only show when there's more than one page */}
// //       {totalPages > 1 && (
// //         <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
// //           <button
// //             onClick={() => setPage((p) => Math.max(1, p - 1))}
// //             disabled={page === 1}
// //             className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// //           >
// //             ← Prev
// //           </button>

// //           {/* Page number buttons — show a window around current page */}
// //           {Array.from({ length: totalPages }, (_, i) => i + 1)
// //             .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
// //             .reduce((acc, p, idx, arr) => {
// //               if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
// //               acc.push(p);
// //               return acc;
// //             }, [])
// //             .map((item, idx) =>
// //               item === '...' ? (
// //                 <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
// //               ) : (
// //                 <button
// //                   key={item}
// //                   onClick={() => setPage(item)}
// //                   className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
// //                     item === page
// //                       ? 'bg-teal-500 text-white shadow-sm'
// //                       : 'bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
// //                   }`}
// //                 >
// //                   {item}
// //                 </button>
// //               )
// //             )}

// //           <button
// //             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
// //             disabled={page === totalPages}
// //             className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
// //           >
// //             Next →
// //           </button>
// //         </div>
// //       )}

// //       {totalPages > 1 && (
// //         <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
// //           Page {page} of {totalPages} · {filtered.length} chapters
// //         </p>
// //       )}
// //     </div>
// //   );
// // }

// // export default Chapters;




// import { useState, useMemo } from 'react';
// import ChapterList from '../components/ChapterList';
// import SearchBar from '../components/SearchBar';
// import quranRaw from '../../public/quran.json';

// // ── Unwrap the top-level "surahs" key, then map to component-friendly shape ───
// const ALL_CHAPTERS = Object.entries(quranRaw.surahs).map(([number, data]) => ({
//   _id: number,
//   surahNumber:      parseInt(number, 10),
//   surahNameArabic:  data.arabic_name     ?? '',
//   surahNameEnglish: data.english_name    ?? '',
//   revelationType:   data.revelation_type ?? 'unknown',
//   totalVerses:      data.total_verses    ?? 0,
//   verses:           data.verses          ?? [],
// }));

// const PAGE_SIZE = 20;

// function Chapters() {
//   const [searchState, setSearchState] = useState({ term: '', filterType: 'all' });
//   const [page, setPage] = useState(1);

//   const handleSearch = (state) => {
//     setSearchState(state);
//     setPage(1);
//   };

//   const filtered = useMemo(() => {
//     const { term, filterType } = searchState;
//     if (!term.trim()) return ALL_CHAPTERS;
//     const q = term.toLowerCase().trim();

//     return ALL_CHAPTERS.filter((ch) => {
//       switch (filterType) {
//         case 'chapter':
//           return (
//             ch.surahNameEnglish.toLowerCase().includes(q) ||
//             ch.surahNameArabic.includes(term) ||
//             String(ch.surahNumber).includes(q)
//           );
//         case 'text':
//           return ch.verses.some(
//             (v) =>
//               v.arabic_text.includes(term) ||
//               v.english_translation.toLowerCase().includes(q)
//           );
//         case 'status':
//           return ch.revelationType.toLowerCase().includes(q);
//         default: // 'all'
//           return (
//             ch.surahNameEnglish.toLowerCase().includes(q) ||
//             ch.surahNameArabic.includes(term) ||
//             String(ch.surahNumber).includes(q) ||
//             ch.revelationType.toLowerCase().includes(q) ||
//             ch.verses.some(
//               (v) =>
//                 v.arabic_text.includes(term) ||
//                 v.english_translation.toLowerCase().includes(q)
//             )
//           );
//       }
//     });
//   }, [searchState]);

//   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
//   const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">Quran Chapters</h2>

//       <SearchBar onSearch={handleSearch} />

//       {searchState.term && (
//         <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">
//           {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchState.term}"
//         </p>
//       )}

//       <ChapterList chapters={paginated} />

//       {totalPages > 1 && (
//         <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
//           <button
//             onClick={() => setPage((p) => Math.max(1, p - 1))}
//             disabled={page === 1}
//             className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//           >
//             ← Prev
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1)
//             .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
//             .reduce((acc, p, idx, arr) => {
//               if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
//               acc.push(p);
//               return acc;
//             }, [])
//             .map((item, idx) =>
//               item === '...' ? (
//                 <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
//               ) : (
//                 <button
//                   key={item}
//                   onClick={() => setPage(item)}
//                   className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
//                     item === page
//                       ? 'bg-teal-500 text-white shadow-sm'
//                       : 'bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
//                   }`}
//                 >
//                   {item}
//                 </button>
//               )
//             )}

//           <button
//             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//             disabled={page === totalPages}
//             className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-gray-800 border dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//           >
//             Next →
//           </button>
//         </div>
//       )}

//       {totalPages > 1 && (
//         <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
//           Page {page} of {totalPages} · {filtered.length} chapters
//         </p>
//       )}
//     </div>
//   );
// }

// export default Chapters;










import { useState, useMemo } from 'react';
import ChapterList from '../components/ChapterList';
import SearchBar from '../components/SearchBar';
import quranRaw from '../../public/quran.json';

const ALL_CHAPTERS = Object.entries(quranRaw.surahs).map(([number, data]) => ({
  _id: number,
  surahNumber:      parseInt(number, 10),
  surahNameArabic:  data.arabic_name     ?? '',
  surahNameEnglish: data.english_name    ?? '',
  revelationType:   data.revelation_type ?? 'unknown',
  totalVerses:      data.total_verses    ?? 0,
  verses:           data.verses          ?? [],
}));

const PAGE_SIZE = 24;

function Chapters() {
  const [searchState, setSearchState] = useState({ term: '', filterType: 'all' });
  const [page, setPage] = useState(1);

  const handleSearch = (state) => { setSearchState(state); setPage(1); };

  const filtered = useMemo(() => {
    const { term, filterType } = searchState;
    if (!term.trim()) return ALL_CHAPTERS;
    const q = term.toLowerCase().trim();
    return ALL_CHAPTERS.filter((ch) => {
      switch (filterType) {
        case 'chapter':
          return ch.surahNameEnglish.toLowerCase().includes(q) || ch.surahNameArabic.includes(term) || String(ch.surahNumber).includes(q);
        case 'text':
          return ch.verses.some((v) => v.arabic_text.includes(term) || v.english_translation.toLowerCase().includes(q));
        case 'status':
          return ch.revelationType.toLowerCase().includes(q);
        default:
          return (
            ch.surahNameEnglish.toLowerCase().includes(q) ||
            ch.surahNameArabic.includes(term) ||
            String(ch.surahNumber).includes(q) ||
            ch.revelationType.toLowerCase().includes(q) ||
            ch.verses.some((v) => v.arabic_text.includes(term) || v.english_translation.toLowerCase().includes(q))
          );
      }
    });
  }, [searchState]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen px-4 py-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">Quran Chapters</h2>
        <p className="text-sm text-white/40">{ALL_CHAPTERS.length} Surahs · Read, explore, and memorize</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {searchState.term && (
        <p className="text-xs text-white/40 mt-2 mb-1">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{searchState.term}"
        </p>
      )}

      <ChapterList chapters={paginated} />

      {/* Pagination */}
      {totalPages > 1 && (
        <>
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/8 border border-white/12 text-white/70 hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((item, idx) =>
                item === '...' ? (
                  <span key={`e-${idx}`} className="px-2 text-white/30">…</span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setPage(item)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      item === page
                        ? 'bg-teal-500/30 border border-teal-400/40 text-teal-300'
                        : 'bg-white/8 border border-white/12 text-white/60 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/8 border border-white/12 text-white/70 hover:bg-white/15 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
          <p className="text-center text-xs text-white/25 mt-2">
            Page {page} of {totalPages} · {filtered.length} chapters
          </p>
        </>
      )}
    </div>
  );
}

export default Chapters;