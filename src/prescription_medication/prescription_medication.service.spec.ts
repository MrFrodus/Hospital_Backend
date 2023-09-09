import { Test, TestingModule } from '@nestjs/testing';
import { PrescriptionMedicationService } from './prescription_medication.service';

describe('PrescriptionMedicationService', () => {
  let service: PrescriptionMedicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrescriptionMedicationService],
    }).compile();

    service = module.get<PrescriptionMedicationService>(PrescriptionMedicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
