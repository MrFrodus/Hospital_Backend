import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaService } from "src/modules/meta/meta.service";
import { FileManager } from "src/common/filestore/file-manager.service";
import { CreatePhysicianDto } from "./dto/create-physician.dto";
import { UpdatePhysicianDto } from "./dto/update-physician.dto";
import { Physician } from "./entities/physician.entity";

@Injectable()
export class PhysicianService {
  constructor(
    @InjectRepository(Physician)
    private physicianRepository: Repository<Physician>,
    private readonly metaService: MetaService,
    private readonly fileManager: FileManager
  ) {}

  async create(createPhysicianDto: CreatePhysicianDto) {
    const newPhysician = this.physicianRepository.create(createPhysicianDto);

    const newMeta = await this.metaService.create({});

    newPhysician.meta = newMeta;

    return this.physicianRepository.save(newPhysician);
  }

  async findAll() {
    const physicians = await this.physicianRepository.find({
      relations: {
        meta: true,
      },
    });

    const physiciansWithImgUrl = await Promise.all(
      physicians.map(async (physician) => {
        if (physician.meta && physician.meta.profile_img) {
          physician.meta.profile_img = await this.fileManager.getFile(
            physician.meta.profile_img
          );
        }

        return physician;
      })
    );

    return physiciansWithImgUrl;
  }

  findOne(id: number) {
    return this.physicianRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });
  }

  async findOneWithImgUrl(id: number) {
    const physician = await this.physicianRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });

    if (physician.meta && physician.meta.profile_img) {
      physician.meta.profile_img = await this.fileManager.getFile(
        physician.meta.profile_img
      );
    }

    return physician;
  }

  async update(id: number, updatePhysiciantDto: UpdatePhysicianDto) {
    const physician = await this.findOne(id);

    return this.physicianRepository.save({
      ...physician,
      ...updatePhysiciantDto,
    });
  }

  async remove(id: number) {
    const physician = await this.findOne(id);

    this.metaService.remove(physician.meta.id);

    return physician;
  }
}
