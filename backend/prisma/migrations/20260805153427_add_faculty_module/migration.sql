-- AlterTable
ALTER TABLE `User`
MODIFY `role` ENUM('STUDENT', 'HOD', 'FACULTY', 'EXAM_CELL', 'ADMIN') NOT NULL;

-- CreateTable
CREATE TABLE `Faculty` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(15) NULL,
    `departmentId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Faculty_userId_key`(`userId`),
    UNIQUE INDEX `Faculty_employeeId_key`(`employeeId`),
    INDEX `Faculty_departmentId_idx`(`departmentId`),
    INDEX `Faculty_subjectId_idx`(`subjectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Faculty`
ADD CONSTRAINT `Faculty_userId_fkey`
FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faculty`
ADD CONSTRAINT `Faculty_departmentId_fkey`
FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Faculty`
ADD CONSTRAINT `Faculty_subjectId_fkey`
FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;