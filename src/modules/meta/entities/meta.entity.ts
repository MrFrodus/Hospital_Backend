import { Nurse } from "src/modules/nurse/entities/nurse.entity";
import { Patient } from "src/modules/patient/entities/patient.entity";
import { Physician } from "src/modules/physician/entities/physician.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";

@Entity()
export class Meta {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToOne(() => Patient, (patient) => patient.meta, {
    onDelete: "CASCADE",
  })
  patient: Patient;

  @OneToOne(() => Physician, (physician) => physician.meta, {
    onDelete: "CASCADE",
  })
  physician: Physician;

  @OneToOne(() => Nurse, (nurse) => nurse.meta, {
    onDelete: "CASCADE",
  })
  nurse: Nurse;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
