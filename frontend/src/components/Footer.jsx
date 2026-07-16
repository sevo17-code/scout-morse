import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleAdminRedirect = () => {
    navigate('/login');
  };

  return (
    <footer className="bg-scout-dark text-white/80 border-t-4 border-scout-gold mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">

          {/* القسم الأول: اللوجو وبيان الرعاية */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src="/logo.png" 
                alt="شعار Scout Morse" 
                className="w-14 h-14 object-contain rounded-full border-2 border-scout-gold bg-white p-1" 
              />
              <span className="text-2xl font-bold text-scout-gold">Scout Morse</span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs text-center md:text-right">
              منصة تعلم شفرة مورس بالعربي، برعاية مجموعة النسر الذهبي الكشفية.
            </p>
          </div>

          {/* القسم الثاني: روابط سريعة */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-scout-gold mb-4 border-b-2 border-scout-gold/40 pb-2">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-scout-gold transition">الرئيسية</Link></li>
              <li><Link to="/learning" className="hover:text-scout-gold transition">طريقة التعلم</Link></li>
              <li><Link to="/exercises" className="hover:text-scout-gold transition">التدريبات</Link></li>
              <li><Link to="/leaderboard" className="hover:text-scout-gold transition">لوحة الصدارة</Link></li>
            </ul>
          </div>

          {/* القسم الثالث: حسابات التواصل الاجتماعي */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-scout-gold mb-4 border-b-2 border-scout-gold/40 pb-2">تواصل مع النسر الذهبي</h3>
            <div className="flex gap-4 text-3xl">
              <a 
                href="https://www.facebook.com/GoldenEagleGroupGEG/followers"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-scout-gold hover:scale-110 transition-transform duration-300"
                aria-label="فيسبوك"
              >
                <FaFacebook />
              </a>
              <a 
                href="https://www.youtube.com/@GoldenEagleGroupGEG"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-600 hover:text-scout-gold hover:scale-110 transition-transform duration-300"
                aria-label="يوتيوب"
              >
                <FaYoutube />
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">تابعنا</p>
          </div>
        </div>

        {/* السطر السفلي مع الزر المخفي */}
        <div className="border-t border-white/10 mt-8 pt-4 text-center text-xs text-gray-500 relative">
          <p>Scout Morse © جميع الحقوق محفوظة {new Date().getFullYear()}</p>
          
          <button 
            onClick={handleAdminRedirect}
            className="absolute left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 text-[10px] text-gray-700 hover:text-scout-gold transition duration-300 bg-gray-900/30 px-3 py-1 rounded-full hover:bg-gray-800/50"
            title="دخول المشرف"
          >
            <FaShieldAlt className="inline-block ml-1" /> دخول المشرف
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;