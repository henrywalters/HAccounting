import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameAndDescToProject1607238536425 implements MigrationInterface {
    name = 'AddNameAndDescToProject1607238536425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` ADD `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `project` ADD `description` mediumtext NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `name`");
    }

}
