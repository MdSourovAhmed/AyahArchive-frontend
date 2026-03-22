// import { useState } from 'react';

// function SearchBar({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all'); // Default to search all fields

//   const handleSearch = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     onSearch({ term, filterType });
//   };

//   const handleFilterTypeChange = (e) => {
//     const type = e.target.value;
//     setFilterType(type);
//     onSearch({ term: searchTerm, filterType: type });
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 mb-4">
//       <select
//         value={filterType}
//         onChange={handleFilterTypeChange}
//         className="p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//       >
//         <option value="all">All Fields</option>
//         <option value="book">Book</option>
//         <option value="chapter">Chapter</option>
//         <option value="text">Text</option>
//         <option value="theme">Theme</option>
//         <option value="status">Status</option>
//       </select>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={handleSearch}
//         placeholder={`Search by ${filterType === 'all' ? 'book, chapter, or text' : filterType}`}
//         className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
// //       />
// //     </div>
// //   );
// // }

// // export default SearchBar;

// import { useState } from "react";

// function SearchBar({ onSearch }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");

//   const update = (term, type) => {
//     onSearch({ term, filterType: type });
//   };

//   const handleInput = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     update(term, filterType);
//   };

//   const handleFilter = (e) => {
//     const type = e.target.value;
//     setFilterType(type);
//     update(searchTerm, type);
//   };

//   const placeholders = {
//     all: "Search by name, number, text, or type…",
//     chapter: "e.g. Al-Ikhlas or 112",
//     text: "Search verse text in Arabic or English…",
//     status: "meccan or medinan",
//   };

//   return (
//     <div className="flex flex-col sm:flex-row gap-3 mb-4">
//       <select
//         value={filterType}
//         onChange={handleFilter}
//         className="p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300 shrink-0"
//       >
//         <option value="all">All Fields</option>
//         <option value="chapter">Chapter Name / No.</option>
//         <option value="text">Verse Text</option>
//         <option value="status">Revelation Type</option>
//       </select>
//       <div className="relative w-full">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleInput}
//           placeholder={placeholders[filterType]}
//           className="w-full p-2 pr-8 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//         />
//         {searchTerm && (
//           <button
//             onClick={() => {
//               setSearchTerm("");
//               update("", filterType);
//             }}
//             className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none"
//             aria-label="Clear search"
//           >
//             ×
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchBar;



import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const update = (term, type) => onSearch({ term, filterType: type });

  const handleInput = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    update(term, filterType);
  };

  const handleFilter = (e) => {
    const type = e.target.value;
    setFilterType(type);
    update(searchTerm, type);
  };

  const placeholders = {
    all:     'Search by name, number, verse text or type…',
    chapter: 'e.g. Al-Ikhlas or 112',
    text:    'Search verse text in Arabic or English…',
    status:  'meccan or medinan',
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <select
        value={filterType}
        onChange={handleFilter}
        className="px-3 py-2.5 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm text-white/80 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400/50 transition-all text-sm shrink-0 cursor-pointer"
      >
        <option value="all"     className="bg-gray-900 text-white">All Fields</option>
        <option value="chapter" className="bg-gray-900 text-white">Chapter Name / No.</option>
        <option value="text"    className="bg-gray-900 text-white">Verse Text</option>
        <option value="status"  className="bg-gray-900 text-white">Revelation Type</option>
      </select>

      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInput}
          placeholder={placeholders[filterType]}
          className="w-full px-4 py-2.5 pr-9 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400/50 transition-all text-sm"
        />
        {searchTerm && (
          <button
            onClick={() => { setSearchTerm(''); update('', filterType); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70 text-lg leading-none transition-colors"
            aria-label="Clear"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;