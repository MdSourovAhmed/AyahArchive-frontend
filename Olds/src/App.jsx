// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Verses from './pages/Verses';
// import QuizPage from './pages/QuizPage';
// import DashboardPage from './pages/DashboardPage';
// import Chapters from './pages/Chapters';
// import Progress from './pages/Progress';
// import PrayerTimes from './pages/PrayerTimes';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//         <Navbar />
//         <div className="container mx-auto p-4">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/prayer-times" element={<PrayerTimes />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/verses" element={<Verses />} />
//             <Route path="/quiz" element={<QuizPage />} />
//             <Route path="/dashboard" element={<DashboardPage />} />
//             <Route path="/chapters" element={<Chapters />} />
//             <Route path="/progress" element={<Progress />} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home         from './pages/Home';
import Login        from './pages/Login';
import Register     from './pages/Register';
import Verses       from './pages/Verses';
import QuizPage     from './pages/QuizPage';
import DashboardPage from './pages/DashboardPage';
import Chapters     from './pages/Chapters';
import Progress     from './pages/Progress';
import PrayerTimes  from './pages/PrayerTimes';

function PageWrapper({ children }) {
  return <div className="page-enter">{children}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"             element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/prayer-times" element={<PageWrapper><PrayerTimes /></PageWrapper>} />
          <Route path="/login"        element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/register"     element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="/verses"       element={<PageWrapper><Verses /></PageWrapper>} />
          <Route path="/quiz"         element={<PageWrapper><QuizPage /></PageWrapper>} />
          <Route path="/dashboard"    element={<PageWrapper><DashboardPage /></PageWrapper>} />
          <Route path="/chapters"     element={<PageWrapper><Chapters /></PageWrapper>} />
          <Route path="/progress"     element={<PageWrapper><Progress /></PageWrapper>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;