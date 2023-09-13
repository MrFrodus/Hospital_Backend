import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaModule } from "src/modules/meta/meta.module";
import { FileManager } from "src/common/filestore/file-manager.service";
import { PatientService } from "./patient.service";
import { PatientController } from "./patient.controller";
import { Patient } from "./entities/patient.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), MetaModule],
  controllers: [PatientController],
  providers: [PatientService, FileManager],
})
export class PatientModule {}
