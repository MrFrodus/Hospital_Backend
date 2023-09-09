import { Injectable } from '@nestjs/common';
import { CreateAppointmentServiceDto } from './dto/create-appointment_service.dto';
import { UpdateAppointmentServiceDto } from './dto/update-appointment_service.dto';

@Injectable()
export class AppointmentServiceService {
  create(createAppointmentServiceDto: CreateAppointmentServiceDto) {
    return 'This action adds a new appointmentService';
  }

  findAll() {
    return `This action returns all appointmentService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointmentService`;
  }

  update(id: number, updateAppointmentServiceDto: UpdateAppointmentServiceDto) {
    return `This action updates a #${id} appointmentService`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointmentService`;
  }
}
