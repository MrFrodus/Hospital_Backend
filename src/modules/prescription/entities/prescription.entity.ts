import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Medication } from "src/modules/medication/entities/medication.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("idx_prescription_physician")
  @ManyToOne(() => User)
  @JoinColumn({
    name: "physician_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_prescription_physician",
  })
  physician: User;

  @Index("idx_prescription_patient")
  @ManyToOne(() => User)
  @JoinColumn({
    name: "patient_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_prescription_patient",
  })
  patient: User;

  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  @ManyToMany(() => Medication)
  @JoinTable({
    name: "prescription_medication",
  })
  medications: Medication[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
