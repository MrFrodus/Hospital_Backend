import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MetaService } from "./meta.service";
import { MetaController } from "./meta.controller";
import { Meta } from "./entities/meta.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Meta])],
  controllers: [MetaController],
  providers: [MetaService],
  exports: [Meta],
})
export class MetaModule {}
