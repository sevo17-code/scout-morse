// src/controllers/admin.controller.js
import prisma from '../utils/db.js';

// GET /api/admin/users (أدمن فقط)
export async function getAllUsers(req, res) {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
  return res.json({ users });
}

// GET /api/admin/stats (أدمن فقط) - نظرة عامة سريعة
export async function getStats(req, res) {
  const [totalUsers, totalAttempts, questions] = await Promise.all([
    prisma.user.count(),
    prisma.examAttempt.count(),
    prisma.question.count({ where: { isActive: true } }),
  ]);

  const avgScoreResult = await prisma.examAttempt.aggregate({ _avg: { score: true } });

  return res.json({
    totalUsers,
    totalAttempts,
    activeQuestions: questions,
    averageScore: avgScoreResult._avg.score ? Number(avgScoreResult._avg.score.toFixed(2)) : 0,
  });
}
