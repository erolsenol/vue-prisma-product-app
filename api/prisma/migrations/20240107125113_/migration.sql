/*
  Warnings:

  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Picture` DROP FOREIGN KEY `Picture_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `Picture` DROP FOREIGN KEY `Picture_product_id_fkey`;

-- DropTable
DROP TABLE `Picture`;
