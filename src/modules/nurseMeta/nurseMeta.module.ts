import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { FileManagerModule } from "src/common/filestore/file-manager.module";
import { NurseMetaService } from "./nurseMeta.service";
import { NurseMetaController } from "./nurseMeta.controller";
import { NurseMeta } from "./entities/nurseMeta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NurseMeta]), FileManagerModule],
  exports: [NurseMetaService],
  controllers: [NurseMetaController],
  providers: [NurseMetaService],
})
export class NurseMetaModule {}
