
// import { useState } from 'react';
// import quranRaw from '../../public/quran.json';

// // Build lookup from local JSON — no API call needed
// const SURAHS = Object.entries(quranRaw.surahs).map(([number, data]) => ({
//   surahNumber:      parseInt(number, 10),
//   surahNameEnglish: data.english_name  ?? '',
//   surahNameArabic:  data.arabic_name   ?? '',
//   totalVerses:      data.total_verses  ?? 0,
// }));

// function ProgressForm({ onSubmit }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [surahInput, setSurahInput] = useState('');
//   const [selectedSurah, setSelectedSurah] = useState(null);
//   const [verseRange, setVerseRange] = useState('');
//   const [status, setStatus]         = useState('in-progress');
//   const [error, setError]           = useState('');
//   const [loading, setLoading]       = useState(false);

//   const handleSurahChange = (e) => {
//     const val = e.target.value;
//     setSurahInput(val);
//     setError('');

//     const match = SURAHS.find((s) =>
//       s.surahNameEnglish.toLowerCase() === val.toLowerCase() ||
//       String(s.surahNumber) === val.trim() ||
//       `${s.surahNameEnglish} (${s.surahNumber})`.toLowerCase() === val.toLowerCase()
//     );
//     setSelectedSurah(match || null);
//     if (val && !match) setError('Surah not found — pick one from the list.');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!selectedSurah) {
//       setError('Please select a valid surah from the list.');
//       return;
//     }

//     // Validate "start-end" format
//     if (!/^\d+-\d+$/.test(verseRange.trim())) {
//       setError('Use format "start-end", e.g. 1-5');
//       return;
//     }
//     const [start, end] = verseRange.split('-').map(Number);
//     if (start < 1 || end > selectedSurah.totalVerses || start > end) {
//       setError(`Range must be between 1 and ${selectedSurah.totalVerses} for this surah.`);
//       return;
//     }

//     setLoading(true);
//     try {
//       // Only send the minimal payload — DB stores nothing about verse text
//       await onSubmit({
//         surahNumber: selectedSurah.surahNumber,
//         surahName:   selectedSurah.surahNameEnglish,
//         verseRange:  verseRange.trim(),
//         status,
//       });
//       // Reset
//       setSurahInput('');
//       setSelectedSurah(null);
//       setVerseRange('');
//       setStatus('in-progress');
//       setIsExpanded(false);
//     } catch (err) {
//       setError(err.message || 'Failed to add. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md mb-6 overflow-hidden">
//       {/* Toggle header */}
//       <button
//         type="button"
//         onClick={() => setIsExpanded((p) => !p)}
//         className="w-full flex items-center justify-between px-5 py-4 text-left group"
//       >
//         <div>
//           <span className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
//             + Add to Vault
//           </span>
//           <span className="ml-2 text-xs text-white/35">
//             Save a surah range to track
//           </span>
//         </div>
//         <span className={`text-white/40 text-lg transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
//           +
//         </span>
//       </button>

//       {/* Collapsible form */}
//       <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
//         <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-4 border-t border-white/8 pt-4">

//           {error && (
//             <div className="flex items-center gap-2 bg-red-500/15 border border-red-400/30 rounded-xl px-4 py-2.5">
//               <span className="text-red-300 text-xs">⚠</span>
//               <p className="text-red-300 text-xs">{error}</p>
//             </div>
//           )}

//           {/* Surah picker */}
//           <div className="space-y-1.5">
//             <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">
//               Surah
//             </label>
//             <input
//               type="text"
//               value={surahInput}
//               onChange={handleSurahChange}
//               placeholder="e.g. Al-Fatihah or 1"
//               list="surah-list"
//               className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/8 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all text-sm"
//             />
//             <datalist id="surah-list">
//               {SURAHS.map((s) => (
//                 <option key={s.surahNumber} value={`${s.surahNameEnglish} (${s.surahNumber})`} />
//               ))}
//             </datalist>
//             {/* Confirmation chip */}
//             {selectedSurah && (
//               <div className="flex items-center gap-2 mt-1">
//                 <span className="text-[10px] font-bold bg-teal-500/20 border border-teal-400/30 text-teal-300 px-2 py-0.5 rounded-full">
//                   ✓ {selectedSurah.surahNameEnglish} · {selectedSurah.totalVerses} verses
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Verse range */}
//           <div className="space-y-1.5">
//             <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">
//               Verse Range
//             </label>
//             <input
//               type="text"
//               value={verseRange}
//               onChange={(e) => { setVerseRange(e.target.value); setError(''); }}
//               placeholder={selectedSurah ? `1–${selectedSurah.totalVerses}` : 'e.g. 1-5'}
//               className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/8 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all text-sm"
//             />
//           </div>

//           {/* Status + submit row */}
//           <div className="flex gap-3 items-end">
//             <div className="flex-1 space-y-1.5">
//               <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">
//                 Status
//               </label>
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/8 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all text-sm cursor-pointer"
//               >
//                 <option value="in-progress" className="bg-gray-900">In Progress</option>
//                 <option value="memorized"   className="bg-gray-900">Memorized</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-teal-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? '…' : 'Save'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProgressForm;




import { useState } from 'react';
import quranRaw from '../../public/quran.json';

// Build lookup from local JSON — no API call needed
const SURAHS = Object.entries(quranRaw.surahs).map(([number, data]) => ({
  surahNumber:      parseInt(number, 10),
  surahNameEnglish: data.english_name  ?? '',
  surahNameArabic:  data.arabic_name   ?? '',
  totalVerses:      data.total_verses  ?? 0,
}));

function ProgressForm({ onSubmit, onError }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [surahInput, setSurahInput] = useState('');
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [verseRange, setVerseRange] = useState('');
  const [status, setStatus]         = useState('in-progress');
  const [error, setError]           = useState('');
  const [loading, setLoading]       = useState(false);

  const handleSurahChange = (e) => {
    const val = e.target.value;
    setSurahInput(val);
    setError('');

    const match = SURAHS.find((s) =>
      s.surahNameEnglish.toLowerCase() === val.toLowerCase() ||
      String(s.surahNumber) === val.trim() ||
      `${s.surahNameEnglish} (${s.surahNumber})`.toLowerCase() === val.toLowerCase()
    );
    setSelectedSurah(match || null);
    if (val && !match) setError('Surah not found — pick one from the list.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedSurah) {
      setError('Please select a valid surah from the list.');
      return;
    }

    // Validate "start-end" format
    if (!/^\d+-\d+$/.test(verseRange.trim())) {
      setError('Use format "start-end", e.g. 1-5');
      return;
    }
    const [start, end] = verseRange.split('-').map(Number);
    if (start < 1 || end > selectedSurah.totalVerses || start > end) {
      setError(`Range must be between 1 and ${selectedSurah.totalVerses} for this surah.`);
      return;
    }

    setLoading(true);
    try {
      // Only send the minimal payload — DB stores nothing about verse text
      await onSubmit({
        surahNumber: selectedSurah.surahNumber,
        surahName:   selectedSurah.surahNameEnglish,
        verseRange:  verseRange.trim(),
        status,
      });
      // Reset
      setSurahInput('');
      setSelectedSurah(null);
      setVerseRange('');
      setStatus('in-progress');
      setIsExpanded(false);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to add. Please try again.';
      setError(msg);
      if (onError) onError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md mb-6 overflow-hidden">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setIsExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
      >
        <div>
          <span className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
            + Add to Vault
          </span>
          <span className="ml-2 text-xs text-white/35">
            Save a surah range to track
          </span>
        </div>
        <span className={`text-white/40 text-lg transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      {/* Collapsible form */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-4 border-t border-white/8 pt-4">

          {error && (
            <div className="flex items-center gap-2 bg-red-500/15 border border-red-400/30 rounded-xl px-4 py-2.5">
              <span className="text-red-300 text-xs">⚠</span>
              <p className="text-red-300 text-xs">{error}</p>
            </div>
          )}

          {/* Surah picker */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">
              Surah
            </label>
            <input
              type="text"
              value={surahInput}
              onChange={handleSurahChange}
              placeholder="e.g. Al-Fatihah or 1"
              list="surah-list"
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/8 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all text-sm"
            />
            <datalist id="surah-list">
              {SURAHS.map((s) => (
                <option key={s.surahNumber} value={`${s.surahNameEnglish} (${s.surahNumber})`} />
              ))}
            </datalist>
            {/* Confirmation chip */}
            {selectedSurah && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold bg-teal-500/20 border border-teal-400/30 text-teal-300 px-2 py-0.5 rounded-full">
                  ✓ {selectedSurah.surahNameEnglish} · {selectedSurah.totalVerses} verses
                </span>
              </div>
            )}
          </div>

          {/* Verse range */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">
              Verse Range
            </label>
            <input
              type="text"
              value={verseRange}
              onChange={(e) => { setVerseRange(e.target.value); setError(''); }}
              placeholder={selectedSurah ? `1–${selectedSurah.totalVerses}` : 'e.g. 1-5'}
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/8 text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400/50 transition-all text-sm"
            />
          </div>

          {/* Status + submit row */}
          <div className="flex gap-3 items-end">
            <div className="flex-1 space-y-1.5">
              <label className="block text-xs font-bold text-white/50 uppercase tracking-wider">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/8 text-white focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all text-sm cursor-pointer"
              >
                <option value="in-progress" className="bg-gray-900">In Progress</option>
                <option value="memorized"   className="bg-gray-900">Memorized</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-teal-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProgressForm;