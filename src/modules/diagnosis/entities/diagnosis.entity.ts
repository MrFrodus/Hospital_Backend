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

import { PhysicianMeta } from "src/modules/physicianMeta/entities/physicianMeta.entity";
import { PatientMeta } from "src/modules/patientMeta/entities/patientMeta.entity";
import { Appointment } from "src/modules/appointment/entities/appointment.entity";

@Entity()
export class Diagnosis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Index("idx_diagnosis_physicianMeta")
  @ManyToOne(() => PhysicianMeta)
  @JoinColumn({
    name: "physicianMeta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_diagnosis_physicianMeta",
  })
  physicianMeta: PhysicianMeta;

  @Index("idx_diagnosis_patientMeta")
  @ManyToOne(() => PatientMeta)
  @JoinColumn({
    name: "patientMeta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_diagnosis_patientMeta",
  })
  patientMeta: PatientMeta;

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
