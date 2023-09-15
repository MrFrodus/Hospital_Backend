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
import { PatientMetaService } from "./patientMeta.service";
import { CreatePatientMetaDto } from "./dto/create-patientMeta.dto";
import { UpdatePatientMetaDto } from "./dto/update-patientMeta.dto";
import { CreateMetaDto } from "../meta/dto/create-meta.dto";

@Controller("patientMeta")
export class PatientMetaController {
  constructor(private readonly patientMetaService: PatientMetaService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createPatientMetaDto: CreatePatientMetaDto,
    createMetaDto: CreateMetaDto
  ) {
    return this.patientMetaService.create(createPatientMetaDto, createMetaDto);
  }

  @Get()
  findAll() {
    return this.patientMetaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientMetaService.findOne(+id);
  }

  @Get("img/:id")
  findOneWithImgUrl(@Param("id") id: string) {
    return this.patientMetaService.findOneWithImgUrl(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) updatePatientMetaDto: UpdatePatientMetaDto
  ) {
    return this.patientMetaService.update(+id, updatePatientMetaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientMetaService.remove(+id);
  }
}
