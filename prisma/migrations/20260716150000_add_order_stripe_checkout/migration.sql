ALTER TABLE "Order"
ADD COLUMN "totalAmountCents" INTEGER,
ADD COLUMN "stripeCheckoutSessionId" TEXT,
ADD COLUMN "stripePaymentIntentId" TEXT,
ADD COLUMN "paidAt" TIMESTAMP(3);

ALTER TABLE "Order" ALTER COLUMN "currency" SET DEFAULT 'mxn';
UPDATE "Order" SET "currency" = LOWER("currency") WHERE "currency" IS NOT NULL;

CREATE UNIQUE INDEX "Order_stripeCheckoutSessionId_key"
ON "Order"("stripeCheckoutSessionId");

ALTER TABLE "Order"
ADD CONSTRAINT "Order_totalAmountCents_positive"
CHECK ("totalAmountCents" IS NULL OR "totalAmountCents" > 0);
