-- AlterTable
ALTER TABLE "Meals" ADD COLUMN     "isFeatured" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryAddress" TEXT;
