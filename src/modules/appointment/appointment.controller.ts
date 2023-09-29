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
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";

@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
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
