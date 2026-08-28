// src/pages/Exam.jsx
import { useState, useCallback } from 'react';
import { arabicLettersMorse, playMorseAudio } from '../utils/morseHelpers.js';
import { FaEye, FaVolumeUp, FaRedo, FaFlagCheckered, FaArrowLeft, FaHome, FaCheck, FaStar } from 'react-icons/fa';

// ===== البيانات =====

const WORDS = [
  'بيبسي','ابطال','ازرق','مورس','ايفون',
  'نور','باب','ماء','سما','دار','قمر','نار','ورد','بحر','جبل',
  'كتاب','مدرسة','طريق','سلام','شجرة',
  'خيمة','حبل','بوصلة','خريطة','معسكر','طليعة',
];

const VERSES = [
  'لتكن احقاوكم مشدودة وسرجكم موقدة',
  'احملوا بعضكم اثقال بعض وهكذا تمموا ناموس المسيح',
  'اثنان خير من واحد لان لهما جزاء صالحا لعملهما لانه ان سقط احدهما يقيمه رفيقه',
  'لا يستهن احد بصغر سنك بل كن قدوة للمومنين في الكلام في التصرف في المحبة في الروح في الايمان في الطهارة',
  'استطيع كل شيء في المسيح الذي يقويني',
  'لانه هكذا احب الله العالم حتى بذل ابنه الوحيد لكي لا يهلك كل من يومن به بل تكون له الحياة الابدية',
  'المحبة تتانى وترفق المحبة لا تحسد المحبة لا تتفاخر ولا تنتفخ وتصبر على كل شيء',
  'الرب راعي فلا يعوزني شيء',
  'لاني عرفت الافكار التي انا مفكر بها عنكم يقول الرب افكار سلام لا شر لاعطيكم رجاء وعاقبة',
  'توكل على الرب بكل قلبك وعلى فهمك لا تعتمد في كل طرقك اعرفه وهو يقوم سبلك',
  'لكن اطلبوا اولا ملكوت الله وبره وهذه كلها تزاد لكم',
  'اما منتظرو الرب فيجددون قوة يرفعون اجنحة كالنسر يركضون ولا يتعبون يمشون ولا يغبون',
  'في البدء خلق الله السماوات والارض',
  'تعالوا الي يا جميع المتعبين والثقيلي الاحمال وانا اريحكم',
  'في البدء كان الكلمة والكلمة كان عند الله وكان الكلمة الله',
  'انا هو الطريق والحق والحياة ليس احد ياتي الى الاب الا بي',
  'الساكن في ستر العلي في ظل القدير يبيت',
  'ونحن نعلم ان كل الامور تعمل معا للخير للذين يحبون الله',
  'وتعرفون الحق والحق يحرركم',
];

// ===== إعدادات المستويات =====
const LEVELS = [
  { id: 1, name: 'المستوى الأول',  desc: 'حروف مفردة',              replays: Infinity, type: 'letters' },
  { id: 2, name: 'المستوى الثاني', desc: 'كلمات (5 إعادات)',         replays: 5,        type: 'words'   },
  { id: 3, name: 'المستوى الثالث', desc: 'آيات (إعادتان)',           replays: 2,        type: 'verses'  },
  { id: 4, name: 'المستوى الرابع', desc: 'كلمات وآيات - بدون إعادة', replays: 0,        type: 'mixed'   },
];

const QUESTIONS_PER_EXAM = 10;

// ===== دوال مساعدة =====

function normalizeArabic(str) {
  return str
    .replace(/[أإآا]/g, 'ا')
    .replace(/[ةه]/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim();
}

function textToMorse(text) {
  return text
    .split('')
    .map((ch) => arabicLettersMorse[ch] || (ch === ' ' ? '/' : ''))
    .filter(Boolean)
    .join(' ');
}

function generateQuestions(levelType) {
  let pool = [];
  if (levelType === 'letters') {
    pool = Object.keys(arabicLettersMorse).map((letter) => ({
      prompt: letter, morse: arabicLettersMorse[letter], isVisual: Math.random() < 0.5,
    }));
  } else if (levelType === 'words') {
    pool = WORDS.map((word) => ({
      prompt: word, morse: textToMorse(word), isVisual: Math.random() < 0.5,
    }));
  } else if (levelType === 'verses') {
    pool = VERSES.map((verse) => ({
      prompt: verse, morse: textToMorse(verse), isVisual: Math.random() < 0.5,
    }));
  } else {
    pool = [
      ...WORDS.map((w) => ({ prompt: w, morse: textToMorse(w), isVisual: Math.random() < 0.5 })),
      ...VERSES.map((v) => ({ prompt: v, morse: textToMorse(v), isVisual: Math.random() < 0.5 })),
    ];
  }
  return [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_EXAM);
}

function checkAnswer(userAnswer, question) {
  const correct = normalizeArabic(question.prompt);
  const given   = normalizeArabic(userAnswer);
  if (correct === given) return { score: correct.length, total: correct.length, perfect: true };
  let score = 0;
  const minLen = Math.min(correct.length, given.length);
  for (let i = 0; i < minLen; i++) {
    if (correct[i] === given[i]) score++;
  }
  return { score, total: correct.length, perfect: false };
}

// ===== مكون بطاقة المستوى =====

function LevelCard({ level, onSelect }) {
  const colors = [
    'from-scout-gold to-yellow-400',
    'from-green-500 to-emerald-400',
    'from-blue-500 to-cyan-400',
    'from-purple-600 to-pink-500',
  ];
  return (
    <button
      onClick={() => onSelect(level)}
      className={`bg-gradient-to-br ${colors[level.id - 1]} text-white rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-200 text-right w-full`}
    >
      <div className="text-2xl font-bold mb-1">{level.name}</div>
      <div className="text-sm opacity-90 mb-2">{level.desc}</div>
      <div className="flex items-center gap-1 text-xs opacity-75">
        <FaVolumeUp size={11} />
        <span>
          {level.replays === Infinity ? 'إعادة غير محدودة'
            : level.replays > 0 ? `${level.replays} إعادات`
            : 'بدون إعادة'}
        </span>
      </div>
    </button>
  );
}

// ===== مكون النتيجة =====

function ResultScreen({ results, questions, onRestart, onHome }) {
  const total = results.reduce((sum, r) => sum + r.total, 0);
  const score = results.reduce((sum, r) => sum + r.score, 0);
  const pct   = Math.round((score / total) * 100);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8" dir="rtl">
      <h2 className="text-3xl font-bold text-center mb-2 text-scout-dark">نتيجتك</h2>
      <div className="text-center mb-6">
        <span className="text-6xl font-bold text-scout-gold">{pct}%</span>
        <p className="text-gray-500 mt-1">{score} حرف صح من {total}</p>
      </div>

      <div className="space-y-3 mb-8 max-h-72 overflow-y-auto">
        {results.map((r, i) => (
          <div
            key={i}
            className={`flex justify-between items-center p-3 rounded-xl ${r.perfect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
          >
            <span className={`font-bold flex items-center gap-1 ${r.perfect ? 'text-green-600' : 'text-red-500'}`}>
              {r.perfect ? <FaCheck size={14} /> : `${r.score}/${r.total}`}
            </span>
            <span className="text-gray-700 text-sm truncate max-w-xs">{questions[i].prompt}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 bg-scout-gold text-scout-dark font-bold py-3 rounded-xl hover:bg-yellow-400 transition"
        >
          <FaRedo size={14} /> حاول تاني
        </button>
        <button
          onClick={onHome}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
        >
          <FaHome size={14} /> الرئيسية
        </button>
      </div>
    </div>
  );
}

// ===== الصفحة الرئيسية =====

export default function Exam() {
  const [phase, setPhase]         = useState('home');
  const [selectedLevel, setLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent]     = useState(0);
  const [answer, setAnswer]       = useState('');
  const [results, setResults]     = useState([]);
  const [replaysLeft, setReplays] = useState(0);

  function startExam(level) {
    const qs = generateQuestions(level.type);
    setLevel(level);
    setQuestions(qs);
    setCurrent(0);
    setAnswer('');
    setResults([]);
    setReplays(level.replays === Infinity ? 999 : level.replays);
    setPhase('exam');
    if (!qs[0].isVisual) setTimeout(() => playMorseAudio(qs[0].morse), 400);
  }

  const handleReplay = useCallback(() => {
    if (replaysLeft <= 0) return;
    playMorseAudio(questions[current].morse);
    if (selectedLevel.replays !== Infinity) setReplays((r) => r - 1);
  }, [replaysLeft, questions, current, selectedLevel]);

  function handleNext() {
    const q = questions[current];
    const result = checkAnswer(answer, q);
    const newResults = [...results, result];
    setResults(newResults);
    setAnswer('');
    if (current + 1 >= questions.length) {
      setPhase('result');
    } else {
      const nextQ = questions[current + 1];
      setCurrent((c) => c + 1);
      setReplays(selectedLevel.replays === Infinity ? 999 : selectedLevel.replays);
      if (!nextQ.isVisual) setTimeout(() => playMorseAudio(nextQ.morse), 300);
    }
  }

  // شاشة الاختيار
  if (phase === 'home') {
    return (
      <div className="max-w-2xl mx-auto" dir="rtl">
        <h1 className="text-3xl font-bold text-center text-scout-dark mb-2">امتحان شفرة مورس</h1>
        <p className="text-center text-gray-500 mb-8">اختار المستوى المناسب</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LEVELS.map((lvl) => (
            <LevelCard key={lvl.id} level={lvl} onSelect={startExam} />
          ))}
        </div>
      </div>
    );
  }

  // شاشة النتيجة
  if (phase === 'result') {
    return (
      <ResultScreen
        results={results}
        questions={questions}
        onRestart={() => startExam(selectedLevel)}
        onHome={() => setPhase('home')}
      />
    );
  }

  // شاشة الامتحان
  const q = questions[current];
  const progress = Math.round((current / questions.length) * 100);

  return (
    <div className="max-w-lg mx-auto" dir="rtl">
      {/* شريط التقدم */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>{selectedLevel.name}</span>
          <span>السؤال {current + 1} / {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-scout-gold h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* بطاقة السؤال */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-4 text-center">

        {/* نوع السؤال */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-4 uppercase tracking-wide">
          {q.isVisual
            ? <><FaEye size={12} /> اقرأ وحول للمورس</>
            : <><FaVolumeUp size={12} /> استمع واكتب الحروف</>
          }
        </div>

        {q.isVisual ? (
          <div className="bg-scout-cream rounded-xl p-6 mb-4">
            <p className="text-3xl font-bold text-scout-dark leading-relaxed">{q.prompt}</p>
          </div>
        ) : (
          <div className="bg-scout-cream rounded-xl p-6 mb-4">
            <div className="flex justify-center mb-2">
              <FaVolumeUp size={48} className="text-scout-gold" />
            </div>
            <p className="text-gray-500 text-sm">استمع للصوت واكتب الحروف العربية</p>
          </div>
        )}

        {/* زر إعادة الصوت */}
        {!q.isVisual && (
          <button
            onClick={handleReplay}
            disabled={replaysLeft <= 0}
            className="mb-4 flex items-center gap-2 mx-auto px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold transition"
          >
            <FaRedo size={12} />
            إعادة الصوت
            {selectedLevel.replays !== Infinity && selectedLevel.replays > 0 && (
              <span className="text-scout-gold">({replaysLeft} متبقية)</span>
            )}
            {selectedLevel.replays === Infinity && (
              <span className="text-green-500">(غير محدود)</span>
            )}
          </button>
        )}

        {/* حقل الإجابة */}
        <input
          autoFocus
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && answer.trim() && handleNext()}
          className="w-full border-2 border-gray-200 rounded-xl p-3 text-center text-xl focus:outline-none focus:border-scout-gold transition"
          placeholder={q.isVisual ? 'اكتب شفرة مورس...' : 'اكتب الحروف العربية...'}
          dir={q.isVisual ? 'ltr' : 'rtl'}
        />
      </div>

      {/* زر التالي */}
      <button
        onClick={handleNext}
        disabled={!answer.trim()}
        className="w-full flex items-center justify-center gap-2 bg-scout-gold text-scout-dark font-bold py-4 rounded-2xl text-lg hover:bg-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        {current + 1 >= questions.length
          ? <><FaFlagCheckered size={16} /> إنهاء الامتحان</>
          : <>التالي <FaArrowLeft size={14} /></>
        }
      </button>
    </div>
  );
}