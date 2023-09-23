import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAppointmentDto } from "./create-appointment.dto";

export class RequestAppointmentDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAppointmentDto)
  appointment: CreateAppointmentDto;

  @IsNotEmpty()
  @IsArray()
  services: number[];
}
