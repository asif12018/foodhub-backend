/*
  Warnings:

  - You are about to drop the column `profileId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_profileId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "profileId",
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "provider_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
