import VerseCard from './VerseCard'; // Added import

function VerseList({ verses, onEdit, onDelete }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {verses.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No verses added yet.</p>
      ) : (
        verses.map((verse) => (
          <VerseCard
            key={verse._id}
            verse={verse}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default VerseList;