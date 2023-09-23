import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDiagnosisDto } from "./dto/create-diagnosis.dto";
import { UpdateDiagnosisDto } from "./dto/update-diagnosis.dto";
import { Diagnosis } from "./entities/diagnosis.entity";

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private diagnosisRepository: Repository<Diagnosis>
  ) {}

  create(createDiagnosisDto: CreateDiagnosisDto) {
    const newDiagnosis = this.diagnosisRepository.create(createDiagnosisDto);

    return this.diagnosisRepository.save(newDiagnosis);
  }

  findAll() {
    return this.diagnosisRepository.find({
      relations: {
        patient: true,
        physician: true,
        appointment: true,
      },
    });
  }

  findOne(id: number) {
    return this.diagnosisRepository.findOne({
      relations: {
        patient: true,
        physician: true,
        appointment: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateDiagnosisDto: UpdateDiagnosisDto) {
    const diagnosis = await this.findOne(id);

    if (!diagnosis) {
      return null;
    }

    return this.diagnosisRepository.save({
      ...diagnosis,
      ...updateDiagnosisDto,
    });
  }

  remove(id: number) {
    return this.diagnosisRepository.delete(id);
  }
}
