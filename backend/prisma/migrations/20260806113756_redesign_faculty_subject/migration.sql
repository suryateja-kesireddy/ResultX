/*
Warnings:

- You are about to drop the column `subjectId` on the `Faculty` table.
  All the data in the column will be lost.
*/

-- DropForeignKey
ALTER TABLE `Faculty`
DROP FOREIGN KEY `Faculty_subjectId_fkey`;

-- DropIndex
DROP INDEX `Faculty_subjectId_idx` ON `Faculty`;

-- AlterTable
ALTER TABLE `Faculty`
DROP COLUMN `subjectId`,
ADD COLUMN `experience` INTEGER NULL,
ADD COLUMN `qualification` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `FacultySubject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facultyId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FacultySubject_facultyId_idx`(`facultyId`),
    INDEX `FacultySubject_subjectId_idx`(`subjectId`),
    UNIQUE INDEX `FacultySubject_facultyId_subjectId_key`(`facultyId`, `subjectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FacultySubject`
ADD CONSTRAINT `FacultySubject_facultyId_fkey`
FOREIGN KEY (`facultyId`) REFERENCES `Faculty`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FacultySubject`
ADD CONSTRAINT `FacultySubject_subjectId_fkey`
FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;