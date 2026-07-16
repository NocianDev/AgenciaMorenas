const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = require('../prisma.cjs');
const {
  authRequired,
} = require('../middleware/auth.cjs');

const router = express.Router();

const COOKIE_NAME = 'morenas_token';

function cookieOptions() {
  const isProduction =
    process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 8,
    path: '/',
  };
}

router.post('/login', async (req, res) => {
  try {
    const email = String(
      req.body.email || '',
    ).trim().toLowerCase();

    const password = String(
      req.body.password || '',
    );

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Correo y contraseña son obligatorios.',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user.active) {
      return res.status(401).json({
        ok: false,
        message: 'Correo o contraseña incorrectos.',
      });
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        ok: false,
        message: 'Correo o contraseña incorrectos.',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h',
      },
    );

    res.cookie(
      COOKIE_NAME,
      token,
      cookieOptions(),
    );

    return res.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: 'No se pudo iniciar sesión.',
    });
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, {
    ...cookieOptions(),
    maxAge: undefined,
  });

  res.json({
    ok: true,
  });
});

router.get('/me', authRequired, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
      },
    });

    if (!user || !user.active) {
      return res.status(401).json({
        ok: false,
        message: 'Usuario no autorizado.',
      });
    }

    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      ok: false,
      message: 'No se pudo consultar la sesión.',
    });
  }
});

module.exports = router;