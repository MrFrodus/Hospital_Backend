import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentServiceService } from './appointment_service.service';
import { CreateAppointmentServiceDto } from './dto/create-appointment_service.dto';
import { UpdateAppointmentServiceDto } from './dto/update-appointment_service.dto';

@Controller('appointment-service')
export class AppointmentServiceController {
  constructor(private readonly appointmentServiceService: AppointmentServiceService) {}

  @Post()
  create(@Body() createAppointmentServiceDto: CreateAppointmentServiceDto) {
    return this.appointmentServiceService.create(createAppointmentServiceDto);
  }

  @Get()
  findAll() {
    return this.appointmentServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentServiceDto: UpdateAppointmentServiceDto) {
    return this.appointmentServiceService.update(+id, updateAppointmentServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentServiceService.remove(+id);
  }
}
