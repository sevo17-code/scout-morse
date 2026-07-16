// prisma/seed.js
// بيملأ بنك الأسئلة بكل الحروف الـ28 في الاتجاهين (حرف->مورس ومورس->حرف)
// يتشغل مرة واحدة بالأمر: npm run prisma:seed

import { PrismaClient } from '@prisma/client';
import { arabicLettersMorse } from '../src/services/morse.service.js';

const prisma = new PrismaClient();

async function main() {
  const existingCount = await prisma.question.count();
  if (existingCount > 0) {
    console.log(`⚠️  بنك الأسئلة فيه ${existingCount} سؤال بالفعل، مش هنضيف تاني عشان منكررش`);
    return;
  }

  const questionsToCreate = [];

  for (const [letter, morseCode] of Object.entries(arabicLettersMorse)) {
    questionsToCreate.push({ letter, morseCode, type: 'LETTER_TO_MORSE' });
    questionsToCreate.push({ letter, morseCode, type: 'MORSE_TO_LETTER' });
  }

  await prisma.question.createMany({ data: questionsToCreate });

  console.log(`✅ تم إضافة ${questionsToCreate.length} سؤال لبنك الأسئلة (28 حرف × اتجاهين)`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
