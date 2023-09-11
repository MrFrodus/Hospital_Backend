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

import { Meta } from "src/meta/entities/meta.entity";
import { Department } from "src/department/entities/department.entity";

@Entity()
export class Nurse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Index("idx_nurse_email")
  @Unique("unique_nurse_email", ["email"])
  @Column({
    length: 255,
    nullable: false,
  })
  email: string;

  @Index("idx_nurse_phone")
  @Unique("unique_nurse_phone", ["phone"])
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
  position: string;

  @OneToOne(() => Meta)
  @JoinColumn({
    name: "meta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_nurse_meta",
  })
  meta: Meta;

  @Index("idx_nurse_department")
  @ManyToOne(() => Department)
  @JoinColumn({
    name: "department_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_nurse_department",
  })
  department: Department;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
