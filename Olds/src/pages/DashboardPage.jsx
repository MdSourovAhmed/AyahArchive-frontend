// import { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import api from '../utils/api';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function DashboardPage() {
//   const [stats, setStats] = useState({ total: 0, memorized: 0, inProgress: 0 });
//   const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//   useEffect(() => {
//     api.get('/stats').then((res) => {
//       setStats(res.data);
//       setChartData({
//         labels: res.data.books || [],
//         datasets: [
//           {
//             label: 'Verses per Book',
//             data: res.data.bookCounts || [],
//             backgroundColor: '#2DD4BF',
//             borderColor: '#14B8A6',
//             borderWidth: 1,
//           },
//         ],
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4 text-gray-600 dark:text-gray-300">Dashboard</h2>
//       <div className="grid md:grid-cols-3 gap-4 mb-8">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Verses</h3>
//           <p className="text-2xl text-teal-500">{stats.total}</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Memorized</h3>
//           <p className="text-2xl text-teal-500">{stats.memorized}</p>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//           <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">In Progress</h3>
//           <p className="text-2xl text-teal-500">{stats.inProgress}</p>
//         </div>
//       </div>
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//         <Bar
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: { position: 'top' },
//               title: { display: true, text: 'Verses by Book' },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default DashboardPage;










import { useState, useEffect, useContext } from 'react';
import {
  ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip,
  LineChart, Line, Tooltip as LineTooltip, Area, AreaChart,
} from 'recharts';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

// ── Colours ───────────────────────────────────────────────────────────────────
const TEAL   = '#2dd4bf';
const AMBER  = '#fbbf24';
const INDIGO = '#818cf8';
const ROSE   = '#fb7185';

// ── Reusable stat card ────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md p-5 flex items-center gap-4">
      <div className="text-3xl w-12 h-12 flex items-center justify-center rounded-xl bg-white/8 border border-white/10 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-2xl font-bold text-white leading-none">{value ?? '—'}</p>
        {sub && <p className="text-xs text-white/40 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
      <h3 className="text-xs font-bold text-white/35 uppercase tracking-widest mb-5">{title}</h3>
      {children}
    </div>
  );
}

// ── Custom tooltip for charts ─────────────────────────────────────────────────
function GlassTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/20 bg-black/60 backdrop-blur-md px-3 py-2 text-xs">
      {label && <p className="text-white/50 mb-1 font-bold">{label}</p>}
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────
function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView]       = useState('monthly'); // 'monthly' | 'yearly'

  useEffect(() => {
    if (!user) return;
    api.get('/stats')
      .then((res) => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="rounded-2xl border border-white/12 bg-white/7 backdrop-blur-md px-8 py-10 text-center max-w-sm">
        <p className="text-4xl mb-4">🔒</p>
        <p className="text-white/60 text-sm">Please log in to view your dashboard.</p>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-white/30 animate-pulse">Loading dashboard…</p>
    </div>
  );

  if (!stats) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-white/40 text-sm">Could not load stats.</p>
    </div>
  );

  const chartData = view === 'monthly' ? stats.monthly : stats.yearly;
  const xKey      = view === 'monthly' ? 'month' : 'year';

  // Pie data
  const pieData = [
    { name: 'Memorized',   value: stats.memorizedCount,  color: TEAL  },
    { name: 'In Progress', value: stats.inProgressCount, color: AMBER },
  ].filter((d) => d.value > 0);

  // Top 5 surahs by verse count
  const topSurahs = [...(stats.bySurah || [])]
    .sort((a, b) => b.verses - a.verses)
    .slice(0, 6)
    .map((s) => ({ name: `S${s.surahNumber}`, verses: s.verses, memorized: s.memorized }));

  const isEmpty = stats.totalEntries === 0;

  return (
    <div className="min-h-screen px-4 py-8 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
        <p className="text-sm text-white/40">
          Assalamu Alaikum, {user.name || user.email?.split('@')[0]} — here's your progress.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard icon="✅" label="Memorized"    value={stats.memorizedCount}   sub={`${stats.memorizedVerses} verses`} />
        <StatCard icon="📖" label="In Progress"  value={stats.inProgressCount}  sub={`${stats.totalVersesSaved - stats.memorizedVerses} verses`} />
        <StatCard icon="🕌" label="Surahs"        value={stats.uniqueSurahs}     sub="unique surahs" />
        <StatCard icon="🔥" label="Streak"        value={stats.streak}           sub="days in a row" />
      </div>

      {isEmpty ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-16 text-center">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-white/50 text-sm">No data yet — add some verses in My Vault to see your progress here.</p>
        </div>
      ) : (
        <div className="space-y-5">

          {/* Row 1: Pie + Area chart */}
          <div className="grid lg:grid-cols-2 gap-5">

            {/* Pie — memorized vs in-progress */}
            <Section title="Status Breakdown">
              {pieData.length === 0 ? (
                <p className="text-white/30 text-sm text-center py-8">No entries yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                      ))}
                    </Pie>
                    <PieTooltip content={<GlassTooltip />} />
                    <Legend
                      formatter={(value) => (
                        <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="rounded-xl bg-teal-400/10 border border-teal-400/20 px-4 py-3 text-center">
                  <p className="text-2xl font-bold text-teal-300">{stats.memorizedVerses}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">Verses memorized</p>
                </div>
                <div className="rounded-xl bg-amber-400/10 border border-amber-400/20 px-4 py-3 text-center">
                  <p className="text-2xl font-bold text-amber-300">{stats.totalVersesSaved - stats.memorizedVerses}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">Verses in progress</p>
                </div>
              </div>
            </Section>

            {/* Area — verse accumulation over time */}
            <Section title="Verses Saved Over Time">
              <div className="flex gap-2 mb-4">
                {['monthly', 'yearly'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`text-xs font-bold px-3 py-1 rounded-lg border transition-all capitalize ${
                      view === v
                        ? 'bg-teal-500/25 border-teal-400/40 text-teal-300'
                        : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={TEAL}  stopOpacity={0.3} />
                      <stop offset="95%" stopColor={TEAL}  stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey={xKey} tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <LineTooltip content={<GlassTooltip />} />
                  <Area type="monotone" dataKey="verses" name="Verses" stroke={TEAL} strokeWidth={2} fill="url(#tealGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </Section>
          </div>

          {/* Row 2: Bar chart — monthly memorized vs in-progress */}
          <Section title={`Monthly Activity — ${new Date().getFullYear()}`}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.monthly} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <BarTooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="memorized"  name="Memorized"   fill={TEAL}  radius={[4, 4, 0, 0]} maxBarSize={18} />
                <Bar dataKey="inProgress" name="In Progress" fill={AMBER} radius={[4, 4, 0, 0]} maxBarSize={18} />
                <Legend formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{v}</span>} />
              </BarChart>
            </ResponsiveContainer>
          </Section>

          {/* Row 3: Line — yearly trend + Top surahs bar */}
          <div className="grid lg:grid-cols-2 gap-5">

            {/* Line — yearly memorized trend */}
            <Section title="Yearly Memorization Trend">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={stats.yearly} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                  <LineTooltip content={<GlassTooltip />} />
                  <Line type="monotone" dataKey="memorized"  name="Memorized"   stroke={TEAL}   strokeWidth={2.5} dot={{ fill: TEAL,   r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="inProgress" name="In Progress" stroke={INDIGO} strokeWidth={2.5} dot={{ fill: INDIGO, r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  <Legend formatter={(v) => <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{v}</span>} />
                </LineChart>
              </ResponsiveContainer>
            </Section>

            {/* Top surahs horizontal bar */}
            <Section title="Top Surahs by Verses Saved">
              {topSurahs.length === 0 ? (
                <p className="text-white/30 text-sm text-center py-8">No data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topSurahs} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} width={30} />
                    <BarTooltip content={<GlassTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                    <Bar dataKey="verses" name="Verses" fill={ROSE} radius={[0, 4, 4, 0]} maxBarSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Section>
          </div>

          {/* Recent activity */}
          <Section title="Recent Activity">
            {stats.recentActivity.length === 0 ? (
              <p className="text-white/30 text-sm">Nothing yet.</p>
            ) : (
              <div className="divide-y divide-white/8">
                {stats.recentActivity.map((v) => (
                  <div key={v._id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-500/15 border border-teal-400/25 flex items-center justify-center">
                        <span className="text-xs font-bold text-teal-300">{v.surahNumber}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/85">{v.surahName}</p>
                        <p className="text-xs text-white/35">Verses {v.verseRange}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        v.status === 'memorized'
                          ? 'bg-teal-400/15 border-teal-400/25 text-teal-300'
                          : 'bg-amber-400/15 border-amber-400/25 text-amber-300'
                      }`}>
                        {v.status === 'memorized' ? '✓ Memorized' : '⋯ In Progress'}
                      </span>
                      <span className="text-xs text-white/25">
                        {new Date(v.createdAt).toLocaleDateString('en-BD', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>

        </div>
      )}
    </div>
  );
}

export default DashboardPage;