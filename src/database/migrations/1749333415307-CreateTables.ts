import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1749333415307 implements MigrationInterface {
  name = 'CreateTables1749333415307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "grower" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "document_type" character varying NOT NULL, "document_number" character varying NOT NULL, CONSTRAINT "PK_e240a1f1703488a179db5568397" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "farm" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "total_area" numeric(10,2) NOT NULL, "arable_area" numeric(10,2) NOT NULL, "vegetation_area" numeric(10,2) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(255) NOT NULL, "grower_id" uuid, CONSTRAINT "PK_3bf246b27a3b6678dfc0b7a3f64" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "harvest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "year" integer NOT NULL, "crops" text array NOT NULL, "farm_id" uuid, CONSTRAINT "PK_84a837e6c60baad24c5a4125f67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm" ADD CONSTRAINT "FK_3b3a465a34f7caa023e0210c62a" FOREIGN KEY ("grower_id") REFERENCES "grower"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest" ADD CONSTRAINT "FK_165980f2aff191b976f0e703093" FOREIGN KEY ("farm_id") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest" DROP CONSTRAINT "FK_165980f2aff191b976f0e703093"`,
    );
    await queryRunner.query(
      `ALTER TABLE "farm" DROP CONSTRAINT "FK_3b3a465a34f7caa023e0210c62a"`,
    );
    await queryRunner.query(`DROP TABLE "harvest"`);
    await queryRunner.query(`DROP TABLE "farm"`);
    await queryRunner.query(`DROP TABLE "grower"`);
  }
}
