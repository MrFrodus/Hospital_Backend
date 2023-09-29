import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { join } from "path";
// import { dataSourceOptions } from "./db/data-source";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PatientMetaModule } from "./modules/patientMeta/patientMeta.module";
import { PhysicianMetaModule } from "./modules/physicianMeta/physicianMeta.module";
import { NurseMetaModule } from "./modules/nurseMeta/nurseMeta.module";
import { DepartmentModule } from "./modules/department/department.module";
import { AppointmentModule } from "./modules/appointment/appointment.module";
import { PrescriptionModule } from "./modules/prescription/prescription.module";
import { DiagnosisModule } from "./modules/diagnosis/diagnosis.module";
import { IllnessModule } from "./modules/illness/illness.module";
import { MedicationModule } from "./modules/medication/medication.module";
import { ServiceModule } from "./modules/service/service.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { typeOrmAsyncConfig } from "./config/typeorm.config";
import { CustomConfigModule } from "./config/custom-config.module";
import { FileManagerModule } from "./common/filestore/file-manager.module";

@Module({
  imports: [
    CustomConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    FileManagerModule,
    PatientMetaModule,
    PhysicianMetaModule,
    NurseMetaModule,
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

const configService = new ConfigService();
console.log(configService.get("db_host"));
