import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaService } from "src/modules/meta/meta.service";
import { FileManager } from "src/common/filestore/file-manager.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { Patient } from "./entities/patient.entity";
import { CreateMetaDto } from "../meta/dto/create-meta.dto";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    private readonly metaService: MetaService,
    private readonly fileManager: FileManager
  ) {}

  async create(
    createPatientDto: CreatePatientDto,
    createMetaDto: CreateMetaDto
  ) {
    const newPatient = this.patientRepository.create(createPatientDto);

    const newMeta = await this.metaService.create(newPatient.meta);

    newPatient.meta = newMeta;

    return this.patientRepository.save(newPatient);
  }

  async findAll() {
    const patients = await this.patientRepository.find({
      relations: {
        meta: true,
      },
    });

    const patientsWithImgUrl = await Promise.all(
      patients.map(async (patient) => {
        if (patient.meta && patient.meta.profile_img) {
          patient.meta.profile_img = await this.fileManager.getFile(
            patient.meta.profile_img
          );
        }

        return patient;
      })
    );

    return patientsWithImgUrl;
  }

  findOne(id: number) {
    return this.patientRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });
  }

  async findOneWithImgUrl(id: number) {
    const patient = await this.patientRepository.findOne({
      relations: {
        meta: true,
      },
      where: {
        id,
      },
    });

    if (patient.meta && patient.meta.profile_img) {
      patient.meta.profile_img = await this.fileManager.getFile(
        patient.meta.profile_img
      );
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);

    return this.patientRepository.save({ ...patient, ...updatePatientDto });
  }

  async remove(id: number) {
    const patient = await this.findOne(id);

    await this.fileManager.deleteFile(patient.meta.profile_img);

    await this.metaService.remove(patient.meta.id);

    return patient;
  }
}
