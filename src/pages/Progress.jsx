
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import ProgressForm from '../components/ProgressForm';
import VerseCard from '../components/VerseCard';

function Progress() {
  const { user, loading } = useContext(AuthContext);
  const [memorizedVerses, setMemorizedVerses] = useState([]);
  const [inProgressVerses, setInProgressVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);

  useEffect(() => {
    if (user) {
      api.get('/verses?status=memorized')
        .then((res) => setMemorizedVerses(res.data))
        .catch((err) => console.error('Error fetching memorized verses:', err));
      api.get('/verses?status=in-progress')
        .then((res) => setInProgressVerses(res.data))
        .catch((err) => console.error('Error fetching in-progress verses:', err));
    }
  }, [user]);

  const handleAdd = async (data) => {
    try {
      const res = await api.post('/verses/add', data);
      if (data.status === 'memorized') {
        setMemorizedVerses([...memorizedVerses, res.data]);
      } else {
        setInProgressVerses([...inProgressVerses, res.data]);
      }
    } catch (err) {
      console.error('Error adding verse range:', err.response?.data?.message || err.message);
      alert(`Failed to add verse range: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleEdit = async (id, data) => {
    try {
      const res = await api.put(`/verses/${id}`, data);
      const updatedVerse = res.data;
      if (updatedVerse.status === 'memorized') {
        setMemorizedVerses(memorizedVerses.map(v => v._id === id ? updatedVerse : v));
        setInProgressVerses(inProgressVerses.filter(v => v._id !== id));
      } else {
        setInProgressVerses(inProgressVerses.map(v => v._id === id ? updatedVerse : v));
        setMemorizedVerses(memorizedVerses.filter(v => v._id !== id));
      }
    } catch (err) {
      console.error('Error updating verse range:', err.response?.data?.message || err.message);
      alert(`Failed to update verse range: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this verse range?')) return;
    try {
      await api.delete(`/verses/${id}`);
      setMemorizedVerses(memorizedVerses.filter(v => v._id !== id));
      setInProgressVerses(inProgressVerses.filter(v => v._id !== id));
      setSelectedVerse(null);
    } catch (err) {
      console.error('Error deleting verse range:', err.response?.data?.message || err.message);
      alert(`Failed to delete verse range: ${err.response?.data?.message || 'Unknown error'}`);
    }
  };

  const handleVerseClick = (verse) => {
    setSelectedVerse(verse._id === selectedVerse?._id ? null : verse);
  };

  if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  if (!user) return <div className="text-center text-gray-600 dark:text-gray-300">Please log in to view your progress.</div>;

  return (
    <div className="container mx-auto px-4 ">
      <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">My Memorization Progress</h2>
      <ProgressForm onSubmit={handleAdd} />
      <div className="flex flex-col gap-4 md:flex-row ">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">Memorized</h3>
          <div className="grid md:grid-cols-1 gap-4">
            {memorizedVerses.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">No memorized verses.</p>
            ) : (
              memorizedVerses.map((verse) => (
                <div
                  key={verse._id}
                  className={`${
                    selectedVerse?._id === verse._id ? 'bg-gray-100 fixed inset-0 z-50 overflow-auto p-4 pt-20' : ''
                  }`}
                  onClick={() => handleVerseClick(verse)}
                >
                  <VerseCard
                    verse={verse}
                    isQuranVerse={true}
                    isFullScreen={selectedVerse?._id === verse._id}
                    onCollapse={() => setSelectedVerse(null)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 dark:text-gray-300">In Progress</h3>
          <div className="grid md:grid-cols-1 gap-4">
            {inProgressVerses.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">No in-progress verses.</p>
            ) : (
              inProgressVerses.map((verse) => (
                <div
                  key={verse._id}
                  className={`${
                    selectedVerse?._id === verse._id ? 'fixed inset-0 z-50 overflow-auto p-4' : ''
                  }`}
                  onClick={() => handleVerseClick(verse)}
                >
                  <VerseCard
                    verse={verse}
                    isQuranVerse={true}
                    isFullScreen={selectedVerse?._id === verse._id}
                    onCollapse={() => setSelectedVerse(null)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {selectedVerse && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />}
    </div>
  );
}

export default Progress;
