import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { DiagnosisService } from "./diagnosis.service";
import { CreateDiagnosisDto } from "./dto/create-diagnosis.dto";
import { UpdateDiagnosisDto } from "./dto/update-diagnosis.dto";

@Controller("diagnosis")
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosisService.create(createDiagnosisDto);
  }

  @Get()
  findAll() {
    return this.diagnosisService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const diagnosis = await this.diagnosisService.findOne(+id);

    if (!diagnosis) {
      return new NotFoundException();
    }

    return diagnosis;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDiagnosisDto: UpdateDiagnosisDto
  ) {
    const updatedDiagnosis = await this.diagnosisService.update(
      +id,
      updateDiagnosisDto
    );

    if (!updatedDiagnosis) {
      return new NotFoundException();
    }

    return updatedDiagnosis;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const removedDiagnosis = await this.diagnosisService.remove(+id);

    if (!removedDiagnosis) {
      return new NotFoundException();
    }

    return removedDiagnosis;
  }
}
