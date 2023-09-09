import { Module } from '@nestjs/common';
import { AppointmentServiceService } from './appointment_service.service';
import { AppointmentServiceController } from './appointment_service.controller';

@Module({
  controllers: [AppointmentServiceController],
  providers: [AppointmentServiceService],
})
export class AppointmentServiceModule {}
