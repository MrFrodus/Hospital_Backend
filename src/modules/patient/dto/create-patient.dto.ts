import { IsInt, IsOptional, IsNotEmpty } from "class-validator";
import { CreateUserDto } from "src/shared/user/create-user.dto";

export class CreatePatientDto extends CreateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  ssn?: number;
}
