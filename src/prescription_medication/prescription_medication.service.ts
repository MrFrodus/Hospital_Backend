import { Injectable } from '@nestjs/common';
import { CreatePrescriptionMedicationDto } from './dto/create-prescription_medication.dto';
import { UpdatePrescriptionMedicationDto } from './dto/update-prescription_medication.dto';

@Injectable()
export class PrescriptionMedicationService {
  create(createPrescriptionMedicationDto: CreatePrescriptionMedicationDto) {
    return 'This action adds a new prescriptionMedication';
  }

  findAll() {
    return `This action returns all prescriptionMedication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prescriptionMedication`;
  }

  update(id: number, updatePrescriptionMedicationDto: UpdatePrescriptionMedicationDto) {
    return `This action updates a #${id} prescriptionMedication`;
  }

  remove(id: number) {
    return `This action removes a #${id} prescriptionMedication`;
  }
}
