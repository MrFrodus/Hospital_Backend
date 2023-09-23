import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentService } from "./appointment.service";
import { AppointmentController } from "./appointment.controller";
import { Appointment } from "./entities/appointment.entity";
import { ServiceModule } from "../service/service.module";

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), ServiceModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
