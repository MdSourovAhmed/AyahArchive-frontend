import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Verses from './pages/Verses';
import QuizPage from './pages/QuizPage';
import DashboardPage from './pages/DashboardPage';
import Chapters from './pages/Chapters';
import Progress from './pages/Progress';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verses" element={<Verses />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
