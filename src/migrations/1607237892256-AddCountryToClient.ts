import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCountryToClient1607237892256 implements MigrationInterface {
    name = 'AddCountryToClient1607237892256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `client` ADD `billingCountry` varchar(255) NOT NULL DEFAULT 'United States'");
        await queryRunner.query("ALTER TABLE `client` ADD `shippingCountry` varchar(255) NOT NULL DEFAULT 'United States'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `shippingCountry`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `billingCountry`");
    }

}
