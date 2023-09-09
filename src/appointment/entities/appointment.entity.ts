import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Physician } from "src/physician/entities/physician.entity";
import { Patient } from "src/patient/entities/patient.entity";
import { Nurse } from "src/nurse/entities/nurse.entity";
import { Service } from "src/service/entities/service.entity";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("idx_appointment_patient")
  @ManyToOne(() => Patient)
  @JoinColumn({
    name: "patient_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_appointment_patient",
  })
  patient: Patient;

  @Index("idx_appointment_physician")
  @ManyToOne(() => Physician)
  @JoinColumn({
    name: "physician_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_appointment_physician",
  })
  physician: Physician;

  @Index("idx_appointment_nurse")
  @ManyToOne(() => Nurse)
  @JoinColumn({
    name: "nurse_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_appointment_nurse",
  })
  nurse: Nurse;

  @Column({
    nullable: false,
  })
  starts_at: Date;

  @Column({
    nullable: true,
  })
  ends_at: Date;

  @Column({
    nullable: false,
  })
  is_completed: boolean;

  @Column({
    nullable: false,
  })
  is_paid: boolean;

  @Column({
    nullable: false,
    length: 255,
  })
  result: string;

  @Column({
    nullable: false,
    length: 255,
  })
  details: string;

  @ManyToMany(() => Service)
  @JoinTable({
    name: "appointment_service",
  })
  services: Service[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
