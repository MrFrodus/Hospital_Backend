import { Meta } from "src/modules/meta/entities/meta.entity";

export interface IUser {
  name: string;

  email: string;

  phone: number;

  password: string;

  meta: Meta;
}
