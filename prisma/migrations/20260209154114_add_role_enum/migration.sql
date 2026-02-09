/*
  Warnings:

  - You are about to drop the column `roles` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Customer', 'Provider');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "roles",
ADD COLUMN     "role" "Role" DEFAULT 'Customer';
