// src/middleware/admin.middleware.js
// لازم يتحط بعد authMiddleware في السلسلة عشان req.user يكون موجود

export function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'الصفحة دي للأدمن بس (أنت أو الكابتن)' });
  }
  next();
}
