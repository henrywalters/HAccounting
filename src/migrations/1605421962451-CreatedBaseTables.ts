import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedBaseTables1605421962451 implements MigrationInterface {
    name = 'CreatedBaseTables1605421962451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `client` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `rate` float NOT NULL, `contactName` varchar(255) NULL, `contactEmail` varchar(255) NULL, `phone` varchar(255) NOT NULL, `billingAddress` varchar(255) NOT NULL, `billingState` varchar(255) NOT NULL, `billingCity` varchar(255) NOT NULL, `billingAreaCode` varchar(255) NOT NULL, `shippingSameAsBilling` tinyint NOT NULL DEFAULT 0, `shippingAddress` varchar(255) NULL, `shippingState` varchar(255) NULL, `shippingCity` varchar(255) NULL, `shippingAreaCode` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `project_task` (`id` varchar(36) NOT NULL, `complete` tinyint NOT NULL DEFAULT 0, `estimatedHours` float NOT NULL, `actualHours` float NULL, `projectId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `project` (`id` varchar(36) NOT NULL, `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `lastUpdate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deletedOn` datetime(6) NULL, `status` enum ('Lead', 'Quoted', 'Invoiced', 'Paid') NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `project_task` ADD CONSTRAINT `FK_a81f1f3ca71d469236a55e2bcaa` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `project_task` DROP FOREIGN KEY `FK_a81f1f3ca71d469236a55e2bcaa`");
        await queryRunner.query("DROP TABLE `project`");
        await queryRunner.query("DROP TABLE `project_task`");
        await queryRunner.query("DROP TABLE `client`");
    }

}
