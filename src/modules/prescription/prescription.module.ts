import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsExist } from "src/common/validation/is-exist.rule";
import { AreExist } from "src/common/validation/are-exist.rule";
import { PrescriptionService } from "./prescription.service";
import { PrescriptionController } from "./prescription.controller";
import { Prescription } from "./entities/prescription.entity";
import { MedicationModule } from "../medication/medication.module";

@Module({
  imports: [TypeOrmModule.forFeature([Prescription]), MedicationModule],
  controllers: [PrescriptionController],
  providers: [PrescriptionService, IsExist, AreExist],
})
export class PrescriptionModule {}
