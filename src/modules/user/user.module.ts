import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IsNotExist } from "src/common/validation/is-not-exist.rule";
import { JwtModule } from "@nestjs/jwt";
import { FileManagerModule } from "src/common/filestore/file-manager.module";
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
    JwtModule,
    FileManagerModule,
  ],
  controllers: [UserController],
  providers: [UserService, IsNotExist],
})
export class UserModule {}
