// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-md p-10">
      <h1 className="text-3xl font-bold mb-4">مرحباً بك في Scout Morse</h1>
      <p className="text-gray-500 mb-8">
        {user ? `أهلاً بك، ${user.name} 👋` : 'سجل دخولك عشان تقدر تعمل الامتحان وتشوف تقدمك'}
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          to="/exercises"
          className="bg-scout hover:bg-scout-dark text-white rounded-xl px-6 py-3 font-bold transition"
        >
          ابدأ التدريب
        </Link>
        <Link
          to="/leaderboard"
          className="bg-gray-100 hover:bg-gray-200 rounded-xl px-6 py-3 font-bold transition"
        >
          لوحة الصدارة
        </Link>
      </div>
    </div>
  );
}
