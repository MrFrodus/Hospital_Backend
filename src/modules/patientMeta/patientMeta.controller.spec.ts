import { Test, TestingModule } from "@nestjs/testing";
import { PatientMetaController } from "./patientMeta.controller";
import { PatientMetaService } from "./patientMeta.service";

describe("PatientMetaController", () => {
  let controller: PatientMetaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientMetaController],
      providers: [PatientMetaService],
    }).compile();

    controller = module.get<PatientMetaController>(PatientMetaController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
