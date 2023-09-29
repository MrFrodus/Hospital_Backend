import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsExist } from "src/common/validation/is-exist.rule";
import { IllnessService } from "./illness.service";
import { IllnessController } from "./illness.controller";
import { Illness } from "./entities/illness.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Illness])],
  controllers: [IllnessController],
  providers: [IllnessService, IsExist],
})
export class IllnessModule {}
