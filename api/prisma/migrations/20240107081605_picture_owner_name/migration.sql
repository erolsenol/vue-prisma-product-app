/*
  Warnings:

  - Added the required column `owner_name` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Picture` ADD COLUMN `owner_name` VARCHAR(191) NOT NULL;
