# Scout Morse - الباك إند

سيرفر Node.js + Express + Prisma بيشتغل مع قاعدة بيانات Supabase Postgres.

## 1. التثبيت

```bash
cd backend
npm install
```

## 2. إعداد متغيرات البيئة

انسخ `.env.example` وسمّيه `.env`:

```bash
cp .env.example .env
```

افتح ملف `.env` واملأ:

- **DATABASE_URL**: من Supabase Dashboard → Project Settings → Database → Connection string (اختار **URI** واختار **Connection pooling** لو هتنشر على استضافة زي Render).
- **JWT_SECRET**: أي نص عشوائي طويل وسري (متستخدمش نفس المثال).
- **ADMIN_INVITE_CODE**: كود سري تختاره انت والكابتن، هتحتاجوه وقت التسجيل عشان تبقوا أدمن.

## 3. إنشاء الجداول في قاعدة البيانات

```bash
npm run prisma:migrate
```

هيسألك على اسم للـ migration، اكتب مثلاً `init`.

## 4. تعبئة بنك الأسئلة بالحروف الـ28

```bash
npm run prisma:seed
```

## 5. تشغيل السيرفر

```bash
npm run dev
```

السيرفر هيشتغل على `http://localhost:5000`

## اختبار سريع للـ API

### تسجيل حساب أدمن (انت أو الكابتن)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Sevo","email":"sevo@example.com","password":"123456","adminInviteCode":"غيّر_ده_لكود_سري_تعرفه_انت_والكابتن_بس"}'
```

هيرجعلك `token` — احتفظ بيه، هتحتاجه في أي طلب محتاج تسجيل دخول عن طريق الهيدر:

```
Authorization: Bearer <التوكن>
```

### بدء امتحان

```bash
curl -X POST http://localhost:5000/api/exam/start \
  -H "Authorization: Bearer <التوكن>"
```

## أهم المسارات (Endpoints)

| Method | المسار                  | محتاج تسجيل دخول؟ | أدمن بس؟ |
| ------ | ------------------------ | ------------------ | -------- |
| POST   | /api/auth/register        | لا                  | -        |
| POST   | /api/auth/login           | لا                  | -        |
| GET    | /api/auth/me              | نعم                 | -        |
| POST   | /api/exam/start            | نعم                 | -        |
| POST   | /api/exam/submit           | نعم                 | -        |
| GET    | /api/exam/leaderboard      | لا                  | -        |
| GET    | /api/exam/history          | نعم                 | -        |
| GET    | /api/questions              | نعم                 | نعم      |
| POST   | /api/questions              | نعم                 | نعم      |
| PATCH  | /api/questions/:id          | نعم                 | نعم      |
| DELETE | /api/questions/:id          | نعم                 | نعم      |
| GET    | /api/admin/users            | نعم                 | نعم      |
| GET    | /api/admin/stats            | نعم                 | نعم      |

## النشر المجاني (لما تكون جاهز)

- **الباك إند**: Render أو Railway (فيهم free tier، بس بينامو لو معملهمش traffic - أول طلب بعد النوم بياخد وقت أطول)
- **قاعدة البيانات**: Supabase (مجاني بالفعل عندك)
- لما تنشر، غيّر `FRONTEND_URL` في `.env` على السيرفر عشان الـ CORS يشتغل صح مع الفرونت إند المنشور.
