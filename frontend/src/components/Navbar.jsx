import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-scout-dark border-b-4 border-scout-gold shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="شعار Scout Morse" className="h-12 w-auto" />
          <span className="text-2xl font-bold text-scout-gold font-arabic hidden sm:block">
            Scout Morse
          </span>
        </Link>

        <div className="flex items-center gap-4 text-white">
          <Link to="/" className="hover:text-scout-gold transition">الرئيسية</Link>
          <Link to="/exercises" className="bg-scout-gold text-scout-dark px-4 py-2 rounded-lg font-bold hover:bg-scout-darkGold transition">
            ابدأ التدريب
          </Link>
          <Link to="/exam" className="hover:text-scout-gold transition">الامتحان</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;