import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { FileManagerModule } from "src/common/filestore/file-manager.module";
import { PatientMetaService } from "./patientMeta.service";
import { PatientMetaController } from "./patientMeta.controller";
import { PatientMeta } from "./entities/patientMeta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PatientMeta]), FileManagerModule],
  exports: [PatientMetaService],
  controllers: [PatientMetaController],
  providers: [PatientMetaService],
})
export class PatientMetaModule {}
