import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1749853420844 implements MigrationInterface {
  name = 'CreateTables1749853420844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(255) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "growers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "document_type" character varying NOT NULL, "document_number" character varying NOT NULL, CONSTRAINT "PK_19a6664ebc3005c148734956658" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "farms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "total_area" numeric(10,2) NOT NULL, "arable_area" numeric(10,2) NOT NULL, "vegetation_area" numeric(10,2) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(255) NOT NULL, "grower_id" uuid NOT NULL, CONSTRAINT "PK_39aff9c35006b14025bba5a43d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "harvests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "crops" text array NOT NULL, "farm_id" uuid NOT NULL, CONSTRAINT "PK_fb748ae28bc0000875b1949a0a6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "farms" ADD CONSTRAINT "FK_fcc08ac117a1bf359aedf1abaa1" FOREIGN KEY ("grower_id") REFERENCES "growers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvests" ADD CONSTRAINT "FK_231c2de20d25d78746cc6b36fca" FOREIGN KEY ("farm_id") REFERENCES "farms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvests" DROP CONSTRAINT "FK_231c2de20d25d78746cc6b36fca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "farms" DROP CONSTRAINT "FK_fcc08ac117a1bf359aedf1abaa1"`,
    );
    await queryRunner.query(`DROP TABLE "harvests"`);
    await queryRunner.query(`DROP TABLE "farms"`);
    await queryRunner.query(`DROP TABLE "growers"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
