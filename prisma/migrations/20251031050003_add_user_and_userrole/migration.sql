/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(150)`.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userrole` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mobileNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `image`,
    ADD COLUMN `age` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `createdBy` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `deletedAt` TIMESTAMP(6) NULL,
    ADD COLUMN `dob` VARCHAR(250) NULL,
    ADD COLUMN `emailOtp` VARCHAR(100) NULL,
    ADD COLUMN `emailOtpCreatedAt` DATETIME(3) NULL,
    ADD COLUMN `emailVerifyAt` DATETIME(3) NULL,
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE',
    ADD COLUMN `imageUrl` TEXT NULL,
    ADD COLUMN `isEmailVerify` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `mobileNumber` VARCHAR(150) NULL,
    ADD COLUMN `platformId` VARCHAR(191) NULL,
    ADD COLUMN `platformType` VARCHAR(191) NOT NULL DEFAULT 'custom',
    ADD COLUMN `profileType` ENUM('PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PUBLIC',
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `updatedAt` TIMESTAMP(6) NULL,
    ADD COLUMN `userGroupId` INTEGER NULL,
    ADD COLUMN `userType` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    ADD COLUMN `username` VARCHAR(150) NOT NULL DEFAULT 'temp_username',
    MODIFY `name` VARCHAR(255) NULL,
    MODIFY `email` VARCHAR(150) NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `createdAt` TIMESTAMP(6) NULL;

-- DropTable
DROP TABLE `product`;

-- DropTable
DROP TABLE `userrole`;

-- CreateTable
CREATE TABLE `user_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `type` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `isSuperAdmin` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` TIMESTAMP(6) NULL,
    `updatedAt` TIMESTAMP(6) NULL,
    `deletedAt` TIMESTAMP(6) NULL,

    UNIQUE INDEX `user_role_title_key`(`title`),
    UNIQUE INDEX `user_role_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_slug_key` ON `User`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `User_mobileNumber_key` ON `User`(`mobileNumber`);

-- CreateIndex
CREATE INDEX `User_name_idx` ON `User`(`name`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userGroupId_fkey` FOREIGN KEY (`userGroupId`) REFERENCES `user_role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
