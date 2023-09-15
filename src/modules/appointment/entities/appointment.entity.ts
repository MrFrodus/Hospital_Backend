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

import { PhysicianMeta } from "src/modules/physicianMeta/entities/physicianMeta.entity";
import { PatientMeta } from "src/modules/patientMeta/entities/patientMeta.entity";
import { Nurse } from "src/modules/nurse/entities/nurse.entity";
import { Service } from "src/modules/service/entities/service.entity";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("idx_appointment_patientMeta")
  @ManyToOne(() => PatientMeta)
  @JoinColumn({
    name: "patientMeta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_appointment_patientMeta",
  })
  patientMeta: PatientMeta;

  @Index("idx_appointment_physicianMeta")
  @ManyToOne(() => PhysicianMeta)
  @JoinColumn({
    name: "physicianMeta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_appointment_physicianMeta",
  })
  physicianMeta: PhysicianMeta;

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
