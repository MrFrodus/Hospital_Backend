import { Test, TestingModule } from '@nestjs/testing';
import { PhysicianController } from './physician.controller';
import { PhysicianService } from './physician.service';

describe('PhysicianController', () => {
  let controller: PhysicianController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicianController],
      providers: [PhysicianService],
    }).compile();

    controller = module.get<PhysicianController>(PhysicianController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
