import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateMedicationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsBoolean()
  requires_recipe: boolean;
}
