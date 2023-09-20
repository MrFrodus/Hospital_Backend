import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { NurseMetaService } from "./nurseMeta.service";
import { NurseMetaController } from "./nurseMeta.controller";
import { NurseMeta } from "./entities/nurseMeta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NurseMeta])],
  exports: [NurseMetaService],
  controllers: [NurseMetaController],
  providers: [NurseMetaService, FileManager],
})
export class NurseMetaModule {}
