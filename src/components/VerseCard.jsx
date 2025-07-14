// function VerseCard({ verse, onEdit, onDelete }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
//       <h3 className="text-lg font-semibold">
//         {verse.book} {verse.chapter}:{verse.verseRange}
//       </h3>
//       <p className="text-gray-600 dark:text-gray-300">{verse.text}</p>
//       <p className="text-sm text-gray-500 dark:text-gray-400">
//         Theme: {verse.theme.join(', ') || 'None'} | Status: {verse.status}
//       </p>
//       <div className="flex gap-2 mt-2">
//         <button
//           onClick={() => onEdit(verse)}
//           className="text-blue-500 hover:text-blue-600"
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
//     return verseNumbers.map((number, index) => ({
//       number,
//       text: verseTexts[index] || 'Text missing',
//     }));
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
//             <p className="text-gray-600 dark:text-gray-300 ml-4">{v.text}</p>
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


import { useMemo } from 'react';

// Utility function to parse verseRange (e.g., "1-3" → [1, 2, 3], "1,3,5" → [1, 3, 5])
const parseVerseRange = (verseRange) => {
  if (!verseRange) return [];
  if (verseRange.includes('-')) {
    const [start, end] = verseRange.split('-').map(Number);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  return verseRange.split(',').map(Number).filter((n) => !isNaN(n));
};

function VerseCard({ verse, onEdit, onDelete }) {
  // Parse verse numbers and text using useMemo for performance
  const verses = useMemo(() => {
    const verseNumbers = parseVerseRange(verse.verseRange);
    const verseTexts = verse.text.split('\n').map((text) => text.trim()).filter((text) => text);
    return verseNumbers.map((number, index) => {
      const [original, translation = 'No translation provided'] = verseTexts[index]?.split('|') || ['Text missing'];
      return { number, original, translation };
    });
  }, [verse.verseRange, verse.text]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {verse.book} {verse.chapter}:{verse.verseRange}
      </h3>
      <div className="divide-y divide-gray-200 dark:divide-gray-600">
        {verses.map((v) => (
          <div key={v.number} className="py-2">
            <p className="text-sm font-medium text-teal-500">
              Verse {v.number}:
            </p>
            <p className="text-2xl font-bold text-gray-600 dark:text-gray-200 ml-4">
              {v.original}
            </p>
            <p className="text-base text-gray-700 dark:text-gray-300 ml-4">
              {v.translation}
            </p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Theme: {verse.theme.join(', ') || 'None'} | Status: {verse.status}
      </p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(verse)}
          className="text-teal-500 hover:text-teal-600"
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
    </div>
  );
}

export default VerseCard;