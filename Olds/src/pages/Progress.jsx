
// import { useState, useEffect, useRef, useContext } from 'react';
// import { createPortal } from 'react-dom';
// import { AuthContext } from '../context/AuthContext';
// import api from '../utils/api';
// import ProgressForm from '../components/ProgressForm';
// import VerseCard from '../components/VerseCard';
// import quranRaw from '../../public/quran.json';

// // Build a surahNumber → full surah object map from local JSON
// const SURAH_MAP = Object.entries(quranRaw.surahs).reduce((acc, [number, data]) => {
//   acc[parseInt(number, 10)] = {
//     _id:              number,
//     surahNumber:      parseInt(number, 10),
//     surahNameArabic:  data.arabic_name    ?? '',
//     surahNameEnglish: data.english_name   ?? '',
//     revelationType:   data.revelation_type ?? '',
//     totalVerses:      data.total_verses   ?? 0,
//     verses:           data.verses         ?? [],
//   };
//   return acc;
// }, {});

// // Enrich a raw DB verse record with full surah data from local JSON
// function enrich(verse) {
//   const surahNum = verse.surahId?.surahNumber ?? verse.surahNumber;
//   return {
//     ...verse,
//     surahId: SURAH_MAP[surahNum] ?? verse.surahId,
//   };
// }

// // ── Fullscreen reader modal ───────────────────────────────────────────────────
// function ReaderModal({ verse, onClose, onEdit, onDelete }) {
//   const contentRef = useRef(null);

//   useEffect(() => {
//     const onKey = (e) => { if (e.key === 'Escape') onClose(); };
//     document.addEventListener('keydown', onKey);
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.removeEventListener('keydown', onKey);
//       document.body.style.overflow = '';
//     };
//   }, [onClose]);

//   const handleOverlay = (e) => {
//     if (contentRef.current && !contentRef.current.contains(e.target)) onClose();
//   };

//   return createPortal(
//     <div
//       onClick={handleOverlay}
//       className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
//       style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
//     >
//       <div
//         ref={contentRef}
//         className="w-full max-w-3xl mx-4 my-10"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <VerseCard
//           verse={verse}
//           isQuranVerse={true}
//           isFullScreen={true}
//           onCollapse={onClose}
//           onEdit={onEdit}
//           onDelete={onDelete}
//         />
//       </div>
//     </div>,
//     document.body
//   );
// }

// // ── Verse list section ────────────────────────────────────────────────────────
// function VerseSection({ title, badge, badgeStyle, verses, emptyMsg, onCardClick }) {
//   return (
//     <div className="flex-1 min-w-0">
//       <div className="flex items-center gap-2 mb-3">
//         <h3 className="text-sm font-bold text-white">{title}</h3>
//         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
//           {badge}
//         </span>
//       </div>
//       {verses.length === 0 ? (
//         <div className="rounded-2xl border border-white/8 bg-white/4 px-5 py-8 text-center">
//           <p className="text-white/30 text-sm">{emptyMsg}</p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {verses.map((verse) => (
//             <div key={verse._id} onClick={() => onCardClick(verse)} className="cursor-pointer">
//               <VerseCard
//                 verse={verse}
//                 isQuranVerse={true}
//                 isFullScreen={false}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Main page ─────────────────────────────────────────────────────────────────
// function Progress() {
//   const { user, loading } = useContext(AuthContext);
//   const [memorized,   setMemorized]   = useState([]);
//   const [inProgress,  setInProgress]  = useState([]);
//   const [selectedVerse, setSelected]  = useState(null);

//   useEffect(() => {
//     if (!user) return;
//     api.get('/verses?status=memorized')
//       .then((res) => setMemorized(res.data.map(enrich)))
//       .catch(console.error);
//     api.get('/verses?status=in-progress')
//       .then((res) => setInProgress(res.data.map(enrich)))
//       .catch(console.error);
//   }, [user]);

//   const handleAdd = async (data) => {
//     const res = await api.post('/verses/add', data);
//     const enriched = enrich(res.data);
//     if (data.status === 'memorized') setMemorized((p) => [...p, enriched]);
//     else                             setInProgress((p) => [...p, enriched]);
//   };

//   const handleEdit = async (id, data) => {
//     const res = await api.put(`/verses/${id}`, data);
//     const updated = enrich(res.data);
//     if (updated.status === 'memorized') {
//       setMemorized((p)  => [...p.filter((v) => v._id !== id), updated]);
//       setInProgress((p) => p.filter((v) => v._id !== id));
//     } else {
//       setInProgress((p) => [...p.filter((v) => v._id !== id), updated]);
//       setMemorized((p)  => p.filter((v) => v._id !== id));
//     }
//     // Keep modal open with fresh data
//     setSelected(updated);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this verse range?')) return;
//     await api.delete(`/verses/${id}`);
//     setMemorized((p)  => p.filter((v) => v._id !== id));
//     setInProgress((p) => p.filter((v) => v._id !== id));
//     setSelected(null);
//   };

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-white/40 animate-pulse">Loading…</p>
//     </div>
//   );

//   if (!user) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md px-8 py-10 text-center max-w-sm">
//         <p className="text-4xl mb-4">🔒</p>
//         <p className="text-white/60 text-sm">Please log in to view your progress.</p>
//       </div>
//     </div>
//   );

//   const total = memorized.length + inProgress.length;

//   return (
//     <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto">

//       {/* Header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-white mb-1">My Vault</h2>
//         <p className="text-sm text-white/40">
//           {total === 0
//             ? 'No verses saved yet — add your first range below.'
//             : `${memorized.length} memorized · ${inProgress.length} in progress`}
//         </p>
//       </div>

//       {/* Add form */}
//       <ProgressForm onSubmit={handleAdd} />

//       {/* Two-column list */}
//       <div className="flex flex-col md:flex-row gap-5 mt-2">
//         <VerseSection
//           title="Memorized"
//           badge={`${memorized.length}`}
//           badgeStyle="bg-teal-400/15 border-teal-400/25 text-teal-300"
//           verses={memorized}
//           emptyMsg="No memorized verses yet."
//           onCardClick={setSelected}
//         />
//         <VerseSection
//           title="In Progress"
//           badge={`${inProgress.length}`}
//           badgeStyle="bg-amber-400/15 border-amber-400/25 text-amber-300"
//           verses={inProgress}
//           emptyMsg="No verses in progress."
//           onCardClick={setSelected}
//         />
//       </div>

//       {/* Fullscreen reader modal */}
//       {selectedVerse && (
//         <ReaderModal
//           verse={selectedVerse}
//           onClose={() => setSelected(null)}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       )}
//     </div>
//   );
// }

// export default Progress;





import { useState, useEffect, useRef, useContext } from 'react';
import { createPortal } from 'react-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import ProgressForm from '../components/ProgressForm';
import VerseCard from '../components/VerseCard';
import quranRaw from '../../public/quran.json';

// ── Local JSON lookup ─────────────────────────────────────────────────────────
const SURAH_MAP = Object.entries(quranRaw.surahs).reduce((acc, [number, data]) => {
  acc[parseInt(number, 10)] = {
    _id:              number,
    surahNumber:      parseInt(number, 10),
    surahNameArabic:  data.arabic_name     ?? '',
    surahNameEnglish: data.english_name    ?? '',
    revelationType:   data.revelation_type ?? '',
    totalVerses:      data.total_verses    ?? 0,
    verses:           data.verses          ?? [],
  };
  return acc;
}, {});

function enrich(verse) {
  const surahNum = verse.surahId?.surahNumber ?? verse.surahNumber;
  return { ...verse, surahId: SURAH_MAP[surahNum] ?? verse.surahId };
}

// ── Toast notification ────────────────────────────────────────────────────────
function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  const colors = {
    error:   'bg-red-500/20 border-red-400/40 text-red-200',
    success: 'bg-teal-500/20 border-teal-400/40 text-teal-200',
    info:    'bg-indigo-500/20 border-indigo-400/40 text-indigo-200',
  };

  return createPortal(
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-2xl border backdrop-blur-md text-sm font-medium max-w-sm text-center shadow-xl animate-fadeUp ${colors[type] ?? colors.info}`}>
      {message}
    </div>,
    document.body
  );
}

// ── Fullscreen reader modal ───────────────────────────────────────────────────
function ReaderModal({ verse, onClose, onEdit, onDelete, onMemorize }) {
  const contentRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlay = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) onClose();
  };

  return createPortal(
    <div
      onClick={handleOverlay}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
    >
      <div
        ref={contentRef}
        className="w-full max-w-3xl mx-4 my-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mark as memorized banner inside modal */}
        {verse.status === 'in-progress' && (
          <div className="mb-3 flex items-center justify-between rounded-xl border border-teal-400/25 bg-teal-500/12 backdrop-blur-sm px-4 py-3">
            <p className="text-sm text-teal-200">Done memorizing this range?</p>
            <button
              onClick={() => onMemorize(verse._id)}
              className="text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              ✓ Mark as Memorized
            </button>
          </div>
        )}
        <VerseCard
          verse={verse}
          isQuranVerse={true}
          isFullScreen={true}
          onCollapse={onClose}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>,
    document.body
  );
}

// ── Compact verse card with memorize button ───────────────────────────────────
function VaultCard({ verse, onClick, onMemorize, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  const handleMemorize = (e) => {
    e.stopPropagation();
    onMemorize(verse._id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (!confirming) { setConfirming(true); return; }
    onDelete(verse._id);
  };

  return (
    <div
      onClick={onClick}
      className="group rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md p-4 cursor-pointer hover:bg-white/11 hover:border-white/20 transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-teal-300">
              {verse.surahId?.surahNumber}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate group-hover:text-teal-300 transition-colors">
              {verse.surahId?.surahNameEnglish}
            </p>
            <p className="text-xs text-white/40 mt-0.5">
              Verses {verse.verseRange}
              <span className="mx-1.5 text-white/20">·</span>
              {verse.surahId?.surahNameArabic}
            </p>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          {/* Mark memorized — only for in-progress */}
          {verse.status === 'in-progress' && (
            <button
              onClick={handleMemorize}
              title="Mark as memorized"
              className="h-7 px-2.5 rounded-lg text-[11px] font-bold bg-teal-500/15 border border-teal-400/25 text-teal-300 hover:bg-teal-500/30 transition-colors"
            >
              ✓
            </button>
          )}
          {/* Delete with confirm */}
          <button
            onClick={handleDelete}
            onBlur={() => setConfirming(false)}
            title={confirming ? 'Click again to confirm' : 'Delete'}
            className={`h-7 px-2.5 rounded-lg text-[11px] font-bold border transition-colors ${
              confirming
                ? 'bg-red-500/30 border-red-400/50 text-red-200'
                : 'bg-white/6 border-white/12 text-white/35 hover:bg-red-500/15 hover:border-red-400/25 hover:text-red-300'
            }`}
          >
            {confirming ? 'Sure?' : '✕'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
function VerseSection({ title, badge, badgeStyle, verses, emptyMsg, onCardClick, onMemorize, onDelete }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
          {badge}
        </span>
      </div>
      {verses.length === 0 ? (
        <div className="rounded-2xl border border-white/8 bg-white/4 px-5 py-8 text-center">
          <p className="text-white/30 text-sm">{emptyMsg}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {verses.map((verse) => (
            <VaultCard
              key={verse._id}
              verse={verse}
              onClick={() => onCardClick(verse)}
              onMemorize={onMemorize}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
function Progress() {
  const { user, loading } = useContext(AuthContext);
  const [memorized,     setMemorized]   = useState([]);
  const [inProgress,    setInProgress]  = useState([]);
  const [selectedVerse, setSelected]    = useState(null);
  const [toast,         setToast]       = useState(null); // { message, type }

  const showToast = (message, type = 'info') => setToast({ message, type });
  const hideToast = () => setToast(null);

  useEffect(() => {
    if (!user) return;
    api.get('/verses?status=memorized')
      .then((res) => setMemorized(res.data.map(enrich)))
      .catch(console.error);
    api.get('/verses?status=in-progress')
      .then((res) => setInProgress(res.data.map(enrich)))
      .catch(console.error);
  }, [user]);

  // Add — handles both plain add and merge response
  const handleAdd = async (data) => {
    const res     = await api.post('/verses/add', data);
    const enriched = enrich(res.data);

    if (res.data.merged) {
      // Remove old records that were merged into the new one
      const deleted = new Set(res.data.deletedIds ?? []);
      setMemorized((p)  => p.filter((v) => !deleted.has(String(v._id))));
      setInProgress((p) => p.filter((v) => !deleted.has(String(v._id))));
      showToast(
        `Ranges merged → ${enriched.verseRange}`,
        'info'
      );
    }

    if (enriched.status === 'memorized') setMemorized((p) => [enriched, ...p]);
    else                                  setInProgress((p) => [enriched, ...p]);
  };

  // Edit (from modal)
  const handleEdit = async (id, data) => {
    const res     = await api.put(`/verses/${id}`, data);
    const updated  = enrich(res.data);
    if (updated.status === 'memorized') {
      setMemorized((p)  => [updated, ...p.filter((v) => v._id !== id)]);
      setInProgress((p) => p.filter((v) => v._id !== id));
    } else {
      setInProgress((p) => [updated, ...p.filter((v) => v._id !== id)]);
      setMemorized((p)  => p.filter((v) => v._id !== id));
    }
    setSelected(updated);
  };

  // Mark as memorized (quick action)
  const handleMemorize = async (id) => {
    try {
      const res     = await api.patch(`/verses/${id}/memorize`);
      const updated  = enrich(res.data);
      setInProgress((p) => p.filter((v) => v._id !== id));
      setMemorized((p)  => [updated, ...p]);
      // If open in modal, update it
      setSelected((prev) => (prev?._id === id ? updated : prev));
      showToast('Moved to Memorized 🎉', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to update', 'error');
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/verses/${id}`);
      setMemorized((p)  => p.filter((v) => v._id !== id));
      setInProgress((p) => p.filter((v) => v._id !== id));
      setSelected((prev) => (prev?._id === id ? null : prev));
      showToast('Entry deleted', 'info');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to delete', 'error');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-white/40 animate-pulse">Loading…</p>
    </div>
  );

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md px-8 py-10 text-center max-w-sm">
        <p className="text-4xl mb-4">🔒</p>
        <p className="text-white/60 text-sm">Please log in to view your progress.</p>
      </div>
    </div>
  );

  const total = memorized.length + inProgress.length;

  return (
    <div className="min-h-screen px-4 py-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">My Vault</h2>
        <p className="text-sm text-white/40">
          {total === 0
            ? 'No verses saved yet — add your first range below.'
            : `${memorized.length} memorized · ${inProgress.length} in progress`}
        </p>
      </div>

      {/* Add form */}
      <ProgressForm onSubmit={handleAdd} onError={(msg) => showToast(msg, 'error')} />

      {/* Two-column vault */}
      <div className="flex flex-col md:flex-row gap-5 mt-2">
        <VerseSection
          title="Memorized"
          badge={`${memorized.length}`}
          badgeStyle="bg-teal-400/15 border-teal-400/25 text-teal-300"
          verses={memorized}
          emptyMsg="No memorized verses yet."
          onCardClick={setSelected}
          onMemorize={handleMemorize}
          onDelete={handleDelete}
        />
        <VerseSection
          title="In Progress"
          badge={`${inProgress.length}`}
          badgeStyle="bg-amber-400/15 border-amber-400/25 text-amber-300"
          verses={inProgress}
          emptyMsg="No verses in progress."
          onCardClick={setSelected}
          onMemorize={handleMemorize}
          onDelete={handleDelete}
        />
      </div>

      {/* Fullscreen reader */}
      {selectedVerse && (
        <ReaderModal
          verse={selectedVerse}
          onClose={() => setSelected(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMemorize={handleMemorize}
        />
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onDone={hideToast} />}
    </div>
  );
}

export default Progress;