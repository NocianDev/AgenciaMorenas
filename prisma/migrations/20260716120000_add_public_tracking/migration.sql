ALTER TABLE "Order" ADD COLUMN "trackingNumber" TEXT;

WITH numbered AS (
  SELECT "id", EXTRACT(YEAR FROM "createdAt")::INTEGER AS year,
         ROW_NUMBER() OVER (PARTITION BY EXTRACT(YEAR FROM "createdAt") ORDER BY "createdAt", "id") AS sequence
  FROM "Order"
)
UPDATE "Order" AS orders
SET "trackingNumber" = 'MOR-' || numbered.year || '-' || LPAD(numbered.sequence::TEXT, 6, '0')
FROM numbered
WHERE orders."id" = numbered."id" AND orders."trackingNumber" IS NULL;

ALTER TABLE "Order" ALTER COLUMN "trackingNumber" SET NOT NULL;
CREATE UNIQUE INDEX "Order_trackingNumber_key" ON "Order"("trackingNumber");
ALTER TABLE "OrderNote" ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT false;
