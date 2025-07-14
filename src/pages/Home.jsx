// import { Link } from 'react-router-dom';

// function Home() {
//   return (
//     <div className="text-center">
//       <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-16 rounded-lg">
//         <h1 className="text-4xl font-bold">WordWorden</h1>
//         <p className="mt-2 text-lg">Organize and memorize Bible verses with ease</p>
//         <Link
//           to="/register"
//           className="mt-4 inline-block bg-white text-teal-500 px-6 py-2 rounded-lg hover:bg-gray-100"
//         >
//           Get Started
//         </Link>
//       </div>
//       <div className="grid md:grid-cols-3 gap-4 mt-8">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold">Add Verses</h3>
//           <p className="text-gray-600 dark:text-gray-300">Store your favorite verses</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold">Practice Quizzes</h3>
//           <p className="text-gray-600 dark:text-gray-300">Test your memory</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold">Track Progress</h3>
//           <p className="text-gray-600 dark:text-gray-300">Monitor your memorization</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    // <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
    //   <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg shadow-lg text-center">
    //     <h1 className="text-5xl font-bold text-teal-500 font-arabic" dir="rtl">
    //       السلام عليكم
    //     </h1>
    //     <h1 className="text-3xl font-bold text-teal-500 mb-4">
    //       Welcome to AyahArchive
    //     </h1>
    //     <p className="text-lg text-gray-600 dark:text-gray-200 mb-8">
    //       Memorize and Practice The QURA'N with ease.
    //     </p>
    //     <Link
    //       to={user ? "/verses" : "/register"}
    //       className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
    //     >
    //       Get Started
    //     </Link>
    //     <div className="mt-12 grid md:grid-cols-3 gap-8">
    //       <Link
    //         to="/verses"
    //         className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    //       >
    //         <h3 className="text-xl font-semibold text-teal-500">Add Verse</h3>
    //         <p className="text-gray-600 dark:text-gray-300">
    //           Save and organize your favorite SURAHs.
    //         </p>
    //       </Link>
    //       <Link
    //         to="/quiz"
    //         className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    //       >
    //         <h3 className="text-xl font-semibold text-teal-500">
    //           Practice Quiz
    //         </h3>
    //         <p className="text-gray-600 dark:text-gray-300">
    //           Test your memory with interactive quizzes.
    //         </p>
    //       </Link>
    //       <Link
    //         to="/dashboard"
    //         className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    //       >
    //         <h3 className="text-xl font-semibold text-teal-500">
    //           Track Progress
    //         </h3>
    //         <p className="text-gray-600 dark:text-gray-300">
    //           Monitor your memorization journey.
    //         </p>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <div className="text-center p-6">
      <h1
        className="text-5xl font-bold text-teal-500 font-arabic p-6"
        dir="rtl"
      >
        السلام عليكم
      </h1>
      {user ? (
        <>
          <h1 className="text-3xl font-bold text-teal-500 mb-4">
            Welcome, {user.name || user.email}
          </h1>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-teal-500 mb-4">
            Welcome to AyahArchive
          </h1>
        </>
      )}
      <p className="text-lg text-gray-600 dark:text-gray-200 mb-8">
        Memorize and Practice The QURA'N with ease.
      </p>
      <Link
        to={user ? "/verses" : "/register"}
        className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
      >
        Get Started
      </Link>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <Link
          to="/verses"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-teal-500">Add Verse</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Save and organize your favorite SURAHs.
          </p>
        </Link>
        <Link
          to="/quiz"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-teal-500">Practice Quiz</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Test your memory with interactive quizzes.
          </p>
        </Link>
        <Link
          to="/dashboard"
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-teal-500">
            Track Progress
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor your memorization journey.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
