import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-scout-dark border-b-4 border-scout-gold shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* اللوجو + الاسم */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="شعار Scout Morse" className="h-12 w-auto" />
          <span className="text-2xl font-bold text-scout-gold font-arabic hidden sm:block">
            Scout Morse
          </span>
        </Link>

        {/* الروابط المركزية */}
        <div className="flex items-center gap-4 text-white">
          <Link to="/" className="hover:text-scout-gold transition">الرئيسية</Link>
          
          {isAuthenticated && (
            <>
              <Link to="/learning" className="hover:text-scout-gold transition">طريقة التعلم</Link>
              <Link to="/exercises" className="bg-scout-gold text-scout-dark px-4 py-2 rounded-lg font-bold hover:bg-scout-darkGold transition">
                ابدأ التدريب
              </Link>
              <Link to="/leaderboard" className="hover:text-scout-gold transition">لوحة الصدارة</Link>
            </>
          )}
        </div>

        {/* الأزرار الجانبية (يمين) */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {user?.role === 'ADMIN' && (
                <Link 
                  to="/admin" 
                  className="bg-scout-red text-white px-3 py-1 rounded-lg text-sm font-bold hover:bg-red-700 transition"
                >
                  لوحة الأدمن
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                تسجيل خروج
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-scout-gold transition">دخول</Link>
              <Link to="/register" className="bg-scout-gold text-scout-dark px-4 py-2 rounded-lg font-bold hover:bg-scout-darkGold transition">
                تسجيل جديد
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;