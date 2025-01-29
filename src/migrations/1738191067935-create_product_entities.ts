import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductEntities1738191067935 implements MigrationInterface {
    name = 'CreateProductEntities1738191067935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "product_categories" (
                "id" SERIAL NOT NULL,
                "name" character varying(1024),
                "sequence" integer,
                "date_modified" TIMESTAMP NOT NULL DEFAULT now(),
                "date_created" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_7069dac60d88408eca56fdc9e0c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" SERIAL NOT NULL,
                "name" character varying(1024),
                "price" numeric(18, 2),
                "description" text,
                "stock_quantity" integer,
                "product_category_id" integer,
                "image_url" character varying(1024),
                "date_modified" TIMESTAMP NOT NULL DEFAULT now(),
                "date_created" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD CONSTRAINT "FK_products_productcategories_productcategoryid" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE
            SET NULL ON UPDATE
            SET NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products" DROP CONSTRAINT "FK_products_productcategories_productcategoryid"
        `);
        await queryRunner.query(`
            DROP TABLE "products"
        `);
        await queryRunner.query(`
            DROP TABLE "product_categories"
        `);
    }

}
