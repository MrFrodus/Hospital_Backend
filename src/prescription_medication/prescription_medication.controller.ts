import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionMedicationService } from './prescription_medication.service';
import { CreatePrescriptionMedicationDto } from './dto/create-prescription_medication.dto';
import { UpdatePrescriptionMedicationDto } from './dto/update-prescription_medication.dto';

@Controller('prescription-medication')
export class PrescriptionMedicationController {
  constructor(private readonly prescriptionMedicationService: PrescriptionMedicationService) {}

  @Post()
  create(@Body() createPrescriptionMedicationDto: CreatePrescriptionMedicationDto) {
    return this.prescriptionMedicationService.create(createPrescriptionMedicationDto);
  }

  @Get()
  findAll() {
    return this.prescriptionMedicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionMedicationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionMedicationDto: UpdatePrescriptionMedicationDto) {
    return this.prescriptionMedicationService.update(+id, updatePrescriptionMedicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionMedicationService.remove(+id);
  }
}
