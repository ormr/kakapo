import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewColumnImageToTablePost1664809358425 implements MigrationInterface {
    name = 'AddedNewColumnImageToTablePost1664809358425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "imageId" uuid`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "UQ_294625b251f17eca44cc57fbeb8" UNIQUE ("imageId")`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_294625b251f17eca44cc57fbeb8" FOREIGN KEY ("imageId") REFERENCES "local_file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_294625b251f17eca44cc57fbeb8"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "UQ_294625b251f17eca44cc57fbeb8"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "imageId"`);
    }

}
