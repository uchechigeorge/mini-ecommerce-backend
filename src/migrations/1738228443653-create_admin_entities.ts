import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAdminEntities1738228443653 implements MigrationInterface {
  name = "CreateAdminEntities1738228443653";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            INSERT INTO "typeorm_metadata"(
                    "database",
                    "schema",
                    "table",
                    "type",
                    "name",
                    "value"
                )
            VALUES ($1, $2, $3, $4, $5, $6)
        `,
      [
        "mini-e-commerce",
        "public",
        "admins",
        "GENERATED_COLUMN",
        "fullName",
        '"first_name" || \' \' || "last_name"',
      ]
    );
    await queryRunner.query(`
            CREATE TABLE "admins" (
                "id" SERIAL NOT NULL,
                "email" character varying(1024),
                "password" character varying(1024),
                "first_name" character varying(1024),
                "last_name" character varying(1024),
                "fullName" character varying GENERATED ALWAYS AS ("first_name" || ' ' || "last_name") STORED NOT NULL,
                "date_modified" TIMESTAMP NOT NULL DEFAULT now(),
                "date_created" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "admins"
        `);
    await queryRunner.query(
      `
            DELETE FROM "typeorm_metadata"
            WHERE "type" = $1
                AND "name" = $2
                AND "database" = $3
                AND "schema" = $4
                AND "table" = $5
        `,
      ["GENERATED_COLUMN", "fullName", "mini-e-commerce", "public", "admins"]
    );
  }
}
