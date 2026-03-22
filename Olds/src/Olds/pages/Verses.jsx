import { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import VerseList from '../components/VerseList';
import VerseForm from '../components/VerseForm';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';

function Verses() {
  const [verses, setVerses] = useState([]);
  const [filteredVerses, setFilteredVerses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editVerse, setEditVerse] = useState(null);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      api.get('/verses').then((res) => {
        setVerses(res.data);
        setFilteredVerses(res.data);
      });
    }
  }, [user]);

  const handleSearch = ({ term, filterType }) => {
    if (!term) {
      setFilteredVerses(verses);
      return;
    }
    const lowerTerm = term.toLowerCase();
    setFilteredVerses(
      verses.filter((v) => {
        if (filterType === 'all') {
          return (
            v.book.toLowerCase().includes(lowerTerm) ||
            v.chapter.toString().includes(lowerTerm) ||
            v.text.toLowerCase().includes(lowerTerm) ||
            v.theme.some((t) => t.toLowerCase().includes(lowerTerm)) ||
            v.status.toLowerCase().includes(lowerTerm)
          );
        }
        if (filterType === 'book') return v.book.toLowerCase().includes(lowerTerm);
        if (filterType === 'chapter') return v.chapter.toString().includes(lowerTerm);
        if (filterType === 'text') return v.text.toLowerCase().includes(lowerTerm);
        if (filterType === 'theme') return v.theme.some((t) => t.toLowerCase().includes(lowerTerm));
        if (filterType === 'status') return v.status.toLowerCase().includes(lowerTerm);
        return false;
      })
    );
  };

  const handleAdd = async (verse) => {
    const res = await api.post('/verses', verse);
    setVerses([...verses, res.data]);
    setFilteredVerses([...verses, res.data]);
    setShowForm(false);
  };

  const handleEdit = async (verse) => {
    const res = await api.put(`/verses/${editVerse._id}`, verse);
    setVerses(verses.map((v) => (v._id === editVerse._id ? res.data : v)));
    setFilteredVerses(filteredVerses.map((v) => (v._id === editVerse._id ? res.data : v)));
    setShowForm(false);
    setEditVerse(null);
  };

  const handleDelete = async (id) => {
    await api.delete(`/verses/${id}`); 
    setVerses(verses.filter((v) => v._id !== id));
    setFilteredVerses(filteredVerses.filter((v) => v._id !== id));
  };

  if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>;
  if (!user) return <div className="text-center text-gray-600 dark:text-gray-300">Please log in to view verses.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-600 dark:text-gray-300">My Verses</h2>
      <button
        onClick={() => setShowForm(true)}
        className="mb-4 bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
      >
        Add Verse
      </button>
      <SearchBar onSearch={handleSearch} />
      <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditVerse(null); }}>
        <VerseForm onSubmit={editVerse ? handleEdit : handleAdd} initialData={editVerse} />
      </Modal>
      <VerseList verses={filteredVerses} onEdit={setEditVerse} onDelete={handleDelete} />
    </div>
  );
}

export default Verses;
