import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { RequestAppointmentDto } from "./dto/request-appointment.dto";

@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() requestAppointmentDto: RequestAppointmentDto) {
    return this.appointmentService.create(
      requestAppointmentDto.appointment,
      requestAppointmentDto.services
    );
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const appointment = await this.appointmentService.findOne(+id);

    if (!appointment) {
      return new NotFoundException();
    }

    return appointment;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    const updatedAppointment = await this.appointmentService.update(
      +id,
      updateAppointmentDto
    );

    if (!updatedAppointment) {
      return new NotFoundException();
    }

    return updatedAppointment;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const removedAppointment = await this.appointmentService.remove(+id);

    if (!removedAppointment) {
      return new NotFoundException();
    }

    return removedAppointment;
  }
}
