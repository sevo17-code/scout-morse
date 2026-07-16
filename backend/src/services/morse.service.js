// src/services/morse.service.js
// جدول شفرة مورس للأبجدية العربية الـ 28 حرف (معيار ITU-R M.1677-1)

export const arabicLettersMorse = {
  ا: '.-',
  ب: '-...',
  ت: '-',
  ث: '-.-.',
  ج: '.---',
  ح: '....',
  خ: '---',
  د: '-..',
  ذ: '--..',
  ر: '.-.',
  ز: '---.',
  س: '...',
  ش: '----',
  ص: '-.-.',
  ض: '...-',
  ط: '..-',
  ظ: '-.--',
  ع: '.-.-',
  غ: '--.',
  ف: '..-.',
  ق: '--.-',
  ك: '-.-',
  ل: '.-..',
  م: '--',
  ن: '-.',
  ه: '..-..',
  و: '.--',
  ي: '..',
};

// تطبيع الحروف المتشابهة (الهمزة، التاء المربوطة، الألف المقصورة)
const NORMALIZE_MAP = {
  أ: 'ا',
  إ: 'ا',
  آ: 'ا',
  ٱ: 'ا',
  ة: 'ت',
  ى: 'ي',
};

export function normalizeArabicLetter(char) {
  return NORMALIZE_MAP[char] || char;
}

export function isValidLetter(letter) {
  return Object.prototype.hasOwnProperty.call(arabicLettersMorse, normalizeArabicLetter(letter));
}

export function getAllLetters() {
  return Object.keys(arabicLettersMorse);
}

export function getMorseForLetter(letter) {
  return arabicLettersMorse[normalizeArabicLetter(letter)] || null;
}

/**
 * يتحقق من صحة إجابة سؤال واحد
 * @param {'LETTER_TO_MORSE'|'MORSE_TO_LETTER'} type
 * @param {string} letter - الحرف الصحيح للسؤال
 * @param {string} userAnswer - إجابة المستخدم
 */
export function checkAnswer(type, letter, userAnswer) {
  const correctLetter = normalizeArabicLetter(letter);
  const correctMorse = arabicLettersMorse[correctLetter];

  if (type === 'LETTER_TO_MORSE') {
    return userAnswer.trim() === correctMorse;
  }

  // MORSE_TO_LETTER
  return normalizeArabicLetter(userAnswer.trim()) === correctLetter;
}

export function getRandomLetter() {
  const letters = getAllLetters();
  return letters[Math.floor(Math.random() * letters.length)];
}
