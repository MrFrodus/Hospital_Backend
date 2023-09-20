import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
  ManyToOne,
  OneToOne,
} from "typeorm";

import { Department } from "src/modules/department/entities/department.entity";
import { User } from "src/modules/user/entities/user.entity";

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

  @Index("idx_physicianMeta_department")
  @ManyToOne(() => Department)
  @JoinColumn({
    name: "department_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_physicianMeta_department",
  })
  department: Department;

  @OneToOne(() => User, (user) => user.physicianMeta, {
    onDelete: "CASCADE",
  })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
