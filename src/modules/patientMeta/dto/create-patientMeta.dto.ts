import { IsInt, IsOptional, IsNotEmpty } from "class-validator";

export class CreatePatientMetaDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  ssn?: number;
}
