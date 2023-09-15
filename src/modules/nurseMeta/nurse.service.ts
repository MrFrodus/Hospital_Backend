import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaService } from "src/modules/meta/meta.service";
import { FileManager } from "src/common/filestore/file-manager.service";
import { UpdateNurseDto } from "./dto/update-nurse.dto";
import { CreateNurseDto } from "./dto/create-nurse.dto";
import { Nurse } from "./entities/nurse.entity";

@Injectable()
export class NurseService {
  constructor(
    @InjectRepository(Nurse) private nurseRepository: Repository<Nurse>,
    private readonly metaService: MetaService,
    private readonly fileManager: FileManager
  ) {}

  async create(createNurseDto: CreateNurseDto) {
    const newNurse = this.nurseRepository.create(createNurseDto);

    const newMeta = await this.metaService.create({});

    newNurse.meta = newMeta;

    return this.nurseRepository.save(newNurse);
  }

  async findAll() {
    const nurses = await this.nurseRepository.find({
      relations: {
        meta: true,
      },
    });

    const nursesWithImgUrl = await Promise.all(
      nurses.map(async (nurse) => {
        if (nurse.meta && nurse.meta.profile_img) {
          nurse.meta.profile_img = await this.fileManager.getFile(
            nurse.meta.profile_img
          );
        }

        return nurse;
      })
    );

    return nursesWithImgUrl;
  }

  findOne(id: number) {
    return this.nurseRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });
  }

  async findOneWithImgUrl(id: number) {
    const nurse = await this.nurseRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });

    if (nurse.meta && nurse.meta.profile_img) {
      nurse.meta.profile_img = await this.fileManager.getFile(
        nurse.meta.profile_img
      );
    }

    return nurse;
  }

  async update(id: number, updateNurseDto: UpdateNurseDto) {
    const nurse = await this.findOne(id);

    return this.nurseRepository.save({ ...nurse, ...updateNurseDto });
  }

  async remove(id: number) {
    const nurse = await this.findOne(id);

    this.metaService.remove(nurse.meta.id);

    return nurse;
  }
}
