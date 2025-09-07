// import { useMemo } from 'react';

// // Utility function to parse verseRange (e.g., "1-3" → [1, 2, 3], "1,3,5" → [1, 3, 5])
// const parseVerseRange = (verseRange) => {
//   if (!verseRange) return [];
//   if (verseRange.includes('-')) {
//     const [start, end] = verseRange.split('-').map(Number);
//     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   }
//   return verseRange.split(',').map(Number).filter((n) => !isNaN(n));
// };

// function VerseCard({ verse, onEdit, onDelete }) {
//   // Parse verse numbers and text using useMemo for performance
//   const verses = useMemo(() => {
//     const verseNumbers = parseVerseRange(verse.verseRange);
//     const verseTexts = verse.text.split('\n').map((text) => text.trim()).filter((text) => text);
//     return verseNumbers.map((number, index) => {
//       const [original, translation = 'No translation provided'] = verseTexts[index]?.split('|') || ['Text missing'];
//       return { number, original, translation };
//     });
//   }, [verse.verseRange, verse.text]);

//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
//       <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
//         {verse.book} {verse.chapter}:{verse.verseRange}
//       </h3>
//       <div className="divide-y divide-gray-200 dark:divide-gray-600">
//         {verses.map((v) => (
//           <div key={v.number} className="py-2">
//             <p className="text-sm font-medium text-teal-500">
//               Verse {v.number}:
//             </p>
//             <p className="text-2xl font-bold text-gray-600 dark:text-gray-200 ml-4">
//               {v.original}
//             </p>
//             <p className="text-base text-gray-700 dark:text-gray-300 ml-4">
//               {v.translation}
//             </p>
//           </div>
//         ))}
//       </div>
//       <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//         Theme: {verse.theme.join(', ') || 'None'} | Status: {verse.status}
//       </p>
//       <div className="flex gap-2 mt-4">
//         <button
//           onClick={() => onEdit(verse)}
//           className="text-teal-500 hover:text-teal-600"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(verse._id)}
//           className="text-red-500 hover:text-red-600"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

// export default VerseCard;

import { useState, useEffect } from "react";
import api from "../utils/api";

function VerseCard({
  verse,
  isQuranVerse = false,
  isFullScreen = false,
  onCollapse,
  onEdit,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editVerseRange, setEditVerseRange] = useState(verse.verseRange || "");
  const [editStatus, setEditStatus] = useState(verse.status || "in-progress");
  const [verseTexts, setVerseTexts] = useState([]);

  useEffect(() => {
    if (isQuranVerse && isFullScreen) {
      const query = verse.verseRange
        ? `${verse.surahId.surahNumber}:${verse.verseRange}`
        : `${verse.surahId.surahNumber}:${verse.verseNumber}`;
      api
        .get(`/quran/search?query=${encodeURIComponent(query)}`)
        .then((res) => setVerseTexts(res.data.verses || [res.data]))
        .catch((err) => console.error("Error fetching verse texts:", err));
    } else {
      setVerseTexts([]); // Clear texts when not expanded
    }
  }, [verse, isQuranVerse, isFullScreen]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await onEdit(verse._id, {
        surahNumber: verse.surahId.surahNumber,
        surahName: verse.surahId.surahNameEnglish,
        verseRange: editVerseRange,
        status: editStatus,
      });
      setIsEditing(false);
    } catch (err) {
      console.error(
        "Error submitting edit:",
        err.response?.data?.message || err.message
      );
      alert(
        `Failed to edit verse range: ${
          err.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md transition-all ${
        isFullScreen ? "max-w-4xl mx-auto" : ""
      }`}
    >
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-2">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Verse Range (e.g., 1-5)
            </label>
            <input
              type="text"
              value={editVerseRange}
              onChange={(e) => setEditVerseRange(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
              placeholder="e.g., 1-5"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="in-progress">In Progress</option>
              <option value="memorized">Memorized</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold dark:text-gray-300">
                {isQuranVerse
                  ? `${verse.surahId?.surahNameArabic || "Surah"} (${
                      verse.surahId?.surahNameEnglish || verse.surahNumber
                    })`
                  : `${verse.book} ${verse.chapter}`}
              </h3>
              {isQuranVerse && (
                <p className="text-gray-600 dark:text-gray-300">
                  Total Verses: {verse.surahId?.totalVerses || "Unknown"},
                  Range: {verse.verseRange}
                </p>
              )}
              {!isQuranVerse && (
                <>
                  <p className="text-gray-600 dark:text-gray-300">
                    Range: {verse.verseRange}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Status: {verse.status}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Themes: {verse.theme?.join(", ") || "None"}
                  </p>
                </>
              )}
            </div>
            {isQuranVerse && !isFullScreen && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(verse._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
          {isQuranVerse && isFullScreen && (
            <>
              <button
                onClick={onCollapse}
                className="mt-2 text-teal-500 hover:text-teal-600"
              >
                Collapse
              </button>
              <div className="mt-4 space-y-4">
                {verseTexts.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-300">
                    Loading verses...
                  </p>
                ) : (
                  verseTexts.map((v, index) => (
                    <div
                      key={v._id}
                      className={`py-2 ${
                        index < verseTexts.length - 1
                          ? "border-b border-gray-200 dark:border-gray-600"
                          : ""
                      }`}
                    >
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Verse {v.verseNumber}:
                      </p>
                      <p className="text-right font-arabic text-lg dark:text-gray-300">
                        {v.arabicText}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {v.englishTranslation}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default VerseCard;
