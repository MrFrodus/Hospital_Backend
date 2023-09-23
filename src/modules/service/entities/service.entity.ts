import { Appointment } from "src/modules/appointment/entities/appointment.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    nullable: false,
  })
  cost: number;

  @Column({
    length: 255,
    nullable: true,
  })
  details: string;

  @ManyToMany(() => Appointment, (appointment) => appointment.services)
  appointments: Appointment[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
