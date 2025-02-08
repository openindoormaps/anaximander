/*
  Warnings:

  - You are about to alter the column `elevation` on the `floors` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "floors" ALTER COLUMN "elevation" SET DATA TYPE INTEGER;
