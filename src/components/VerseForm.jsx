// import { useState } from 'react';

// function VerseForm({ onSubmit, initialData }) {
//   const [formData, setFormData] = useState(
//     initialData || {
//       book: '',
//       chapter: '',
//       verseRange: '',
//       text: '',
//       theme: '',
//       status: '',
//     }
//   );
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await onSubmit({
//         ...formData,
//         theme: formData.theme.split(',').map((t) => t.trim()).filter((t) => t),
//       });
//     } catch (err) {
//       setError('Failed to save verse');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 mb-4">
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <div>
//         <label className="block text-gray-600 dark:text-gray-300">Book</label>
//         <input
//           type="text"
//           name="book"
//           value={formData.book}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-600 dark:text-gray-300">Chapter</label>
//         <input
//           type="number"
//           name="chapter"
//           value={formData.chapter}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-600 dark:text-gray-300">Verse Range (e.g., 1-3)</label>
//         <input
//           type="text"
//           name="verseRange"
//           value={formData.verseRange}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-600 dark:text-gray-300">Text</label>
//         <textarea
//           name="text"
//           value={formData.text}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-600 dark:text-gray-300">Themes (comma-separated)</label>
//         <input
//           type="text"
//           name="theme"
//           value={formData.theme}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
//         />
//       </div>
//       <div>
//         <label className="block text-gray-600 dark:text-gray-300">Status</label>
//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
//         >
//           <option value="in-progress">In Progress</option>
//           <option value="memorized">Memorized</option>
//         </select>
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
//       >
//         Save Verse
//       </button>
//     </form>
//   );
// }

// export default VerseForm;


import { useState, useEffect } from 'react';

function VerseForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    book: initialData?.book || '',
    chapter: initialData?.chapter || '',
    verseRange: initialData?.verseRange || '',
    text: initialData?.text || '',
    theme: initialData?.theme?.join(', ') || '',
    status: initialData?.status || 'in-progress',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.status) {
      setError('Please select a status');
      return;
    }
    try {
      await onSubmit({
        ...formData,
        chapter: parseInt(formData.chapter),
        theme: formData.theme.split(',').map((t) => t.trim()).filter((t) => t),
      });
      setError('');
    } catch (err) {
      setError('Failed to submit verse');
    }
  };

  // Debug formData.status
  useEffect(() => {
    console.log('VerseForm Status:', formData.status);
  }, [formData.status]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Book</label>
        <input
          type="text"
          name="book"
          value={formData.book}
          onChange={handleChange}
          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Chapter</label>
        <input
          type="number"
          name="chapter"
          value={formData.chapter}
          onChange={handleChange}
          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Verse Range</label>
        <input
          type="text"
          name="verseRange"
          value={formData.verseRange}
          onChange={handleChange}
          placeholder="e.g., 1-3 or 1,3,5"
          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Text (original|translation, one per line)</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="e.g., Original verse 1|Translation verse 1\nOriginal verse 2|Translation verse 2"
          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          rows="4"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Theme (comma-separated)</label>
        <input
          type="text"
          name="theme"
          value={formData.theme}
          onChange={handleChange}
          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          required
        >
          <option value="in-progress">In Progress</option>
          <option value="memorized">Memorized</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
      >
        {initialData ? 'Update Verse' : 'Add Verse'}
      </button>
    </form>
  );
}

export default VerseForm;



// import { useState, useEffect } from 'react';

// function VerseForm({ onSubmit, initialData }) {
//   const [formData, setFormData] = useState({
//     book: initialData?.book || '',
//     chapter: initialData?.chapter || '',
//     verseRange: initialData?.verseRange || '',
//     text: initialData?.text || '',
//     theme: initialData?.theme?.join(', ') || '',
//     status: initialData?.status || 'in-progress',
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.status) {
//       setError('Please select a status');
//       return;
//     }
//     const verseCount = (formData.verseRange.match(/\d+/g) || []).length;
//     const textLines = formData.text.split('\n').filter((t) => t.trim());
//     if (verseCount > 0 && textLines.length > 0 && textLines.length !== verseCount) {
//       setError('Number of text lines must match verses in range');
//       return;
//     }
//     if (textLines.some((line) => !line.includes('|'))) {
//       setError('Each verse text should include | to separate original and translation');
//       return;
//     }
//     try {
//       await onSubmit({
//         ...formData,
//         chapter: parseInt(formData.chapter),
//         theme: formData.theme.split(',').map((t) => t.trim()).filter((t) => t),
//       });
//       setError('');
//     } catch (err) {
//       setError('Failed to submit verse');
//     }
//   };

//   useEffect(() => {
//     console.log('VerseForm Data:', { text: formData.text, status: formData.status });
//   }, [formData.text, formData.status]);

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {error && <p className="text-red-500">{error}</p>}
//       <div>
//         <label className="block text-gray-700 dark:text-gray-300">Book</label>
//         <input
//           type="text"
//           name="book"
//           value={formData.book}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 dark:text-gray-300">Chapter</label>
//         <input
//           type="number"
//           name="chapter"
//           value={formData.chapter}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 dark:text-gray-300">Verse Range</label>
//         <input
//           type="text"
//           name="verseRange"
//           value={formData.verseRange}
//           onChange={handleChange}
//           placeholder="e.g., 1-3 or 1,3,5"
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 dark:text-gray-300">
//           Text (original|translation, one per line)
//         </label>
//         <textarea
//           name="text"
//           value={formData.text}
//           onChange={handleChange}
//           placeholder="e.g., Original verse 1|Translation verse 1\nOriginal verse 2|Translation verse 2"
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//           rows="4"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 dark:text-gray-300">Theme (comma-separated)</label>
//         <input
//           type="text"
//           name="theme"
//           value={formData.theme}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 dark:text-gray-300">Status</label>
//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700 text-gray-600 dark:text-gray-300"
//           required
//         >
//           <option value="in-progress">In Progress</option>
//           <option value="memorized">Memorized</option>
//         </select>
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
//       >
//         {initialData ? 'Update Verse' : 'Add Verse'}
//       </button>
//     </form>
//   );
// }

// export default VerseForm;