import { CreateUserDto } from "src/shared/user/create-user.dto";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreatePhysicianMetaDto extends CreateUserDto {
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
