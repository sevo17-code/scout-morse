// src/pages/Leaderboard.jsx
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { examApi } from '../api/endpoints.js';
import LeaderboardTable from '../components/LeaderboardTable.jsx';

export default function Leaderboard() {
  const location = useLocation();
  const [entries, setEntries] = useState(null);
  const [error, setError] = useState('');
  const justFinished = location.state?.justFinished;
  const result = location.state?.result;

  useEffect(() => {
    examApi
      .leaderboard()
      .then((res) => setEntries(res.data.leaderboard))
      .catch(() => setError('حصل خطأ في جلب لوحة الصدارة'));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-center mb-2">لوحة الصدارة</h1>
      <p className="text-gray-500 text-center mb-6">أعلى نتائج الكشافة في امتحان شفرة مورس</p>

      {justFinished && result && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-6">
          <p className="font-bold text-green-700">
            خلصت الامتحان! نتيجتك: {result.score}/{result.total}
          </p>
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}
      {!entries && !error && <p className="text-center text-gray-400">جاري التحميل...</p>}
      {entries && <LeaderboardTable entries={entries} />}
    </div>
  );
}
