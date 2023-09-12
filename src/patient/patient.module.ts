import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaModule } from "src/meta/meta.module";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";
import { Patient } from "./entities/patient.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), MetaModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
