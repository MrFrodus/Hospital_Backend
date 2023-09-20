import { IsInt, IsOptional, IsString } from "class-validator";

export class CreatePhysicianMetaDto {
  @IsOptional()
  @IsString()
  specification?: string;

  @IsOptional()
  @IsString()
  qualification?: string;

  @IsOptional()
  @IsInt()
  department_id?: number;
}
