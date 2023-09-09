import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
