import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from "class-validator";
import { IsExist } from "src/common/validation/is-exist.rule";
import { AreExist } from "src/common/validation/are-exist.rule";

export class CreateAppointmentDto {
  @IsNotEmpty()
  @IsDateString()
  starts_at: Date;

  @IsDateString()
  ends_at: Date;

  @IsNotEmpty()
  @IsBoolean()
  is_completed: boolean;

  @IsNotEmpty()
  @IsBoolean()
  is_paid: boolean;

  @IsNotEmpty()
  @IsString()
  result: string;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsInt()
  @Validate(IsExist, ["User", "id"], {
    message: "patient with such an id doesn't exist",
  })
  patient_id: number;

  @IsNotEmpty()
  @IsInt()
  @Validate(IsExist, ["User", "id"], {
    message: "nurse with such an id doesn't exist",
  })
  nurse_id: number;

  @IsNotEmpty()
  @IsInt()
  @Validate(IsExist, ["User", "id"], {
    message: "physician with such an id doesn't exist",
  })
  physician_id: number;

  @IsArray()
  @IsNumber(
    {},
    { each: true, message: "each value in service_ids must be a number" }
  )
  @Validate(AreExist, ["Service", "id"], {
    message: "invalid services ids",
  })
  service_ids: number[];
}
