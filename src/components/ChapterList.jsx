import { useState } from 'react';
import VerseCard from './VerseCard';

function ChapterList({ chapters, surah, verses, isSearchResult = false }) {
  const [selectedSurah, setSelectedSurah] = useState(null);

  const handleSurahClick = (surahData) => {
    if (selectedSurah?._id === surahData._id) {
      setSelectedSurah(null);
    } else {
      setSelectedSurah(surahData);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setSelectedSurah(null);
    }
  };

  const renderSurahCard = (surahData) => (
    <div
      key={surahData._id}
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer ${
        selectedSurah?._id === surahData._id ? 'fixed inset-0 z-50 overflow-auto p-4' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from bubbling to overlay
        handleSurahClick(surahData);
      }}
    >
      <h3 className="text-lg font-semibold">
        {surahData.surahNameArabic} ({surahData.surahNameEnglish}, {surahData.surahNumber})
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        Revelation: {surahData.revelationType.charAt(0).toUpperCase() + surahData.revelationType.slice(1)} | Verses: {surahData.totalVerses}
      </p>
      {selectedSurah?._id === surahData._id && (
        <div className="mt-4">
          <VerseCard
            verse={{ surahId: surahData, verseRange: `1-${surahData.totalVerses}` }}
            isQuranVerse={true}
            isFullScreen={true}
            onCollapse={() => setSelectedSurah(null)}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-4 pt-4 relative">
      {isSearchResult ? (
        renderSurahCard(surah)
      ) : chapters.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No chapters available.</p>
      ) : (
        chapters.map(renderSurahCard)
      )}
      {selectedSurah && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 overlay"
          onClick={handleOutsideClick}
        />
      )}
    </div>
  );
}

export default ChapterList;

