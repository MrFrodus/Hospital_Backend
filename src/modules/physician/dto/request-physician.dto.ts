import { RequestUserDto } from "src/shared/user/request-user.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreatePhysicianDto } from "./create-physician.dto";

export class RequestPhysicianDto extends RequestUserDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePhysicianDto)
  physician: CreatePhysicianDto;
}
