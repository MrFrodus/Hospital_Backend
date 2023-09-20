import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { PhysicianMetaService } from "./physicianMeta.service";
import { PhysicianMetaController } from "./physicianMeta.controller";
import { PhysicianMeta } from "./entities/physicianMeta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PhysicianMeta])],
  exports: [PhysicianMetaService],
  controllers: [PhysicianMetaController],
  providers: [PhysicianMetaService, FileManager],
})
export class PhysicianMetaModule {}
