-- Add indexes used by active-record and relationship queries.
CREATE INDEX `Category_deleted_idx` ON `Category`(`deleted`);
CREATE INDEX `Category_parent_id_deleted_idx` ON `Category`(`parent_id`, `deleted`);
CREATE INDEX `Product_category_id_deleted_idx` ON `Product`(`category_id`, `deleted`);
CREATE INDEX `Product_deleted_idx` ON `Product`(`deleted`);
