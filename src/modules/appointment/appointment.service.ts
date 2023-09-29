import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { Appointment } from "./entities/appointment.entity";
import { ServiceService } from "../service/service.service";

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private serviceService: ServiceService
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const newAppointment =
      this.appointmentRepository.create(createAppointmentDto);

    const { service_ids } = createAppointmentDto;

    if (service_ids.length > 0) {
      const services = await this.serviceService.findByIds(service_ids);

      newAppointment.services = services;
    }

    return this.appointmentRepository.save(newAppointment);
  }

  findAll() {
    return this.appointmentRepository.find({
      relations: {
        patient: true,
        physician: true,
        nurse: true,
      },
    });
  }

  findOne(id: number) {
    return this.appointmentRepository.findOne({
      relations: {
        patient: true,
        physician: true,
        nurse: true,
        services: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);

    if (!appointment) {
      return null;
    }

    return this.appointmentRepository.save({
      ...appointment,
      ...updateAppointmentDto,
    });
  }

  remove(id: number) {
    return this.appointmentRepository.delete(id);
  }
}
