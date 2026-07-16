// src/controllers/exam.controller.js
import prisma from '../utils/db.js';
import { checkAnswer } from '../services/morse.service.js';

const QUESTIONS_PER_EXAM = 10;

// POST /api/exam/start (يتطلب تسجيل دخول)
// بيرجع 10 أسئلة عشوائية بدون كشف الإجابة الصحيحة
export async function startExam(req, res) {
  try {
    const activeQuestions = await prisma.question.findMany({ where: { isActive: true } });

    if (activeQuestions.length < 4) {
      return res.status(400).json({
        message: 'بنك الأسئلة لسه فاضي أو صغير، لازم الأدمن يضيف أسئلة الأول (شغّل seed)',
      });
    }

    // اختيار عشوائي بدون تكرار (أو مع تكرار لو بنك الأسئلة أصغر من 10)
    const shuffled = [...activeQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(QUESTIONS_PER_EXAM, shuffled.length));

    const questionsForClient = selected.map((q) => ({
      questionId: q.id,
      type: q.type,
      prompt: q.type === 'LETTER_TO_MORSE' ? q.letter : q.morseCode,
    }));

    return res.json({ questions: questionsForClient, total: questionsForClient.length });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'حصل خطأ في بدء الامتحان' });
  }
}

// POST /api/exam/submit (يتطلب تسجيل دخول)
// body: { answers: [{ questionId, answer }] }
export async function submitExam(req, res) {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: 'مفيش إجابات مبعوتة' });
    }

    const questionIds = answers.map((a) => a.questionId);
    const questions = await prisma.question.findMany({ where: { id: { in: questionIds } } });
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    let score = 0;
    const results = answers.map((a) => {
      const question = questionMap.get(a.questionId);
      if (!question) return { questionId: a.questionId, correct: false };

      const isCorrect = checkAnswer(question.type, question.letter, a.answer || '');
      if (isCorrect) score += 1;

      return {
        questionId: a.questionId,
        correct: isCorrect,
        correctLetter: question.letter,
        correctMorse: question.morseCode,
      };
    });

    const attempt = await prisma.examAttempt.create({
      data: {
        userId: req.user.id,
        score,
        total: answers.length,
      },
    });

    return res.status(201).json({ attemptId: attempt.id, score, total: answers.length, results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'حصل خطأ في تسليم الامتحان' });
  }
}

// GET /api/exam/leaderboard (مفتوح للجميع)
export async function getLeaderboard(req, res) {
  try {
    // أفضل نتيجة لكل مستخدم
    const attempts = await prisma.examAttempt.findMany({
      include: { user: { select: { name: true } } },
      orderBy: { score: 'desc' },
    });

    const bestByUser = new Map();
    for (const attempt of attempts) {
      const existing = bestByUser.get(attempt.userId);
      if (!existing || attempt.score > existing.score) {
        bestByUser.set(attempt.userId, { name: attempt.user.name, score: attempt.score, total: attempt.total });
      }
    }

    const leaderboard = Array.from(bestByUser.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    return res.json({ leaderboard });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'حصل خطأ في جلب لوحة الصدارة' });
  }
}

// GET /api/exam/history (يتطلب تسجيل دخول) - سجل امتحانات المستخدم نفسه
export async function getMyHistory(req, res) {
  try {
    const attempts = await prisma.examAttempt.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ attempts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'حصل خطأ في جلب سجل الامتحانات' });
  }
}
