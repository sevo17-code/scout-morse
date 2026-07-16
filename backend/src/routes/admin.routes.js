// src/routes/admin.routes.js
import { Router } from 'express';
import { getAllUsers, getStats } from '../controllers/admin.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get('/users', getAllUsers);
router.get('/stats', getStats);

export default router;
