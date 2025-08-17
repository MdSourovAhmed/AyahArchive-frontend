// import { useState, useEffect, useContext } from 'react';
// import api from '../utils/api';
// import { AuthContext } from '../context/AuthContext';
// import ChapterList from '../components/ChapterList';

// function Chapters() {
//   const [chapters, setChapters] = useState([]);
//   const { user, loading } = useContext(AuthContext);

//   useEffect(() => {
//     if (user) {
//       api.get('/verses/chapters')
//         .then((res) => setChapters(res.data))
//         .catch((err) => console.error('Error fetching chapters:', err));
//     }
//   }, [user]);

//   if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
//   if (!user) return <div className="text-center text-gray-600 dark:text-gray-300">Please log in to view chapters.</div>;

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Chapters and Verse Ranges</h2>
//       <ChapterList chapters={chapters} />
//     </div>
//   );
// }

// export default Chapters;




import { useState, useEffect } from 'react';
import api from '../utils/api';
import ChapterList from '../components/ChapterList';
import SearchBar from '../components/SearchBar';

function Chapters() {
  const [chapters, setChapters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    api.get('/quran/chapters')
      .then((res) => {
        console.log('Chapters fetched:', res.data);
        setChapters(res.data);
      })
      .catch((err) => console.error('Error fetching chapters:', err));
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    api.get(`/quran/search?query=${encodeURIComponent(query)}`)
      .then((res) => {
        console.log('Search results:', res.data);
        // Ensure search results are an array
        setSearchResults(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error('Error searching:', err);
        setSearchResults([]);
        alert('Failed to search: ' + (err.response?.data?.message || err.message));
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Quran Chapters</h2>
      <SearchBar onSearch={handleSearch} />
      {searchResults.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Search Results</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {searchResults.map(({ surah, verses }) => (
              <ChapterList key={surah._id} surah={surah} verses={verses} isSearchResult />
            ))}
          </div>
        </div>
      ) : (
        <ChapterList chapters={chapters} />
      )}
    </div>
  );
}

export default Chapters;


