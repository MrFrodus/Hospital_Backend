import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IllnessService } from "./illness.service";
import { IllnessController } from "./illness.controller";
import { Illness } from "./entities/illness.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Illness])],
  controllers: [IllnessController],
  providers: [IllnessService],
})
export class IllnessModule {}
