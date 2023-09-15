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

import { Meta } from "src/modules/meta/entities/meta.entity";

@Entity()
export class PatientMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Index("idx_patientMeta_email")
  @Unique("unique_patientMeta_email", ["email"])
  @Column({
    length: 255,
    nullable: false,
  })
  email: string;

  @Index("idx_patientMeta_phone")
  @Unique("unique_patientMeta_phone", ["phone"])
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

  @OneToOne(() => Meta, (meta) => meta.patientMeta, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "meta_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fk_patientMeta_meta",
  })
  meta: Meta;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
