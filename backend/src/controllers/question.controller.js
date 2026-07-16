// src/controllers/question.controller.js
import prisma from '../utils/db.js';
import { isValidLetter, getMorseForLetter, normalizeArabicLetter } from '../services/morse.service.js';

// GET /api/questions (أدمن فقط - عشان يدير بنك الأسئلة)
export async function getAllQuestions(req, res) {
  const questions = await prisma.question.findMany({ orderBy: { createdAt: 'desc' } });
  return res.json({ questions });
}

// POST /api/questions (أدمن فقط)
export async function createQuestion(req, res) {
  try {
    const { letter, type } = req.body;

    if (!letter || !isValidLetter(letter)) {
      return res.status(400).json({ message: 'الحرف غير صالح، لازم يكون حرف عربي من الـ 28 حرف' });
    }

    const normalizedLetter = normalizeArabicLetter(letter);
    const morseCode = getMorseForLetter(normalizedLetter);
    const questionType = type === 'MORSE_TO_LETTER' ? 'MORSE_TO_LETTER' : 'LETTER_TO_MORSE';

    const question = await prisma.question.create({
      data: { letter: normalizedLetter, morseCode, type: questionType },
    });

    return res.status(201).json({ question });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'حصل خطأ في إضافة السؤال' });
  }
}

// PATCH /api/questions/:id (أدمن فقط) - تفعيل/تعطيل سؤال
export async function updateQuestion(req, res) {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const question = await prisma.question.update({
      where: { id },
      data: { isActive: Boolean(isActive) },
    });

    return res.json({ question });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: 'السؤال مش موجود' });
  }
}

// DELETE /api/questions/:id (أدمن فقط)
export async function deleteQuestion(req, res) {
  try {
    const { id } = req.params;
    await prisma.question.delete({ where: { id } });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(404).json({ message: 'السؤال مش موجود' });
  }
}
