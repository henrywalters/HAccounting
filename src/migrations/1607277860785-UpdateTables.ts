import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTables1607277860785 implements MigrationInterface {
    name = 'UpdateTables1607277860785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `address` (`id` varchar(36) NOT NULL, `address` varchar(255) NOT NULL, `state` varchar(255) NOT NULL, `country` varchar(255) NOT NULL DEFAULT 'United States', `city` varchar(255) NOT NULL, `areaCode` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `billingAddress`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `billingState`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `billingCity`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `billingAreaCode`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `shippingSameAsBilling`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `shippingAddress`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `shippingState`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `shippingCity`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `shippingAreaCode`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `billingCountry`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `shippingCountry`");
        await queryRunner.query("ALTER TABLE `client` ADD `billingAddressId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `shippingAddressId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `client` CHANGE `contactName` `contactName` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` CHANGE `contactEmail` `contactEmail` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_0a308d3578511f26970c693a7e5` FOREIGN KEY (`billingAddressId`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_2c2cedfbb2f55fe7fc203f97cd7` FOREIGN KEY (`shippingAddressId`) REFERENCES `address`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_2c2cedfbb2f55fe7fc203f97cd7`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_0a308d3578511f26970c693a7e5`");
        await queryRunner.query("ALTER TABLE `client` CHANGE `contactEmail` `contactEmail` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `client` CHANGE `contactName` `contactName` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `shippingAddressId`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `billingAddressId`");
        await queryRunner.query("ALTER TABLE `client` ADD `shippingCountry` varchar(255) NOT NULL DEFAULT 'United States'");
        await queryRunner.query("ALTER TABLE `client` ADD `billingCountry` varchar(255) NOT NULL DEFAULT 'United States'");
        await queryRunner.query("ALTER TABLE `client` ADD `shippingAreaCode` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `shippingCity` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `shippingState` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `shippingAddress` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `shippingSameAsBilling` tinyint NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `client` ADD `billingAreaCode` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `billingCity` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `billingState` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `billingAddress` varchar(255) NOT NULL");
        await queryRunner.query("DROP TABLE `address`");
    }

}
