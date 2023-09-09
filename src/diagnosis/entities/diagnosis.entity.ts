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

import { Physician } from "src/physician/entities/physician.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { Appointment } from "src/appointment/entities/appointment.entity";

@Entity()
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Index("idx_diagnosis_physician")
  @ManyToOne(() => Physician)
  @JoinColumn({
    name: "physician_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_diagnosis_physician",
  })
  physician: Physician;

  @Index("idx_diagnosis_patient")
  @ManyToOne(() => Patient)
  @JoinColumn({
    name: "patient_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_diagnosis_patient",
  })
  patient: Patient;

  @OneToOne(() => Appointment)
  @JoinColumn({
    name: "appointment_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_diagnosis_appointment",
  })
  appointment: Appointment;

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
