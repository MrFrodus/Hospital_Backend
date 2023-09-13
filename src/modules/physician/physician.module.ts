import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaModule } from "src/modules/meta/meta.module";
import { FileManager } from "src/common/filestore/file-manager.service";
import { PhysicianService } from "./physician.service";
import { PhysicianController } from "./physician.controller";
import { Physician } from "./entities/physician.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Physician]), MetaModule],
  controllers: [PhysicianController],
  providers: [PhysicianService, FileManager],
})
export class PhysicianModule {}
