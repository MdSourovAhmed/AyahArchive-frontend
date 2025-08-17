// import { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0">
//       <div className="container mx-auto p-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-teal-500">
//           WordWorden
//         </Link>
//         <button
//           className="md:hidden text-gray-600 dark:text-gray-300"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? '✕' : '☰'}
//         </button>
//         <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:block`}>
//           <div className="flex flex-col md:flex-row gap-4">
//             <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//               Home
//             </Link>
//             {user ? (
//               <>
//                 <Link to="/verses" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Verses
//                 </Link>
//                 <Link to="/quiz" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Quiz
//                 </Link>
//                 <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Login
//                 </Link>
//                 <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Register
//                 </Link>
//               </>
//             )}
//             <button
//               onClick={toggleDarkMode}
//               className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
//             >
//               {darkMode ? '☀️' : '🌙'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// import { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0">
//       <div className="container mx-auto p-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-teal-500">
//           VerseMaster
//         </Link>
//         <button
//           className="md:hidden text-gray-600 dark:text-gray-300"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? '✕' : '☰'}
//         </button>
//         <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:block`}>
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//               Home
//             </Link>
//             {user ? (
//               <>
//                 <span className="text-gray-600 dark:text-gray-300">
//                   Welcome, {user.name || user.email}
//                 </span>
//                 <Link to="/verses" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Verses
//                 </Link>
//                 <Link to="/quiz" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Quiz
//                 </Link>
//                 <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Dashboard
//                 </Link>
//                 {user.role === 'admin' && (
//                   <Link to="/admin" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                     Admin
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Login
//                 </Link>
//                 <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Register
//                 </Link>
//               </>
//             )}
//             <button
//               onClick={toggleDarkMode}
//               className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
//             >
//               {darkMode ? '☀️' : '🌙'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(() => {
//     // Initialize from localStorage or default to false
//     return localStorage.getItem('darkMode') === 'true';
//   });
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Apply dark class on mount and when darkMode changes
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     // Persist to localStorage
//     localStorage.setItem('darkMode', darkMode);
//     // Debug: Log dark mode state
//     console.log('Dark mode toggled:', darkMode);
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => !prev);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0">
//       <div className="container mx-auto p-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-teal-500 dark:text-teal-400">
//           VerseMaster
//         </Link>
//         <button
//           className="md:hidden text-gray-600 dark:text-gray-300"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? '✕' : '☰'}
//         </button>
//         <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:block`}>
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//               Home
//             </Link>
//             {user ? (
//               <>
//                 <span className="text-gray-600 dark:text-gray-300">
//                   Welcome, {user.name || user.email}
//                 </span>
//                 <Link to="/verses" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Verses
//                 </Link>
//                 <Link to="/quiz" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Quiz
//                 </Link>
//                 <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Dashboard
//                 </Link>
//                 {user.role === 'admin' && (
//                   <Link to="/admin" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                     Admin
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Login
//                 </Link>
//                 <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Register
//                 </Link>
//               </>
//             )}
//             <button
//               onClick={toggleDarkMode}
//               className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
//             >
//               {darkMode ? '☀️' : '🌙'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(() => {
//     // Initialize from localStorage or system preference
//     const saved = localStorage.getItem('darkMode');
//     return saved ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches;
//   });
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Apply/remove dark class
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     localStorage.setItem('darkMode', darkMode);
//     // Debug: Log dark mode state and HTML classes
//     console.log('Dark mode state:', darkMode, 'HTML classes:', document.documentElement.classList.toString());
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     console.log('Toggling dark mode');
//     setDarkMode((prev) => !prev);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0">
//       <div className="container mx-auto p-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-teal-500 dark:text-teal-400">
//           VerseMaster
//         </Link>
//         <button
//           className="md:hidden text-gray-600 dark:text-gray-300"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? '✕' : '☰'}
//         </button>
//         <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:block`}>
//           <div className="flex flex-col md:flex-row gap-4 items-center">
//             <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//               Home
//             </Link>
//             {user ? (
//               <>
//                 <Link to="/verses" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Verses
//                 </Link>
//                 <Link to="/quiz" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Quiz
//                 </Link>
//                 <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Dashboard
//                 </Link>
//                 <span className="text-gray-600 dark:text-gray-300">
//                   Welcome, {user.name || user.email}
//                 </span>
//                 {user.role === 'admin' && (
//                   <Link to="/admin" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                     Admin
//                   </Link>
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Login
//                 </Link>
//                 <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
//                   Register
//                 </Link>
//               </>
//             )}
//             <button
//               onClick={toggleDarkMode}
//               className="text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-transform duration-200 transform hover:scale-110"
//             >
//               {darkMode ? '☀️' : '🌙'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// import { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0">
//       <div className="container mx-auto p-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold text-teal-500">
//           VerseMaster
//         </Link>
//         <button
//           className="md:hidden text-gray-600 dark:text-gray-300"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? '✕' : '☰'}
//         </button>
//         <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:block`}>
//           <div className="flex flex-col md:flex-row gap-4">
//             <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//               Home
//             </Link>
//             {user ? (
//               <>
//                 <Link to="/verses" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Verses
//                 </Link>
//                 <Link to="/quiz" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Quiz
//                 </Link>
//                 <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Dashboard
//                 </Link>
//                 <Link to="/chapters" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Chapters
//                 </Link>
//                 <span className="text-gray-600 dark:text-gray-300">
//                   Welcome, {user.name || user.email}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Login
//                 </Link>
//                 <Link to="/register" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
//                   Register
//                 </Link>
//               </>
//             )}
//             <button
//               onClick={toggleDarkMode}
//               className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
//             >
//               {darkMode ? '☀️' : '🌙'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// // export default Navbar;

// export default Navbar;

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  // Initialize darkMode from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Sync dark mode with document and localStorage
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    console.log("Dark Mode:", darkMode); // Debug
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-500">
          AyahArchive
        </Link>
        <button
          className="md:hidden text-gray-600 dark:text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
        <div className={`md:flex ${isOpen ? "block" : "hidden"} md:block`}>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
            >
              Home
            </Link>
            <Link
              to="/chapters"
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
            >
              Quran
            </Link>
            {user ? (
              <>
                <Link
                  to="/progress"
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
                >
                  Progress
                </Link>
                <Link
                  to="/quiz"
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
                >
                  Quiz
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
                >
                  Dashboard
                </Link>
                {/* <Link to="/chapters" className="text-gray-600 dark:text-gray-300 hover:text-teal-500">
                  Chapters
                </Link> */}
                {/* <span className="text-gray-600 dark:text-gray-300">
                  Welcome, {user.name || user.email}
                </span> */}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
                >
                  Register
                </Link>
              </>
            )}
            <button
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300 hover:text-teal-500"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
