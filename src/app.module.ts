import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { join } from "path";
import { dataSourceOptions } from "./db/data-source";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MetaModule } from "./modules/meta/meta.module";
import { PatientModule } from "./modules/patient/patient.module";
import { Physician_metaModule } from "./modules/physician_meta/physician_meta.module";
import { NurseModule } from "./modules/nurse/nurse.module";
import { DepartmentModule } from "./modules/department/department.module";
import { AppointmentModule } from "./modules/appointment/appointment.module";
import { PrescriptionModule } from "./modules/prescription/prescription.module";
import { DiagnosisModule } from "./modules/diagnosis/diagnosis.module";
import { IllnessModule } from "./modules/illness/illness.module";
import { MedicationModule } from "./modules/medication/medication.module";
import { ServiceModule } from "./modules/service/service.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    MetaModule,
    PatientModule,
    Physician_metaModule,
    NurseModule,
    DepartmentModule,
    AppointmentModule,
    PrescriptionModule,
    DiagnosisModule,
    IllnessModule,
    MedicationModule,
    ServiceModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
