// src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import questionRoutes from './routes/question.routes.js';
import examRoutes from './routes/exam.routes.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Scout Morse API شغالة ✅' });
});

app.use('/api/questions', questionRoutes);
app.use('/api/exam', examRoutes);

// هاندلر عام للأخطاء غير المتوقعة
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'حصل خطأ غير متوقع في السيرفر' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));