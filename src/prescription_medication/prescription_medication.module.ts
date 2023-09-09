import { Module } from '@nestjs/common';
import { PrescriptionMedicationService } from './prescription_medication.service';
import { PrescriptionMedicationController } from './prescription_medication.controller';

@Module({
  controllers: [PrescriptionMedicationController],
  providers: [PrescriptionMedicationService],
})
export class PrescriptionMedicationModule {}
