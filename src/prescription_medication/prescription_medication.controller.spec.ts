import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionMedicationController } from './prescription_medication.controller';
import { PrescriptionMedicationService } from './prescription_medication.service';

describe('PrescriptionMedicationController', () => {
  let controller: PrescriptionMedicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrescriptionMedicationController],
      providers: [PrescriptionMedicationService],
    }).compile();

    controller = module.get<PrescriptionMedicationController>(PrescriptionMedicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
