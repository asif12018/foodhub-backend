/*
  Warnings:

  - You are about to drop the column `accountId` on the `ProviderProfile` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `ProviderProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProviderProfile" DROP COLUMN "accountId",
DROP COLUMN "providerId";
