import { PartialType } from "@nestjs/mapped-types";
import { CreateMetaDto } from "./create-meta.dto";

export class UpdateMetaDto extends PartialType(CreateMetaDto) {
  address: string;

  age: number;

  gender: string;

  birth_date: string;
}
