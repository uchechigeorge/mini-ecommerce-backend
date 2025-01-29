import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity("product_categories")
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 1024 })
  name: string;

  @Column({ nullable: true })
  sequence: number;

  @UpdateDateColumn({ name: "date_modified" })
  dateModified: Date;

  @CreateDateColumn({ name: "date_created" })
  dateCreated: Date;

  // Relations
  @OneToMany(() => Product, (e) => e.productCategory)
  products: Promise<Product[]>;
}
