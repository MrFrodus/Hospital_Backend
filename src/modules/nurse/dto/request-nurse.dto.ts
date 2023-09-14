import { RequestUserDto } from "src/shared/user/request-user.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateNurseDto } from "./create-nurse.dto";

export class RequestNurseDto extends RequestUserDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateNurseDto)
  nurse: CreateNurseDto;
}
