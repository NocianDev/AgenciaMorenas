require('dotenv').config();
const crypto = require('crypto');
const prisma = require('./prisma.cjs');

async function main() {
  const orders = await prisma.$queryRaw`
    SELECT "id" FROM "Order" WHERE "trackingToken" IS NULL
  `;

  let updated = 0;
  for (const order of orders) {
    const token = crypto.randomBytes(32).toString('hex');
    const changed = await prisma.$executeRaw`
      UPDATE "Order"
      SET "trackingToken" = ${token}
      WHERE "id" = ${order.id} AND "trackingToken" IS NULL
    `;
    updated += changed;
  }

  console.log(`Pedidos revisados: ${orders.length}. Tokens asignados: ${updated}.`);
}

main()
  .catch((error) => {
    console.error('No fue posible completar los tokens faltantes.', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
