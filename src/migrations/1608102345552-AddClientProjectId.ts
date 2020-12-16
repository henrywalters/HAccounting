import {MigrationInterface, QueryRunner} from "typeorm";

export class AddClientProjectId1608102345552 implements MigrationInterface {
    name = 'AddClientProjectId1608102345552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` ADD `clientProjectId` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project` DROP COLUMN `clientProjectId`");
    }

}
