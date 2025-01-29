import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductCategory } from "./product-category.entity";

@Entity("products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 1024 })
  name: string;

  @Column({ nullable: true, type: "decimal", precision: 18, scale: 2 })
  price: number;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ name: "stock_quantity", nullable: true })
  stockQuantity: number;

  @Column({ name: "product_category_id", nullable: true })
  productCategoryId: number;

  @ManyToOne(() => ProductCategory, (e) => e.products, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn({
    foreignKeyConstraintName: "FK_products_productcategories_productcategoryid",
    name: "product_category_id",
  })
  productCategory: Promise<ProductCategory>;

  @Column({ name: "image_url", nullable: true, length: 1024 })
  imageUrl: string;

  @UpdateDateColumn({ name: "date_modified" })
  dateModified: Date;

  @CreateDateColumn({ name: "date_created" })
  dateCreated: Date;
}
