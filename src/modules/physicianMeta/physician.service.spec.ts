import { Test, TestingModule } from "@nestjs/testing";
import { PhysicianMetaService } from "./physicianMeta.service";

describe("PhysicianMetaService", () => {
  let service: PhysicianMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhysicianMetaService],
    }).compile();

    service = module.get<PhysicianMetaService>(PhysicianMetaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
