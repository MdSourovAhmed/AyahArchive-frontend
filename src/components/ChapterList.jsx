import React from 'react';

function ChapterList({ chapters }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {chapters.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No chapters added yet.</p>
      ) : (
        chapters.map((chapter) => (
          <div
            key={chapter.chapter}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">Chapter {chapter.chapter}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Verse Ranges: {chapter.verseRanges.join(', ') || 'None'}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ChapterList;