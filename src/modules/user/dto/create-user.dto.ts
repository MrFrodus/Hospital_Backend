import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsInt,
  IsDateString,
  IsEnum,
  Validate,
} from "class-validator";
import { IsNotExist } from "src/common/validation/is-not-exist.rule";

import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ["User", "email"], {
    message: "user with such an email already exists",
  })
  email: string;

  @IsNotEmpty()
  @IsInt()
  @Validate(IsNotExist, ["User", "phone"], {
    message: "user with such an phone number already exists",
  })
  phone: number;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsDateString()
  birth_date: Date;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  profile_img?: string;

  @IsString()
  img_caption?: string;
}
