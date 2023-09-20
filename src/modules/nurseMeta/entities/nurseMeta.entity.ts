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
export class NurseMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: true,
  })
  position: string;

  @OneToOne(() => User, (user) => user.nurseMeta, {
    onDelete: "CASCADE",
  })
  user: User;

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
