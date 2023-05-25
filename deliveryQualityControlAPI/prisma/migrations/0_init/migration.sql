-- CreateTable
CREATE TABLE `elements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `property` VARCHAR(255) NOT NULL,
    `propertySymbol` VARCHAR(3) NOT NULL,
    `propertySecond` VARCHAR(255) NULL,
    `propertySecondSymbol` VARCHAR(3) NULL,
    `propertiesOperation` VARCHAR(255) NULL,
    `propertyUnit` VARCHAR(10) NOT NULL,
    `rangeFrom` DECIMAL(19, 4) NULL,
    `rangeTo` DECIMAL(19, 4) NULL,
    `rangeUnit` VARCHAR(10) NOT NULL,
    `rangeProperty` VARCHAR(255) NOT NULL,
    `rangePropertySymbol` VARCHAR(3) NOT NULL,
    `toleranceStart` DECIMAL(19, 4) NULL,
    `toleranceEnd` DECIMAL(19, 4) NULL,
    `toleranceUnit` VARCHAR(10) NOT NULL,
    `toleranceProperty` VARCHAR(255) NULL,
    `tolerancePropertySymbol` VARCHAR(3) NULL,
    `illustration` VARCHAR(255) NULL,
    `toleranceStartAgreement` DECIMAL(19, 4) NULL,
    `toleranceEndAgreement` DECIMAL(19, 4) NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

