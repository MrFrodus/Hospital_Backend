import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { Medication } from "./entities/medication.entity";

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>
  ) {}

  create(createMedicationDto: CreateMedicationDto) {
    const newMedication = this.medicationRepository.create(createMedicationDto);

    return this.medicationRepository.save(newMedication);
  }

  findAll() {
    return this.medicationRepository.find();
  }

  findOne(id: number) {
    return this.medicationRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto) {
    const medication = await this.findOne(id);

    if (!medication) {
      return null;
    }

    return this.medicationRepository.save({
      ...medication,
      ...updateMedicationDto,
    });
  }

  remove(id: number) {
    return this.medicationRepository.delete(id);
  }
}
