// src/pages/Exam.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { examApi } from '../api/endpoints.js';
import Timer from '../components/Timer.jsx';
import { useTimer } from '../hooks/useTimer.js';

const SECONDS_PER_QUESTION = 20;

export default function Exam() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { secondsLeft, reset } = useTimer(SECONDS_PER_QUESTION, () => handleNext());

  async function startExam() {
    setError('');
    setLoading(true);
    try {
      const res = await examApi.start();
      setQuestions(res.data.questions);
      setCurrent(0);
      setAnswers([]);
      setAnswer('');
      reset(SECONDS_PER_QUESTION);
    } catch (err) {
      setError(err.response?.data?.message || 'حصل خطأ في بدء الامتحان');
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    const q = questions[current];
    const updatedAnswers = [...answers, { questionId: q.questionId, answer }];
    setAnswers(updatedAnswers);
    setAnswer('');

    if (current + 1 >= questions.length) {
      finishExam(updatedAnswers);
    } else {
      setCurrent((c) => c + 1);
      reset(SECONDS_PER_QUESTION);
    }
  }

  async function finishExam(finalAnswers) {
    setLoading(true);
    try {
      const res = await examApi.submit(finalAnswers);
      navigate('/leaderboard', { state: { justFinished: true, result: res.data } });
    } catch (err) {
      setError(err.response?.data?.message || 'حصل خطأ في تسليم الامتحان');
    } finally {
      setLoading(false);
    }
  }

  if (!questions) {
    return (
      <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-md p-10">
        <h1 className="text-2xl font-bold mb-3">بدء امتحان شفرة مورس</h1>
        <p className="text-gray-500 mb-6">
          10 أسئلة عشوائية، كل سؤال ليه {SECONDS_PER_QUESTION} ثانية.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={startExam}
          disabled={loading}
          className="w-full bg-scout hover:bg-scout-dark text-white rounded-xl py-3 font-bold transition disabled:opacity-50"
        >
          {loading ? 'جاري التحضير...' : 'ابدأ الامتحان'}
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
      <div className="flex justify-between mb-6 text-sm text-gray-500">
        <span>
          السؤال: {current + 1}/{questions.length}
        </span>
        <Timer secondsLeft={secondsLeft} />
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 mb-6">
        <p className="text-sm text-gray-400 mb-2">
          {q.type === 'LETTER_TO_MORSE' ? 'اكتب شفرة مورس للحرف:' : 'اكتب الحرف المقابل للشفرة:'}
        </p>
        <h1 className="text-4xl font-bold" dir={q.type === 'MORSE_TO_LETTER' ? 'ltr' : 'rtl'}>
          {q.prompt}
        </h1>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        autoFocus
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleNext()}
        className="w-full border border-gray-200 rounded-xl p-3 text-center text-xl mb-4 focus:outline-none focus:border-scout"
        placeholder="اكتب إجابتك..."
      />

      <button
        onClick={handleNext}
        disabled={loading}
        className="w-full bg-scout hover:bg-scout-dark text-white rounded-xl py-3 font-bold transition disabled:opacity-50"
      >
        {current + 1 >= questions.length ? 'إنهاء الامتحان' : 'السؤال التالي'}
      </button>
    </div>
  );
}
