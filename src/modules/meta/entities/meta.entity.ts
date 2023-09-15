import { Nurse } from "src/modules/nurse/entities/nurse.entity";
import { PatientMeta } from "src/modules/patientMeta/entities/patientMeta.entity";
import { PhysicianMeta } from "src/modules/physicianMeta/entities/physicianMeta.entity";
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
}
