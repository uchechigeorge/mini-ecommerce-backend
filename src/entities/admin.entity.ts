import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("admins")
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 1024 })
  email: string;

  @Column({ nullable: true, length: 1024 })
  password: string;

  @Column({ name: "first_name", nullable: true, length: 1024 })
  firstName: string;

  @Column({ name: "last_name", nullable: true, length: 1024 })
  lastName: string;

  @Column({
    name: "fullName",
    asExpression: `"first_name" || ' ' || "last_name"`,
    generatedType: "STORED",
  })
  fullName: string;

  @UpdateDateColumn({ name: "date_modified" })
  dateModified: Date;

  @CreateDateColumn({ name: "date_created" })
  dateCreated: Date;
}
