// src/routes/exam.routes.js
import { Router } from 'express';
import {
  startExam,
  submitExam,
  getLeaderboard,
  getMyHistory,
} from '../controllers/exam.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/leaderboard', getLeaderboard); // مفتوح للجميع، مش لازم تسجيل دخول
router.post('/start', authMiddleware, startExam);
router.post('/submit', authMiddleware, submitExam);
router.get('/history', authMiddleware, getMyHistory);

export default router;
