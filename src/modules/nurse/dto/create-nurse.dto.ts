import { CreateUserDto } from "src/shared/user/create-user.dto";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateNurseDto extends CreateUserDto {
  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsInt()
  department_id?: number;
}
