import { IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreatePhysicianMetaDto } from "src/modules/physicianMeta/dto/create-physicianMeta.dto";
import { CreatePatientMetaDto } from "src/modules/patientMeta/dto/create-patientMeta.dto";
import { CreateNurseMetaDto } from "src/modules/nurseMeta/dto/create-nurseMeta.dto";
import { CreateUserDto } from "./create-user.dto";

export class RequestUserDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePatientMetaDto)
  patientMeta?: CreatePatientMetaDto;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePhysicianMetaDto)
  physicianMeta?: CreatePhysicianMetaDto;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateNurseMetaDto)
  nurseMeta?: CreateNurseMetaDto;
}
