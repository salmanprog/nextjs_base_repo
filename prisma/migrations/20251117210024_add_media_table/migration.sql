-- AlterTable
ALTER TABLE `event` ALTER COLUMN `startDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `url` TEXT NOT NULL,
    `type` ENUM('IMAGE', 'VIDEO', 'DOCUMENT') NOT NULL DEFAULT 'IMAGE',
    `relatedType` VARCHAR(100) NULL,
    `relatedId` INTEGER NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` TIMESTAMP(6) NULL,

    INDEX `media_relatedType_relatedId_idx`(`relatedType`, `relatedId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
