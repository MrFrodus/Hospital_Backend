import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MetaModule } from "./meta/meta.module";
import { PatientModule } from "./patient/patient.module";
import { PhysicianModule } from "./physician/physician.module";
import { NurseModule } from "./nurse/nurse.module";
import { DepartmentModule } from "./department/department.module";
import { AppointmentModule } from "./appointment/appointment.module";
import { PrescriptionModule } from "./prescription/prescription.module";
import { DiagnosisModule } from "./diagnosis/diagnosis.module";
import { IllnessModule } from "./illness/illness.module";
import { MedicationModule } from "./medication/medication.module";
import { ServiceModule } from "./service/service.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    MetaModule,
    PatientModule,
    PhysicianModule,
    NurseModule,
    DepartmentModule,
    AppointmentModule,
    PrescriptionModule,
    DiagnosisModule,
    IllnessModule,
    MedicationModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
