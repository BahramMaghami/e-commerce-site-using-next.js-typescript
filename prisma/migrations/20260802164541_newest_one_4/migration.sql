/*
  Warnings:

  - You are about to drop the column `paymentRsult` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentRsult",
ADD COLUMN     "paymentResult" JSON;
