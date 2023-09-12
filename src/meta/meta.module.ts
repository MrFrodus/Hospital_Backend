import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileManager } from "src/filestore/file-manager.service";
import { MetaService } from "./meta.service";
import { MetaController } from "./meta.controller";
import { Meta } from "./entities/meta.entity";

@Module({
  exports: [MetaService],
  imports: [TypeOrmModule.forFeature([Meta])],
  controllers: [MetaController],
  providers: [MetaService, FileManager],
})
export class MetaModule {}
