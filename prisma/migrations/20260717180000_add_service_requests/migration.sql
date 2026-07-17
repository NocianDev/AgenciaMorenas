CREATE TYPE "ServiceRequestStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'CONTACTED', 'APPROVED', 'REJECTED', 'CONVERTED');

CREATE TABLE "ServiceRequest" (
  "id" TEXT NOT NULL,
  "requestNumber" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "companyName" TEXT,
  "taxId" TEXT,
  "preferredContactMethod" TEXT,
  "serviceType" TEXT NOT NULL,
  "customServiceType" TEXT,
  "originAddress" TEXT NOT NULL,
  "destinationAddress" TEXT NOT NULL,
  "cargoDescription" TEXT NOT NULL,
  "cargoWeightKg" DOUBLE PRECISION,
  "requestedDate" TIMESTAMP(3),
  "vehicleMake" TEXT,
  "vehicleModel" TEXT,
  "vehicleYear" INTEGER,
  "vehicleVin" TEXT,
  "comments" TEXT,
  "privacyAccepted" BOOLEAN NOT NULL,
  "status" "ServiceRequestStatus" NOT NULL DEFAULT 'PENDING',
  "clientId" TEXT,
  "orderId" TEXT,
  "reviewedById" TEXT,
  "reviewedAt" TIMESTAMP(3),
  "rejectionReason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ServiceRequest_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ServiceRequest_requestNumber_key" ON "ServiceRequest"("requestNumber");
CREATE UNIQUE INDEX "ServiceRequest_orderId_key" ON "ServiceRequest"("orderId");
CREATE INDEX "ServiceRequest_status_createdAt_idx" ON "ServiceRequest"("status", "createdAt");
CREATE INDEX "ServiceRequest_email_idx" ON "ServiceRequest"("email");
CREATE INDEX "ServiceRequest_serviceType_idx" ON "ServiceRequest"("serviceType");
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ServiceRequest" ADD CONSTRAINT "ServiceRequest_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
