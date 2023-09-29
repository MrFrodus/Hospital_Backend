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
  RelationId,
} from "typeorm";

import { Medication } from "src/modules/medication/entities/medication.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("idx_prescription_physician")
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({
    name: "physician_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_prescription_physician",
  })
  physician: User;

  @Column({ type: "int", nullable: false })
  physician_id: number;

  @Index("idx_prescription_patient")
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({
    name: "patient_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_prescription_patient",
  })
  patient: User;

  @Column({ type: "int", nullable: false })
  patient_id: number;

  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  @ManyToMany(() => Medication, { cascade: true })
  @JoinTable({
    name: "prescription_medication",
    joinColumn: {
      name: "prescription_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "medication_id",
      referencedColumnName: "id",
    },
  })
  medications: Medication[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
