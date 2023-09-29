import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  cost: number;

  @IsString()
  details: string;
}
