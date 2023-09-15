import { RequestUserDto } from "src/shared/user/request-user.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreatePatientMetaDto } from "./create-patientMeta.dto";

export class RequestPatientMetaDto extends RequestUserDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePatientMetaDto)
  patientMeta: CreatePatientMetaDto;
}
