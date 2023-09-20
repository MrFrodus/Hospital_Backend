import { NurseMeta } from "src/modules/nurseMeta/entities/nurseMeta.entity";
import { PatientMeta } from "src/modules/patientMeta/entities/patientMeta.entity";
import { PhysicianMeta } from "src/modules/physicianMeta/entities/physicianMeta.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
  Unique,
} from "typeorm";

export enum UserRole {
  PATIENT = "patient",
  PHYSICIAN = "physician",
  NURSE = "nurse",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Index("idx_user_email")
  @Unique("unique_user_email", ["email"])
  @Column({
    length: 255,
    nullable: false,
  })
  email: string;

  @Index("idx_user_phone")
  @Unique("unique_user_phone", ["phone"])
  @Column({
    nullable: false,
  })
  phone: number;

  @Column({
    length: 72,
    nullable: false,
  })
  password: string;

  @Column({
    length: 255,
    nullable: true,
  })
  address: string;

  @Column({
    length: 50,
    nullable: false,
  })
  gender: string;

  @Column({
    nullable: false,
  })
  birth_date: Date;

  @Column({
    type: "enum",
    enum: UserRole,
    nullable: false,
  })
  role: UserRole;

  @Column({
    length: 255,
    nullable: true,
  })
  profile_img: string;

  @Column({
    length: 255,
    nullable: true,
  })
  img_caption: string;

  @OneToOne(() => PatientMeta, (patientMeta) => patientMeta.user, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "patientMeta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_user_patientMeta",
  })
  patientMeta: PatientMeta;

  @OneToOne(() => PhysicianMeta, (physicianMeta) => physicianMeta.user, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "physicianMeta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_user_physicianMeta",
  })
  physicianMeta: PhysicianMeta;

  @OneToOne(() => NurseMeta, (nurseMeta) => nurseMeta.user, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "nurseMeta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_user_nurseMeta",
  })
  nurseMeta: NurseMeta;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
