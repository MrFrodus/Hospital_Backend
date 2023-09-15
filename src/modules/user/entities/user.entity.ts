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
  ManyToOne,
} from "typeorm";

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
    nullable: true,
  })
  gender: string;

  @Column({
    nullable: true,
  })
  birth_date: Date;

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

  @OneToOne(() => PatientMeta, (patientMeta) => patientMeta.meta, {
    onDelete: "CASCADE",
  })
  patientMeta: PatientMeta;

  @OneToOne(() => PhysicianMeta, (physicianMeta) => physicianMeta.meta, {
    onDelete: "CASCADE",
  })
  physicianMeta: PhysicianMeta;

  @OneToOne(() => Nurse, (nurse) => nurse.meta, {
    onDelete: "CASCADE",
  })
  nurse: Nurse;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
