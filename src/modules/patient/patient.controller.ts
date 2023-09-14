import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { PatientService } from "./patient.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { CreateMetaDto } from "../meta/dto/create-meta.dto";

@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createPatientDto: CreatePatientDto,
    createMetaDto: CreateMetaDto
  ) {
    return this.patientService.create(createPatientDto, createMetaDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientService.findOne(+id);
  }

  @Get("img/:id")
  findOneWithImgUrl(@Param("id") id: string) {
    return this.patientService.findOneWithImgUrl(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) updatePatientDto: UpdatePatientDto
  ) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientService.remove(+id);
  }
}
