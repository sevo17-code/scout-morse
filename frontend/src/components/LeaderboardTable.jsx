// src/components/LeaderboardTable.jsx
export default function LeaderboardTable({ entries }) {
  if (!entries || entries.length === 0) {
    return <p className="text-center text-gray-400 py-10">لا توجد نتائج مسجلة بعد.</p>;
  }

  const rankColors = {
    1: 'bg-yellow-200 text-yellow-800',
    2: 'bg-gray-200 text-gray-600',
    3: 'bg-orange-200 text-orange-800',
  };

  return (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr className="text-gray-500 text-sm">
          <th className="p-3 text-right w-20">الترتيب</th>
          <th className="p-3 text-right">الاسم</th>
          <th className="p-3 text-left w-24">النقاط</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => {
          const rank = index + 1;
          return (
            <tr key={`${entry.name}-${rank}`} className="border-b border-gray-100">
              <td className="p-3">
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-sm ${
                    rankColors[rank] || 'bg-gray-50 text-gray-500'
                  }`}
                >
                  {rank}
                </span>
              </td>
              <td className="p-3">{entry.name}</td>
              <td className="p-3 text-left font-bold text-scout">
                {entry.score}/{entry.total}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
