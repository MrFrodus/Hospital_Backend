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
import { PrescriptionService } from "./prescription.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";

@Controller("prescription")
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const prescription = await this.prescriptionService.findOne(+id);

    if (!prescription) {
      return new NotFoundException();
    }

    return prescription;
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto
  ) {
    const updatedPrescription = await this.prescriptionService.update(
      +id,
      updatePrescriptionDto
    );

    if (!updatedPrescription) {
      return new NotFoundException();
    }

    return updatedPrescription;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    const removedPrescription = await this.prescriptionService.remove(+id);

    if (!removedPrescription) {
      return new NotFoundException();
    }

    return removedPrescription;
  }
}
