import { Test, TestingModule } from "@nestjs/testing";
import { PatientMetaService } from "./patientMeta.service";

describe("PatientMetaService", () => {
  let service: PatientMetaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientMetaService],
    }).compile();

    service = module.get<PatientMetaService>(PatientMetaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
