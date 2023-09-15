import { Test, TestingModule } from "@nestjs/testing";
import { PhysicianMetaController } from "./physicianMeta.controller";
import { PhysicianMetaService } from "./physicianMeta.service";

describe("PhysicianMetaController", () => {
  let controller: PhysicianMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhysicianMetaController],
      providers: [PhysicianMetaService],
    }).compile();

    controller = module.get<PhysicianMetaController>(PhysicianMetaController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
