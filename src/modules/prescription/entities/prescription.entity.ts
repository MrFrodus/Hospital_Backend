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

import { PhysicianMeta } from "src/modules/physicianMeta/entities/physicianMeta.entity";
import { PatientMeta } from "src/modules/patientMeta/entities/patientMeta.entity";
import { Medication } from "src/modules/medication/entities/medication.entity";

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("idx_prescription_physicianMeta")
  @ManyToOne(() => PhysicianMeta)
  @JoinColumn({
    name: "physicianMeta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_prescription_physicianMeta",
  })
  physicianMeta: PhysicianMeta;

  @Index("idx_prescription_patientMeta")
  @ManyToOne(() => PatientMeta)
  @JoinColumn({
    name: "patientMeta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_prescription_patientMeta",
  })
  patientMeta: PatientMeta;

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
