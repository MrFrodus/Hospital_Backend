import { User } from "src/modules/user/entities/user.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";

@Entity()
export class PatientMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  ssn: number;

  @OneToOne(() => User, (user) => user.patientMeta, {
    onDelete: "CASCADE",
  })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
