import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaService } from "src/modules/meta/meta.service";
import { FileManager } from "src/common/filestore/file-manager.service";
import { CreatePhysicianMetaDto } from "./dto/create-physicianMeta.dto";
import { RequestPhysicianMetaDto } from "./dto/request-physicianMeta.dto";
import { UpdatePhysicianMetaDto } from "./dto/update-physicianMeta.dto";
import { PhysicianMeta } from "./entities/physicianMeta.entity";
import { CreateMetaDto } from "../meta/dto/create-meta.dto";

@Injectable()
export class PhysicianMetaService {
  constructor(
    @InjectRepository(PhysicianMeta)
    private physicianMetaRepository: Repository<PhysicianMeta>,
    private readonly metaService: MetaService,
    private readonly fileManager: FileManager
  ) {}

  async create(
    createPhysicianMetaDto: CreatePhysicianMetaDto,
    createMetaDto: CreateMetaDto
  ) {
    const newPhysicianMeta = this.physicianMetaRepository.create(
      createPhysicianMetaDto
    );

    const newMeta = await this.metaService.create(createMetaDto);

    newPhysicianMeta.meta = newMeta;

    return this.physicianMetaRepository.save(newPhysicianMeta);
  }

  async findAll() {
    const physicianMetas = await this.physicianMetaRepository.find({
      relations: {
        meta: true,
      },
    });

    const physicianMetasWithImgUrl = await Promise.all(
      physicianMetas.map(async (physicianMeta) => {
        if (physicianMeta.meta && physicianMeta.meta.profile_img) {
          physicianMeta.meta.profile_img = await this.fileManager.getFile(
            physicianMeta.meta.profile_img
          );
        }

        return physicianMeta;
      })
    );

    return physicianMetasWithImgUrl;
  }

  findOne(id: number) {
    return this.physicianMetaRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });
  }

  async findOneWithImgUrl(id: number) {
    const physicianMeta = await this.physicianMetaRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });

    if (physicianMeta.meta && physicianMeta.meta.profile_img) {
      physicianMeta.meta.profile_img = await this.fileManager.getFile(
        physicianMeta.meta.profile_img
      );
    }

    return physicianMeta;
  }

  async update(id: number, updatePhysicianMetatDto: UpdatePhysicianMetaDto) {
    const physicianMeta = await this.findOne(id);

    return this.physicianMetaRepository.save({
      ...physicianMeta,
      ...updatePhysicianMetatDto,
    });
  }

  async remove(id: number) {
    const physicianMeta = await this.findOne(id);

    this.metaService.remove(physicianMeta.meta.id);

    return physicianMeta;
  }
}
