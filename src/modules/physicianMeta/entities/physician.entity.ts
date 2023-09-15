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
export class PhysicianMeta {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => Meta, (meta) => meta.physicianMeta, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "meta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_physicianMeta_meta",
  })
  meta: Meta;

  @Index("idx_physicianMeta_department")
  @ManyToOne(() => Department)
  @JoinColumn({
    name: "department_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_physicianMeta_department",
  })
  department: Department;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
