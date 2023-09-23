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
import { MedicationService } from "./medication.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";

@Controller("medication")
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @Get()
  findAll() {
    return this.medicationService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const medication = await this.medicationService.findOne(+id);

    if (!medication) {
      return new NotFoundException();
    }

    return medication;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ) {
    const updatedMedication = await this.medicationService.update(
      +id,
      updateMedicationDto
    );

    if (!updatedMedication) {
      return new NotFoundException();
    }

    return updatedMedication;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const removedMedication = await this.medicationService.remove(+id);

    if (!removedMedication) {
      return new NotFoundException();
    }

    return removedMedication;
  }
}
