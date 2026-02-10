-- DropForeignKey
ALTER TABLE "Meals" DROP CONSTRAINT "Meals_profileId_fkey";

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProviderProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
