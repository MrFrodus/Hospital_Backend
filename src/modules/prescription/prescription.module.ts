import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PrescriptionService } from "./prescription.service";
import { PrescriptionController } from "./prescription.controller";
import { Prescription } from "./entities/prescription.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Prescription])],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule {}
