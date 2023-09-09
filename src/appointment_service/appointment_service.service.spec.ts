import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentServiceService } from './appointment_service.service';

describe('AppointmentServiceService', () => {
  let service: AppointmentServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentServiceService],
    }).compile();

    service = module.get<AppointmentServiceService>(AppointmentServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
