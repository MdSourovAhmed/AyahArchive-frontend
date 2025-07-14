// import { useState } from 'react';

// function SearchBar({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
//     onSearch(e.target.value);
//   };

//   return (
//     <div className="mb-4">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleChange}
//         placeholder="Search verses by book, chapter, or text..."
//         className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//       />
//     </div>
//   );
// }

// export default SearchBar;


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