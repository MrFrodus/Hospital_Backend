import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FileManager } from "src/common/filestore/file-manager.service";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./entities/user.entity";
import { PatientMetaModule } from "../patientMeta/patientMeta.module";
import { NurseMetaModule } from "../nurseMeta/nurseMeta.module";
import { PhysicianMetaModule } from "../physicianMeta/physicianMeta.module";

@Module({
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([User]),
    PatientMetaModule,
    PhysicianMetaModule,
    NurseMetaModule,
  ],
  controllers: [UserController],
  providers: [UserService, FileManager],
})
export class UserModule {}
