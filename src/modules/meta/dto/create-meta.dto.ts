import {
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsString,
  IsDate,
} from "class-validator";

export class CreateMetaDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  ssn?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  birth_date?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  profile_img?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  img_caption?: string;
}
