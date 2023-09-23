import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { CreatePhysicianMetaDto } from "./dto/create-physicianMeta.dto";
import { UpdatePhysicianMetaDto } from "./dto/update-physicianMeta.dto";
import { PhysicianMeta } from "./entities/physicianMeta.entity";

@Injectable()
export class PhysicianMetaService {
  constructor(
    @InjectRepository(PhysicianMeta)
    private physicianMetaRepository: Repository<PhysicianMeta>,
    private readonly fileManager: FileManager
  ) {}

  async create(createPhysicianMetaDto: CreatePhysicianMetaDto) {
    const newPhysicianMeta = this.physicianMetaRepository.create(
      createPhysicianMetaDto
    );

    return this.physicianMetaRepository.save(newPhysicianMeta);
  }

  async findAll() {
    return this.physicianMetaRepository.find();
  }

  findOne(id: number) {
    return this.physicianMetaRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePhysicianMetatDto: UpdatePhysicianMetaDto) {
    const physicianMeta = await this.findOne(id);

    return this.physicianMetaRepository.save({
      ...physicianMeta,
      ...updatePhysicianMetatDto,
    });
  }

  async remove(id: number) {
    return this.physicianMetaRepository.delete(id);
  }
}
