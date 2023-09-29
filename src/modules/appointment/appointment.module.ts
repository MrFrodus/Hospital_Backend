import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsExist } from "src/common/validation/is-exist.rule";
import { AreExist } from "src/common/validation/are-exist.rule";
import { AppointmentService } from "./appointment.service";
import { AppointmentController } from "./appointment.controller";
import { Appointment } from "./entities/appointment.entity";
import { ServiceModule } from "../service/service.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), UserModule, ServiceModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, IsExist, AreExist],
})
export class AppointmentModule {}
