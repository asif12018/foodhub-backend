-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PREPARING', 'READY', 'CANCELLED');

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PREPARING';
