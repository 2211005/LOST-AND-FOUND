const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateAdmin(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado (sin token)' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (!payload.role || (payload.role !== 'admin' && payload.role !== 'superadmin')) {
      return res.status(403).json({ message: 'No autorizado (rol inválido)' });
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error('❌ Error verificando token:', error);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

function requireSuperAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'superadmin') {
    return res
      .status(403)
      .json({ message: 'Solo un SUPERADMIN puede realizar esta acción' });
  }
  next();
}

module.exports = {
  // nombres originales
  authenticateAdmin,
  requireSuperAdmin,

  // 🔹 aliases para que las rutas puedan usar nombres genéricos
  authenticate: authenticateAdmin,
  requireAdmin: authenticateAdmin,
};
