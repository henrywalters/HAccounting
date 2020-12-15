import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateProjectTaskTable1607321166963 implements MigrationInterface {
    name = 'UpdateProjectTaskTable1607321166963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project_task` CHANGE `actualHours` `actualHours` float NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project_task` CHANGE `actualHours` `actualHours` float NULL");
    }

}
