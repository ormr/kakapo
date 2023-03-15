import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedPostTitle1678907507513 implements MigrationInterface {
    name = 'RemovedPostTitle1678907507513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" character varying NOT NULL`);
    }

}
