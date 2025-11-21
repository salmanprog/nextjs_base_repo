-- AlterTable
ALTER TABLE `event_gallery` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `featureImageUrl` TEXT NULL,
    ADD COLUMN `subtitle` VARCHAR(255) NULL,
    MODIFY `imageUrl` TEXT NULL;

-- CreateTable
CREATE TABLE `event_gallery_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `galleryId` INTEGER NOT NULL,
    `imageUrl` TEXT NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` TIMESTAMP(6) NULL,

    INDEX `event_gallery_image_galleryId_idx`(`galleryId`),
    INDEX `event_gallery_image_sortOrder_idx`(`sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `event_gallery_image` ADD CONSTRAINT `event_gallery_image_galleryId_fkey` FOREIGN KEY (`galleryId`) REFERENCES `event_gallery`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
