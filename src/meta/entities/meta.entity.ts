import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  age: number;

  @Column()
  gender: string;
}
