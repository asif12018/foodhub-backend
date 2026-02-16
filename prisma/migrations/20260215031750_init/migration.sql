-- CreateEnum
CREATE TYPE "DietaryTag" AS ENUM ('HALAL', 'VEG', 'KETO', 'GLUTEN_FREE', 'DAIRY_FREE');

-- AlterTable
ALTER TABLE "Meals" ADD COLUMN     "dietary_tags" "DietaryTag"[];
