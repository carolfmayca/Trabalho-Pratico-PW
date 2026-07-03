/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `majors` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `majors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `majors` DROP COLUMN `updatedAt`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
