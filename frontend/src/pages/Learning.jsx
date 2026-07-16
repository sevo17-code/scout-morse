import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Learning = () => {
  // المجموعات الأساسية لطريقة كابتن ماثيو (تم إضافة المجموعة الصفرية)
  const groups = [
    { id: 1, title: 'المجموعة الصفرية (هـ - ص - ذ - ط)', letters: 'هـ / ص / ذ / ط', morse: '..-.. / -..- / --.. / ..-' },
    { id: 2, title: 'المجموعة الأولى (النقاط المتتالية)', letters: 'ء / ي / س / ح', morse: '. / .. / ... / ....' },
    { id: 3, title: 'المجموعة الثانية (الشرطات المتتالية)', letters: 'ت / م / ش / خ', morse: '- / -- / --- / ----' },
    { id: 4, title: 'المجموعة الثالثة (نقطة + شرطات)', letters: 'ا / و / ج', morse: '.- / .-- / .---' },
    { id: 5, title: 'المجموعة الرابعة (شرطة + نقاط)', letters: 'د / ب', morse: '-.. / -...' },
    { id: 6, title: 'المجموعة الخامسة (ر و ك)', letters: 'ر / ك', morse: '.-. / -.-' },
    { id: 7, title: 'المجموعة السادسة (ث و ع)', letters: 'ث / ع', morse: '-.-. / .-.-' },
    { id: 8, title: 'المجموعة السابعة (ز و ض)', letters: 'ز / ض', morse: '---. / ...-' },
    { id: 9, title: 'المجموعة الثامنة (ظ و ل)', letters: 'ظ / ل', morse: '-.-- / .-..' },
    { id: 10, title: 'المجموعة التاسعة (ف و ق)', letters: 'ف / ق', morse: '..-. / --.-' },
  ];

  // طرق إضافية لتسهيل الحفظ (بدون إموجيز)
  const extraTips = [
    {
      title: 'طريقة الإيقاع',
      desc: 'أنطق النقطة (.) كـ "تِك" والشرطة (-) كـ "تاك". مثلاً: "-.-." تبقى "تاك - تِك - تاك - تِك". كررها بصوت عالٍ.',
    },
    {
      title: 'طريقة التقسيم',
      desc: 'قسم الكلمات الطويلة إلى أجزاء. مثلاً كلمة "مورس" = "--" (م) + "---" (و) + ".-." (ر) + "..." (س). ركز على جزء جزء.',
    },
    {
      title: 'الارتباط البصري',
      desc: 'ارسم الحرف واربطه بنمط المورس. مثلاً: حرف "أ" شكله يشبه النقطة والشرطة (.-) تخيلها كهمزة فوق الألف.',
    },
    {
      title: 'الاختبار الذاتي بالبطاقات',
      desc: 'اكتب الحروف على بطاقات، واكتب المورس خلفها. خصص يومياً مراجعة ٣ مجموعات واختبر نفسك قبل النوم.',
    },
    {
      title: 'التحدي الأسبوعي',
      desc: 'خصص أسبوعاً لكل مجموعة، وحاول في نهاية الأسبوع كتابة كلمات كاملة باستخدام الحروف المحفوظة، ثم انتقل للمجموعة التالية.',
    },
  ];

  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6 font-arabic" dir="rtl">
      <h1 className="text-4xl font-bold text-scout-gold text-center mb-2">طريقة كابتن ماثيو</h1>
      <p className="text-center text-gray-600 mb-10 text-lg">
        طريقة لحفظ شفرة مورس بتقسيم الحروف إلى مجموعات متشابهة
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => setSelectedGroup(group.id === selectedGroup ? null : group.id)}
            className="bg-white rounded-xl shadow-lg p-5 border-r-4 border-scout-gold cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-bold text-scout-dark mb-2">{group.title}</h3>
            <div className="flex justify-between items-center bg-scout-cream p-3 rounded-lg">
              <span className="text-2xl font-bold text-scout-green">{group.letters}</span>
              <span className="text-xl text-scout-gold font-mono bg-white px-3 py-1 rounded-md shadow-inner">
                {group.morse}
              </span>
            </div>
            {selectedGroup === group.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-700 border border-blue-200"
              >
                نصيحة: ركز على تشابه النمط. كل الحروف في المجموعة تزيد عليها نقطة أو شرطة واحدة.
                <br />
                <span className="font-bold text-scout-gold">مثال:</span> حرف "ء" = نقطة، "ي" = نقطتين، "س" = ٣ نقاط، "ح" = ٤ نقاط.
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-scout-cream to-white rounded-2xl p-8 shadow-xl border border-scout-gold/20">
        <h2 className="text-3xl font-bold text-scout-dark text-center mb-8">
          طرق إضافية لتسهيل الحفظ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {extraTips.map((tip, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100">
              <h3 className="text-xl font-bold text-scout-gold mb-2">{tip.title}</h3>
              <p className="text-gray-700 leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learning;