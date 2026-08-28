// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center" dir="rtl">

      {/* Hero */}
      <div className="bg-white rounded-2xl shadow-md p-10 mb-6">
        <h1 className="text-4xl font-bold text-scout-dark mb-3">مرحباً بك في Scout Morse</h1>
        <p className="text-gray-500 mb-8 text-lg">
          تعلم شفرة مورس بالعربي مع مجموعة النسر الذهبي الكشفية
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/exercises"
            className="bg-scout-gold hover:bg-yellow-400 text-scout-dark rounded-xl px-8 py-3 font-bold transition text-lg"
          >
            ابدأ التدريب
          </Link>
          <Link
            to="/exam"
            className="bg-gray-100 hover:bg-gray-200 text-scout-dark rounded-xl px-8 py-3 font-bold transition text-lg"
          >
            اعمل امتحان
          </Link>
        </div>
      </div>

      {/* بطاقات المستويات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-6 text-right border-r-4 border-scout-gold">
          <h3 className="text-xl font-bold text-scout-dark mb-1">المستوى الأول</h3>
          <p className="text-gray-500 text-sm">حروف مفردة - إعادة صوت غير محدودة</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-right border-r-4 border-green-500">
          <h3 className="text-xl font-bold text-scout-dark mb-1">المستوى الثاني</h3>
          <p className="text-gray-500 text-sm">كلمات - 5 إعادات للصوت</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-right border-r-4 border-blue-500">
          <h3 className="text-xl font-bold text-scout-dark mb-1">المستوى الثالث</h3>
          <p className="text-gray-500 text-sm">آيات - إعادتان للصوت</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 text-right border-r-4 border-purple-600">
          <h3 className="text-xl font-bold text-scout-dark mb-1">المستوى الرابع</h3>
          <p className="text-gray-500 text-sm">كلمات وآيات - بدون إعادة</p>
        </div>
      </div>

    </div>
  );
}