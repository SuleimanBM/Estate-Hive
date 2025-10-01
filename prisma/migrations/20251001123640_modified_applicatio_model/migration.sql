/*
  Warnings:

  - You are about to drop the column `unitId` on the `Application` table. All the data in the column will be lost.
  - Added the required column `propertyId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Application" DROP CONSTRAINT "Application_unitId_fkey";

-- DropIndex
DROP INDEX "public"."Application_unitId_idx";

-- AlterTable
ALTER TABLE "public"."Application" DROP COLUMN "unitId",
ADD COLUMN     "propertyId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Application_propertyId_idx" ON "public"."Application"("propertyId");

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
