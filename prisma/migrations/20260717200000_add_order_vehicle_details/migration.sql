ALTER TABLE "Order"
ADD COLUMN "vehicleMake" TEXT,
ADD COLUMN "vehicleModel" TEXT,
ADD COLUMN "vehicleYear" INTEGER,
ADD COLUMN "vehicleVin" TEXT;

UPDATE "Order" AS orders
SET
  "vehicleMake" = requests."vehicleMake",
  "vehicleModel" = requests."vehicleModel",
  "vehicleYear" = requests."vehicleYear",
  "vehicleVin" = requests."vehicleVin"
FROM "ServiceRequest" AS requests
WHERE requests."orderId" = orders."id";
