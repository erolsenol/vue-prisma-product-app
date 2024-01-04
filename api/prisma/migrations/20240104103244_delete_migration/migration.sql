-- AlterTable
ALTER TABLE `Category` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `deleted_time` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `deleted_time` DATETIME(3) NULL;
