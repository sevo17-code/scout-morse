import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState(''); // 🔥 الحقل الجديد
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, adminCode }), // 🔥 بنبعت الرقم مع البيانات
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'حصل خطأ');
      }

      // بعد ما ينجح التسجيل
      login(data.token, data.user);
      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-scout-green mb-6">إنشاء حساب جديد</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">الاسم الكامل</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scout-gold"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scout-gold"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scout-gold"
            required
            minLength={6}
          />
        </div>

        {/* 🔥 حقل رقم الأدمن (اختياري) */}
        <div>
          <label className="block text-gray-700 mb-2">
            رقم الأدمن (اختياري - للمشرفين فقط)
          </label>
          <input
            type="text"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
            placeholder="أدخل الكود السري إن كنت مشرفاً"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-scout-gold"
          />
          <p className="text-xs text-gray-500 mt-1">اتركه فارغاً إذا كنت مستخدم عادي</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-scout-gold text-scout-dark font-bold py-3 rounded-lg hover:bg-scout-darkGold transition disabled:opacity-50"
        >
          {loading ? 'جاري التسجيل...' : 'إنشاء الحساب'}
        </button>
      </form>

      <p className="text-center text-gray-600 mt-4">
        لديك حساب بالفعل؟ <Link to="/login" className="text-scout-gold font-bold hover:underline">سجل دخول</Link>
      </p>
    </div>
  );
};

export default Register;