import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNameAndDescTOProjectTask1608019589254 implements MigrationInterface {
    name = 'AddNameAndDescTOProjectTask1608019589254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project_task` ADD `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `project_task` ADD `description` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project_task` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `project_task` DROP COLUMN `name`");
    }

}
