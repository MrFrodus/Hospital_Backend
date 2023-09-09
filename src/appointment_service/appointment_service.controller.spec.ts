import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentServiceController } from './appointment_service.controller';
import { AppointmentServiceService } from './appointment_service.service';

describe('AppointmentServiceController', () => {
  let controller: AppointmentServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentServiceController],
      providers: [AppointmentServiceService],
    }).compile();

    controller = module.get<AppointmentServiceController>(AppointmentServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
