import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from "class-validator";
import { AreExist } from "src/common/validation/are-exist.rule";
import { IsExist } from "src/common/validation/is-exist.rule";

export class CreatePrescriptionDto {
  @IsNotEmpty()
  @IsInt()
  @Validate(IsExist, ["User", "id"], {
    message: "physician with such an id doesn't exist",
  })
  physician_id: number;

  @IsNotEmpty()
  @IsInt()
  @Validate(IsExist, ["User", "id"], {
    message: "patient with such an id doesn't exist",
  })
  patient_id: number;

  @IsString()
  description: string;

  @IsArray()
  @IsNumber(
    {},
    { each: true, message: "each value in service_ids must be a number" }
  )
  @Validate(AreExist, ["Medication", "id"], {
    message: "invalid medications' ids",
  })
  medication_ids: number[];
}
