import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PatientMetaService } from "./patientMeta.service";
import { CreatePatientMetaDto } from "./dto/create-patientMeta.dto";
import { UpdatePatientMetaDto } from "./dto/update-patientMeta.dto";

@Controller("patientMeta")
export class PatientMetaController {
  constructor(private readonly patientMetaService: PatientMetaService) {}

  @Post()
  create(
    @Body()
    createPatientMetaDto: CreatePatientMetaDto
  ) {
    return this.patientMetaService.create(createPatientMetaDto);
  }

  @Get()
  findAll() {
    return this.patientMetaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientMetaService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePatientMetaDto: UpdatePatientMetaDto
  ) {
    return this.patientMetaService.update(+id, updatePatientMetaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientMetaService.remove(+id);
  }
}
