import { Injectable } from "@nestjs/common";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { Service } from "./entities/service.entity";

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>
  ) {}

  create(createServiceDto: CreateServiceDto) {
    const newService = this.serviceRepository.create(createServiceDto);

    return this.serviceRepository.save(newService);
  }

  findAll() {
    return this.serviceRepository.find({
      relations: {
        appointments: true,
      },
    });
  }

  findOne(id: number) {
    return this.serviceRepository.findOne({
      where: { id },
      relations: {
        appointments: true,
      },
    });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);

    if (!service) {
      return null;
    }

    return this.serviceRepository.save({
      ...service,
      ...updateServiceDto,
    });
  }

  remove(id: number) {
    return this.serviceRepository.delete(id);
  }

  findByIds(ids: number[]) {
    return this.serviceRepository.findBy({ id: In(ids) });
  }

  validateByIds(ids: number[]) {
    return this.serviceRepository.find({
      where: { id: In(ids) },
      select: {
        id: true,
      },
    });
  }
}
