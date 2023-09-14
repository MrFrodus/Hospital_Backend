import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateMetaDto } from "src/modules/meta/dto/create-meta.dto";

export class UserRequestDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateMetaDto)
  meta: CreateMetaDto;
}
