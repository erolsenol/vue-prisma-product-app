/*
  Warnings:

  - You are about to drop the column `picture_type` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `picture_type` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `picture_type`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `picture_type`;
