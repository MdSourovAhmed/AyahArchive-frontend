import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import ChapterList from '../components/ChapterList';

function Chapters() {
  const [chapters, setChapters] = useState([]);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      api.get('/verses/chapters')
        .then((res) => setChapters(res.data))
        .catch((err) => console.error('Error fetching chapters:', err));
    }
  }, [user]);

  if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  if (!user) return <div className="text-center text-gray-600 dark:text-gray-300">Please log in to view chapters.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Chapters and Verse Ranges</h2>
      <ChapterList chapters={chapters} />
    </div>
  );
}

export default Chapters;