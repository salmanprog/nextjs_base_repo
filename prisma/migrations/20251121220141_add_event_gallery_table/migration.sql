/*
  Warnings:

  - You are about to drop the `event_subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event_subscription` DROP FOREIGN KEY `event_subscription_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `event_subscription` DROP FOREIGN KEY `event_subscription_userId_fkey`;

-- DropTable
DROP TABLE `event_subscription`;
