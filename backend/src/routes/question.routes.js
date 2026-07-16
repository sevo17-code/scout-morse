// src/routes/question.routes.js
import { Router } from 'express';
import {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/question.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = Router();

// كل مسارات بنك الأسئلة للأدمن بس (أنت والكابتن)
router.use(authMiddleware, adminMiddleware);

router.get('/', getAllQuestions);
router.post('/', createQuestion);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
