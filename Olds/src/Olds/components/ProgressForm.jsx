
import { useState, useEffect } from 'react';
import api from '../utils/api';

function ProgressForm({ onSubmit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [surahInput, setSurahInput] = useState('');
  const [surahNumber, setSurahNumber] = useState('');
  const [surahName, setSurahName] = useState('');
  const [verseRange, setVerseRange] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [surahs, setSurahs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/quran/chapters')
      .then((res) => setSurahs(res.data))
      .catch((err) => console.error('Error fetching surahs:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate surah selection
    const selectedSurah = surahs.find(s => 
      s.surahNumber === parseInt(surahNumber) && 
      s.surahNameEnglish === surahName
    );
    if (!selectedSurah) {
      setError('Please select a valid surah (e.g., "Al-Fatihah (1)")');
      return;
    }

    // Validate verse range format
    const rangeRegex = /^\d+-\d+$/;
    if (!rangeRegex.test(verseRange)) {
      setError('Invalid verse range format. Use "start-end" (e.g., "1-5")');
      return;
    }

    // Validate verse range against total verses
    const [start, end] = verseRange.split('-').map(Number);
    if (isNaN(start) || isNaN(end) || start < 1 || end > selectedSurah.totalVerses || start > end) {
      setError(`Invalid verse range. Must be between 1 and ${selectedSurah.totalVerses}`);
      return;
    }

    onSubmit({ surahNumber, surahName, verseRange, status });
    setSurahInput('');
    setSurahNumber('');
    setSurahName('');
    setVerseRange('');
    setStatus('in-progress');
    setIsExpanded(false); // Collapse after submission
  };

  const handleSurahChange = (e) => {
    const value = e.target.value;
    setSurahInput(value);

    // Match surah by name, number, or combined format
    const surah = surahs.find(s => 
      s.surahNameEnglish.toLowerCase() === value.toLowerCase() ||
      s.surahNumber.toString() === value ||
      `${s.surahNameEnglish} (${s.surahNumber})`.toLowerCase() === value.toLowerCase()
    );
    if (surah) {
      setSurahNumber(surah.surahNumber);
      setSurahName(surah.surahNameEnglish);
      setError('');
    } else {
      setSurahNumber('');
      setSurahName('');
      setError('Surah not found. Please select a valid surah.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h3 
        className="text-lg font-semibold cursor-pointer text-teal-500 hover:text-teal-600"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        Include Chapter and Verses
      </h3>
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Surah (Name or Number)</label>
            <input
              type="text"
              value={surahInput}
              onChange={handleSurahChange}
              placeholder="e.g., Al-Fatihah, 1, or Al-Fatihah (1)"
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
              list="surah-list"
            />
            <datalist id="surah-list">
              {surahs.map(surah => (
                <option key={surah._id} value={`${surah.surahNameEnglish} (${surah.surahNumber})`} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Verse Range (e.g., 1-5)</label>
            <input
              type="text"
              value={verseRange}
              onChange={(e) => setVerseRange(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
              placeholder="e.g., 1-5"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border dark:border-gray-600 rounded dark:bg-gray-700 dark:text-gray-300"
            >
              <option value="in-progress">In Progress</option>
              <option value="memorized">Memorized</option>
            </select>
          </div>
          <button type="submit" className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600">
            Add Range
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProgressForm;