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

import { Appointment } from "src/modules/appointment/entities/appointment.entity";
import { User } from "src/modules/user/entities/user.entity";

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
  @ManyToOne(() => User)
  @JoinColumn({
    name: "physician_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_diagnosis_physician",
  })
  physician: User;

  @Index("idx_diagnosis_patient")
  @ManyToOne(() => User)
  @JoinColumn({
    name: "patient_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_diagnosis_patient",
  })
  patient: User;

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
