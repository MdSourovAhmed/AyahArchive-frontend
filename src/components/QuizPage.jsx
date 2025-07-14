import { useState, useEffect } from 'react';
import api from '../utils/api';

function QuizPage() {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    api.get('/quiz').then((res) => setQuestion(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/quiz/answer', { questionId: question.id, answer });
      setFeedback(res.data.correct ? 'Correct!' : 'Try again!');
      if (res.data.correct) {
        setTimeout(() => {
          api.get('/quiz').then((res) => {
            setQuestion(res.data);
            setAnswer('');
            setFeedback('');
          });
        }, 1000);
      }
    } catch (err) {
      setFeedback('Error submitting answer');
    }
  };

  if (!question) return <div className="text-center dark:border-gray-600 text-gray-600 dark:text-gray-300">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Quiz</h2>
      <p className="text-gray-600 dark:text-gray-300">{question.text}</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border dark:border-gray-600 rounded-lg dark:bg-gray-700"
          placeholder="Enter your answer"
        />
        <button
          type="submit"
          className="mt-2 w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600"
        >
          Submit
        </button>
      </form>
      {feedback && (
        <p
          className={`mt-2 text-center ${
            feedback === 'Correct!' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
}

export default QuizPage;