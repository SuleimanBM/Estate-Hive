/*
  Warnings:

  - Added the required column `propertyId` to the `Lease` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Application" DROP CONSTRAINT "Application_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Lease" DROP CONSTRAINT "Lease_unitId_fkey";

-- DropIndex
DROP INDEX "public"."Lease_unitId_idx";

-- AlterTable
ALTER TABLE "public"."Lease" ADD COLUMN     "propertyId" TEXT NOT NULL,
ALTER COLUMN "unitId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Lease_propertyId_idx" ON "public"."Lease"("propertyId");

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lease" ADD CONSTRAINT "Lease_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lease" ADD CONSTRAINT "Lease_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "public"."Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
