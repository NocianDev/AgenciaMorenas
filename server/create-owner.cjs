require('dotenv').config();

const bcrypt = require('bcryptjs');
const prisma = require('./prisma.cjs');

async function main() {
  const name = String(
    process.env.OWNER_NAME || '',
  ).trim();

  const email = String(
    process.env.OWNER_EMAIL || '',
  ).trim().toLowerCase();

  const password = String(
    process.env.OWNER_PASSWORD || '',
  );

  if (!name || !email || !password) {
    throw new Error(
      'Faltan OWNER_NAME, OWNER_EMAIL u OWNER_PASSWORD.',
    );
  }

  if (password.length < 8) {
    throw new Error(
      'La contraseña debe tener al menos 8 caracteres.',
    );
  }

  const passwordHash = await bcrypt.hash(
    password,
    12,
  );

  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {
      name,
      passwordHash,
      role: 'OWNER',
      active: true,
    },
    create: {
      name,
      email,
      passwordHash,
      role: 'OWNER',
      active: true,
    },
  });

  console.log('Cuenta OWNER creada o actualizada:');
  console.log({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });