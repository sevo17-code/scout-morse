// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { adminApi, questionsApi } from '../api/endpoints.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([adminApi.stats(), adminApi.users(), questionsApi.getAll()])
      .then(([statsRes, usersRes, questionsRes]) => {
        setStats(statsRes.data);
        setUsers(usersRes.data.users);
        setQuestions(questionsRes.data.questions);
      })
      .catch(() => setError('حصل خطأ في جلب بيانات لوحة التحكم'));
  }, []);

  async function toggleQuestion(id, isActive) {
    await questionsApi.update(id, { isActive: !isActive });
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, isActive: !isActive } : q)));
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!stats) return <p className="text-center text-gray-400">جاري التحميل...</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">لوحة تحكم الأدمن</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['المستخدمين', stats.totalUsers],
          ['محاولات الامتحان', stats.totalAttempts],
          ['الأسئلة المفعّلة', stats.activeQuestions],
          ['متوسط النتيجة', stats.averageScore],
        ].map(([label, value]) => (
          <div key={label} className="bg-white rounded-2xl shadow-md p-5 text-center">
            <div className="text-2xl font-bold text-scout">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
        <h2 className="font-bold mb-4">المستخدمين ({users.length})</h2>
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-right p-2">الاسم</th>
              <th className="text-right p-2">الإيميل</th>
              <th className="text-right p-2">الصلاحية</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-gray-100">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role === 'ADMIN' ? 'أدمن' : 'مستخدم'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 overflow-x-auto">
        <h2 className="font-bold mb-4">بنك الأسئلة ({questions.length})</h2>
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-right p-2">الحرف</th>
              <th className="text-right p-2">مورس</th>
              <th className="text-right p-2">النوع</th>
              <th className="text-right p-2">مفعّل؟</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} className="border-t border-gray-100">
                <td className="p-2">{q.letter}</td>
                <td className="p-2" dir="ltr">
                  {q.morseCode}
                </td>
                <td className="p-2">{q.type === 'LETTER_TO_MORSE' ? 'حرف➔مورس' : 'مورس➔حرف'}</td>
                <td className="p-2">
                  <button
                    onClick={() => toggleQuestion(q.id, q.isActive)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      q.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {q.isActive ? 'مفعّل' : 'معطّل'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
