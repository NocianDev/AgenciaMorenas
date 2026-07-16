const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  try {
    const token = req.cookies?.morenas_token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: 'Debes iniciar sesión.',
      });
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET,
    );

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: 'La sesión no es válida o expiró.',
    });
  }
}

function requireRole(...allowedRoles) {
  return function roleMiddleware(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        ok: false,
        message: 'Debes iniciar sesión.',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        ok: false,
        message: 'No tienes permisos para esta acción.',
      });
    }

    next();
  };
}

module.exports = {
  authRequired,
  requireRole,
};