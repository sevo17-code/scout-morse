// src/pages/Exercises.jsx
import { useState } from 'react';
import { arabicLettersMorse, getRandomLetter } from '../utils/morseHelpers.js';
import MorsePlayer from '../components/MorsePlayer.jsx';

export default function Exercises() {
  const [mode, setMode] = useState(null); // 'text-to-morse' | 'morse-to-text'
  const [letter, setLetter] = useState('');
  const [morseInput, setMorseInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(() =>
    Number(localStorage.getItem('scoutmorse_highscore') || 0)
  );
  const [feedback, setFeedback] = useState(null);

  function startMode(newMode) {
    setMode(newMode);
    setLetter(getRandomLetter());
    setMorseInput('');
    setTextInput('');
    setFeedback(null);
  }

  function nextQuestion() {
    setLetter(getRandomLetter());
    setMorseInput('');
    setTextInput('');
    setFeedback(null);
  }

  function checkAnswer() {
    const isCorrect =
      mode === 'text-to-morse'
        ? morseInput === arabicLettersMorse[letter]
        : textInput.trim() === letter;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highScore) {
        setHighScore(newStreak);
        localStorage.setItem('scoutmorse_highscore', String(newStreak));
      }
      setFeedback('correct');
    } else {
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(nextQuestion, 700);
  }

  if (!mode) {
    return (
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-2">اختر نمط التدريب</h1>
        <p className="text-gray-500 mb-8">حدد الطريقة اللي عايز تتدرب بيها</p>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => startMode('text-to-morse')}
            className="bg-white border-2 border-gray-200 hover:border-scout rounded-2xl p-6 transition"
          >
            <h3 className="font-bold text-lg">عربي ➔ مورس</h3>
            <p className="text-sm text-gray-500 mt-1">اكتب الشفرة المقابلة للحرف</p>
          </button>
          <button
            onClick={() => startMode('morse-to-text')}
            className="bg-white border-2 border-gray-200 hover:border-scout rounded-2xl p-6 transition"
          >
            <h3 className="font-bold text-lg">مورس ➔ عربي</h3>
            <p className="text-sm text-gray-500 mt-1">اكتشف الحرف المقابل للشفرة</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <span>
          التقدم المتتالي: <b className="text-scout">{streak}</b>
        </span>
        <span>
          أعلى نتيجة: <b className="text-scout">{highScore}</b>
        </span>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 mb-6">
        <h1 className="text-4xl font-bold mb-4" dir={mode === 'morse-to-text' ? 'ltr' : 'rtl'}>
          {mode === 'text-to-morse' ? letter : arabicLettersMorse[letter]}
        </h1>
        <MorsePlayer code={arabicLettersMorse[letter]} />
      </div>

      {feedback && (
        <p className={`mb-4 font-bold ${feedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
          {feedback === 'correct' ? 'إجابة صحيحة! 🎉' : 'مش صح، حاول تاني في السؤال الجاي'}
        </p>
      )}

      {mode === 'morse-to-text' ? (
        <input
          autoFocus
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          placeholder="اكتب الحرف العربي..."
          className="w-full border border-gray-200 rounded-xl p-3 text-center text-xl mb-4 focus:outline-none focus:border-scout"
        />
      ) : (
        <div className="mb-4">
          <div dir="ltr" className="text-2xl font-mono text-scout mb-3 min-h-[2rem]">
            {morseInput || '-'}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setMorseInput((m) => m + '.')}
              className="border-2 border-gray-200 hover:border-scout rounded-xl py-4 text-2xl font-bold"
            >
              .
            </button>
            <button
              onClick={() => setMorseInput((m) => m + '-')}
              className="border-2 border-gray-200 hover:border-scout rounded-xl py-4 text-2xl font-bold"
            >
              -
            </button>
            <button
              onClick={() => setMorseInput((m) => m.slice(0, -1))}
              className="border-2 border-gray-200 hover:border-scout rounded-xl py-4 text-red-500 font-bold"
            >
              حذف
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={checkAnswer}
          className="flex-1 bg-scout hover:bg-scout-dark text-white rounded-xl py-3 font-bold transition"
        >
          تحقق
        </button>
        <button
          onClick={nextQuestion}
          className="bg-gray-100 hover:bg-gray-200 rounded-xl px-6 font-bold transition"
        >
          تخطي
        </button>
      </div>
      <button onClick={() => setMode(null)} className="text-gray-400 text-sm mt-4 hover:text-gray-600">
        ➔ تغيير النمط
      </button>
    </div>
  );
}
