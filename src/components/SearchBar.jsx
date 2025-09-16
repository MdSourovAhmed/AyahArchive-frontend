import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // Default to search all fields

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch({ term, filterType });
  };

  const handleFilterTypeChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    onSearch({ term: searchTerm, filterType: type });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <select
        value={filterType}
        onChange={handleFilterTypeChange}
        className="p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
      >
        <option value="all">All Fields</option>
        <option value="book">Book</option>
        <option value="chapter">Chapter</option>
        <option value="text">Text</option>
        <option value="theme">Theme</option>
        <option value="status">Status</option>
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={`Search by ${filterType === 'all' ? 'book, chapter, or text' : filterType}`}
        className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
      />
    </div>
  );
}

export default SearchBar;




// import { useState } from 'react';

// function SearchBar({ onSearch }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [query, setQuery] = useState('');

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     onSearch(value);
//   };

//   const handleClear = () => {
//     setQuery('');
//     onSearch('');
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
//       <h3
//         className="text-lg font-semibold cursor-pointer text-teal-500 hover:text-teal-600"
//         onClick={() => setIsExpanded(!isExpanded)}
//       >
//         Search Chapters and Verses
//       </h3>
//       <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
//         <div className="flex items-center mt-2">
//           <input
//             type="text"
//             value={query}
//             onChange={handleInputChange}
//             placeholder="Search by surah or verse (e.g., Al-Fatihah or 1:1-3)"
//             className="w-full p-2 border dark:border-gray-600 rounded-l-lg dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
//           />
//           {query && (
//             <button
//               onClick={handleClear}
//               className="p-2 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600"
//             >
//               Clear
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;
