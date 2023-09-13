import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
  ManyToOne,
} from "typeorm";

import { Patient } from "src/modules/patient/entities/patient.entity";
import { Diagnosis } from "src/modules/diagnosis/entities/diagnosis.entity";

@Entity()
export class Illness {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Index("idx_illness_patient")
  @ManyToOne(() => Patient)
  @JoinColumn({
    name: "patient_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_illness_patient",
  })
  patient: Patient;

  @Index("idx_illness_diagnosis")
  @ManyToOne(() => Diagnosis)
  @JoinColumn({
    name: "diagnosis_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_illness_diagnosis",
  })
  diagnosis: Diagnosis;

  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    length: 255,
    nullable: true,
  })
  details: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
