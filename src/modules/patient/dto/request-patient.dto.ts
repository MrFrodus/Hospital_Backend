import { RequestUserDto } from "src/shared/user/request-user.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreatePatientDto } from "./create-patient.dto";

export class RequestPatientDto extends RequestUserDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePatientDto)
  patient: CreatePatientDto;
}
