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

import { Meta } from "src/meta/entities/meta.entity";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Index("idx_patient_email")
  @Unique("unique_patient_email", ["email"])
  @Column({
    length: 255,
    nullable: false,
  })
  email: string;

  @Index("idx_patient_phone")
  @Unique("unique_patient_phone", ["phone"])
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
    nullable: true,
  })
  ssn: number;

  @OneToOne(() => Meta)
  @JoinColumn({
    name: "meta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_patient_meta",
  })
  meta: Meta;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
