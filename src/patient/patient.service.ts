import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MetaService } from "src/meta/meta.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { Patient } from "./entities/patient.entity";

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    private readonly metaService: MetaService
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const newPatient = this.patientRepository.create(createPatientDto);

    const newMeta = await this.metaService.create({});

    newPatient.meta = newMeta;

    return this.patientRepository.save(newPatient);
  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, UpdatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
