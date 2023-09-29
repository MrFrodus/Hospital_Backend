import { Prescription } from "src/modules/prescription/entities/prescription.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  requires_recipe: boolean;

  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    length: 255,
    nullable: true,
  })
  details: string;

  @ManyToMany(() => Prescription, (prescription) => prescription.medications)
  prescriptions: Prescription[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
