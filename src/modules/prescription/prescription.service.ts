import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { Prescription } from "./entities/prescription.entity";
import { MedicationService } from "../medication/medication.service";

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
    private medicationSerice: MedicationService
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const newPrescription = this.prescriptionRepository.create(
      createPrescriptionDto
    );

    const { medication_ids } = createPrescriptionDto;

    const medications = await this.medicationSerice.findByIds(medication_ids);

    const foundIds = medications.map((service) => service.id);
    const notFoundIds = medication_ids.filter((id) => !foundIds.includes(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `Medication with IDs ${notFoundIds.join(", ")} not found.`
      );
    }

    newPrescription.medications = medications;

    return this.prescriptionRepository.save(newPrescription);
  }

  findAll() {
    return this.prescriptionRepository.find({
      relations: {
        patient: true,
      },
    });
  }

  findOne(id: number) {
    return this.prescriptionRepository.findOne({
      relations: {
        patient: true,
      },
      where: { id },
    });
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    const prescription = await this.findOne(id);

    if (!prescription) {
      return null;
    }

    return this.prescriptionRepository.save({
      ...prescription,
      ...updatePrescriptionDto,
    });
  }

  remove(id: number) {
    return this.prescriptionRepository.delete(id);
  }
}
