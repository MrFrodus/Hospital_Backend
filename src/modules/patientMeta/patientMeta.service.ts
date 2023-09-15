import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaService } from "src/modules/meta/meta.service";
import { FileManager } from "src/common/filestore/file-manager.service";
import { CreatePatientMetaDto } from "./dto/create-patientMeta.dto";
import { UpdatePatientMetaDto } from "./dto/update-patientMeta.dto";
import { PatientMeta } from "./entities/patientMeta.entity";
import { CreateMetaDto } from "../meta/dto/create-meta.dto";

@Injectable()
export class PatientMetaService {
  constructor(
    @InjectRepository(PatientMeta)
    private patientMetaRepository: Repository<PatientMeta>,
    private readonly metaService: MetaService,
    private readonly fileManager: FileManager
  ) {}

  async create(
    createPatientMetaDto: CreatePatientMetaDto,
    createMetaDto: CreateMetaDto
  ) {
    const newPatientMeta =
      this.patientMetaRepository.create(createPatientMetaDto);

    const newMeta = await this.metaService.create(newPatientMeta.meta);

    newPatientMeta.meta = newMeta;

    return this.patientMetaRepository.save(newPatientMeta);
  }

  async findAll() {
    const patientMetas = await this.patientMetaRepository.find({
      relations: {
        meta: true,
      },
    });

    const patientMetasWithImgUrl = await Promise.all(
      patientMetas.map(async (patientMeta) => {
        if (patientMeta.meta && patientMeta.meta.profile_img) {
          patientMeta.meta.profile_img = await this.fileManager.getFile(
            patientMeta.meta.profile_img
          );
        }

        return patientMeta;
      })
    );

    return patientMetasWithImgUrl;
  }

  findOne(id: number) {
    return this.patientMetaRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });
  }

  async findOneWithImgUrl(id: number) {
    const patientMeta = await this.patientMetaRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });

    if (patientMeta.meta && patientMeta.meta.profile_img) {
      patientMeta.meta.profile_img = await this.fileManager.getFile(
        patientMeta.meta.profile_img
      );
    }

    return patientMeta;
  }

  async update(id: number, updatePatientMetaDto: UpdatePatientMetaDto) {
    const patientMeta = await this.findOne(id);

    return this.patientMetaRepository.save({
      ...patientMeta,
      ...updatePatientMetaDto,
    });
  }

  async remove(id: number) {
    const patientMeta = await this.findOne(id);

    await this.fileManager.deleteFile(patientMeta.meta.profile_img);

    await this.metaService.remove(patientMeta.meta.id);

    return patientMeta;
  }
}
