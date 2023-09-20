import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateNurseMetaDto {
  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsInt()
  department_id?: number;
}
