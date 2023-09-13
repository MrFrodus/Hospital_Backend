import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
  Unique,
  ManyToOne,
} from "typeorm";

import { Meta } from "src/modules/meta/entities/meta.entity";
import { Department } from "src/modules/department/entities/department.entity";

@Entity()
export class Physician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Index("idx_physician_email")
  @Unique("unique_physician_email", ["email"])
  @Column({
    length: 255,
    nullable: false,
  })
  email: string;

  @Index("idx_physician_phone")
  @Unique("unique_physician_phone", ["phone"])
  @Column({
    nullable: false,
  })
  phone: number;

  @Column({
    length: 72,
    nullable: false,
  })
  password: string;

  @Column({
    length: 100,
    nullable: true,
  })
  specification: string;

  @Column({
    length: 100,
    nullable: true,
  })
  qualification: string;

  @OneToOne(() => Meta, (meta) => meta.physician, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "meta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_physician_meta",
  })
  meta: Meta;

  @Index("idx_physician_department")
  @ManyToOne(() => Department)
  @JoinColumn({
    name: "department_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_physician_department",
  })
  department: Department;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
