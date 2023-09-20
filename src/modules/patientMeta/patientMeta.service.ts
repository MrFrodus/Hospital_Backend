import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { CreatePatientMetaDto } from "./dto/create-patientMeta.dto";
import { UpdatePatientMetaDto } from "./dto/update-patientMeta.dto";
import { PatientMeta } from "./entities/patientMeta.entity";

@Injectable()
export class PatientMetaService {
  constructor(
    @InjectRepository(PatientMeta)
    private patientMetaRepository: Repository<PatientMeta>,
    private readonly fileManager: FileManager
  ) {}

  async create(createPatientMetaDto: CreatePatientMetaDto) {
    const newPatientMeta =
      this.patientMetaRepository.create(createPatientMetaDto);

    return this.patientMetaRepository.save(newPatientMeta);
  }

  async findAll() {
    return this.patientMetaRepository.find({});
  }

  findOne(id: number) {
    return this.patientMetaRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePatientMetatDto: UpdatePatientMetaDto) {
    const patientMeta = await this.findOne(id);

    return this.patientMetaRepository.save({
      ...patientMeta,
      ...updatePatientMetatDto,
    });
  }

  async remove(id: number) {
    return this.patientMetaRepository.delete(id);
  }
}
