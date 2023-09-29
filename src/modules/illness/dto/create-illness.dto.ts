import { IsNotEmpty, IsString } from "class-validator";

export class CreateIllnessDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description?: string;

  diagnosis_id: number;

  patient_id: number;
}
