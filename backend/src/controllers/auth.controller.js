// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/db.js';

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

function toPublicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function register(req, res) {
  try {
    const { name, email, password, adminCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'محتاجين الاسم والإيميل وكلمة السر' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'كلمة السر لازم تكون 6 حروف/أرقام على الأقل' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'فيه حساب مسجل بالإيميل ده قبل كده' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let role = 'USER';
    if (adminCode && adminCode === process.env.ADMIN_INVITE_CODE) {
      role = 'ADMIN';
    } else if (adminCode && adminCode.length > 0) {
      return res.status(403).json({ message: 'كود الأدمن غير صحيح، تواصل مع المشرف' });
    }

    // 🔥 التعديل هنا: passwordHash بدل password
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: passwordHash, // ✅ الصحيح
        role,
      },
    });

    const token = signToken(user);
    return res.status(201).json({ token, user: toPublicUser(user) });

  } catch (err) {
    console.error(' خطأ في التسجيل:', err);
    return res.status(500).json({ message: 'حصل خطأ في التسجيل، حاول تاني' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'محتاجين الإيميل وكلمة السر' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'الإيميل أو كلمة السر غلط' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: 'الإيميل أو كلمة السر غلط' });
    }

    const token = signToken(user);

    return res.json({ token, user: toPublicUser(user) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'حصل خطأ في تسجيل الدخول، حاول تاني' });
  }
}

export async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'المستخدم مش موجود' });
    }
    return res.json({ user: toPublicUser(user) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'حصل خطأ' });
  }
}
