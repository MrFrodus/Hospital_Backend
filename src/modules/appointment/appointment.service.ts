import { Injectable, NotFoundException } from "@nestjs/common";
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

  async create(
    createAppointmentDto: CreateAppointmentDto,
    servicesIds: number[]
  ) {
    const newAppointment =
      this.appointmentRepository.create(createAppointmentDto);

    if (servicesIds.length > 0) {
      const services = await this.serviceService.findByIds(servicesIds);

      const foundIds = services.map((service) => service.id);
      const notFoundIds = servicesIds.filter((id) => !foundIds.includes(id));

      if (notFoundIds.length > 0) {
        throw new NotFoundException(
          `Services with IDs ${notFoundIds.join(", ")} not found.`
        );
      }

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
