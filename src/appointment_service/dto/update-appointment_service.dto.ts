import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentServiceDto } from './create-appointment_service.dto';

export class UpdateAppointmentServiceDto extends PartialType(CreateAppointmentServiceDto) {}
