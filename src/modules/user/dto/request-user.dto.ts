import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreatePhysicianMetaDto } from "src/modules/physicianMeta/dto/create-physicianMeta.dto";
import { CreatePatientMetaDto } from "src/modules/patientMeta/dto/create-patientMeta.dto";
import { CreateNurseMetaDto } from "src/modules/nurseMeta/dto/create-nurseMeta.dto";
import { CreateUserDto } from "./create-user.dto";

export class UserRequestDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePatientMetaDto)
  patient_meta?: CreatePatientMetaDto;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePhysicianMetaDto)
  physician_meta?: CreatePhysicianMetaDto;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateNurseMetaDto)
  nurse_meta?: CreateNurseMetaDto;
}
