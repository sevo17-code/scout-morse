// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'حصل خطأ، حاول تاني');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="الإيميل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-center focus:outline-none focus:border-scout"
          required
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-center focus:outline-none focus:border-scout"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-scout hover:bg-scout-dark text-white rounded-xl py-3 font-bold transition disabled:opacity-50"
        >
          {loading ? 'جاري الدخول...' : 'دخول'}
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        مفيش حساب؟{' '}
        <Link to="/register" className="text-scout font-semibold">
          سجل دلوقتي
        </Link>
      </p>
    </div>
  );
}
