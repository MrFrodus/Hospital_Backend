import { RequestUserDto } from "src/shared/user/request-user.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreatePhysicianMetaDto } from "./create-physicianMeta.dto";

export class RequestPhysicianMetaDto extends RequestUserDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreatePhysicianMetaDto)
  physicianMeta: CreatePhysicianMetaDto;
}
