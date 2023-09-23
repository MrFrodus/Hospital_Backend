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

import { Service } from "src/modules/service/entities/service.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Index("idx_appointment_patient")
  @ManyToOne(() => User)
  @JoinColumn({
    name: "patient_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_appointment_patient",
  })
  patient: User;

  @Index("idx_appointment_physician")
  @ManyToOne(() => User)
  @JoinColumn({
    name: "physician_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_appointment_physician",
  })
  physician: User;

  @Index("idx_appointment_nurse")
  @ManyToOne(() => User)
  @JoinColumn({
    name: "nurse_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_appointment_nurse",
  })
  nurse: User;

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

  @ManyToMany(() => Service, { cascade: true })
  @JoinTable({
    name: "appointment_service",
  })
  services: Service[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
