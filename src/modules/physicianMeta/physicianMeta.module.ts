import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { IsExist } from "src/common/validation/is-exist.rule";
import { FileManagerModule } from "src/common/filestore/file-manager.module";
import { PhysicianMetaService } from "./physicianMeta.service";
import { PhysicianMetaController } from "./physicianMeta.controller";
import { PhysicianMeta } from "./entities/physicianMeta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PhysicianMeta]), FileManagerModule],
  exports: [PhysicianMetaService],
  controllers: [PhysicianMetaController],
  providers: [PhysicianMetaService, IsExist],
})
export class PhysicianMetaModule {}
