import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaModule } from "src/modules/meta/meta.module";
import { FileManager } from "src/common/filestore/file-manager.service";
import { PatientMetaService } from "./patientMeta.service";
import { PatientMetaController } from "./patientMeta.controller";
import { PatientMeta } from "./entities/patientMeta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PatientMeta]), MetaModule],
  controllers: [PatientMetaController],
  providers: [PatientMetaService, FileManager],
})
export class PatientMetaModule {}
