import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../utils/api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, memorized: 0, inProgress: 0 });
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    api.get('/stats').then((res) => {
      setStats(res.data);
      setChartData({
        labels: res.data.books || [],
        datasets: [
          {
            label: 'Verses per Book',
            data: res.data.bookCounts || [],
            backgroundColor: '#2DD4BF',
            borderColor: '#14B8A6',
            borderWidth: 1,
          },
        ],
      });
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-600 dark:text-gray-300">Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Verses</h3>
          <p className="text-2xl text-teal-500">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Memorized</h3>
          <p className="text-2xl text-teal-500">{stats.memorized}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">In Progress</h3>
          <p className="text-2xl text-teal-500">{stats.inProgress}</p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Verses by Book' },
            },
          }}
        />
      </div>
    </div>
  );
}

export default DashboardPage;