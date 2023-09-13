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

import { Physician } from "src/modules/physician/entities/physician.entity";
import { Patient } from "src/modules/patient/entities/patient.entity";
import { Medication } from "src/modules/medication/entities/medication.entity";

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("idx_prescription_physician")
  @ManyToOne(() => Physician)
  @JoinColumn({
    name: "physician_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_prescription_physician",
  })
  physician: Physician;

  @Index("idx_prescription_patient")
  @ManyToOne(() => Patient)
  @JoinColumn({
    name: "patient_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_prescription_patient",
  })
  patient: Patient;

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
