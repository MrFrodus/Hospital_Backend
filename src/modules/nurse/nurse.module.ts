import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaModule } from "src/modules/meta/meta.module";
import { FileManager } from "src/common/filestore/file-manager.service";
import { NurseService } from "./nurse.service";
import { NurseController } from "./nurse.controller";
import { Nurse } from "./entities/nurse.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Nurse]), MetaModule],
  controllers: [NurseController],
  providers: [NurseService, FileManager],
})
export class NurseModule {}
