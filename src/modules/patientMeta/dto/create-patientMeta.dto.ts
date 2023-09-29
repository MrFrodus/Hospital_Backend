import { IsInt } from "class-validator";

export class CreatePatientMetaDto {
  @IsInt()
  ssn?: number;
}
