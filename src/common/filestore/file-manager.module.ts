import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CustomConfigModule } from "src/config/custom-config.module";
import { FileManager } from "./file-manager.service";
import { StorageS3 } from "./s3-storage";
import { StorageLocal } from "./local-storage";

@Module({
  imports: [ConfigModule.forRoot(), CustomConfigModule],
  providers: [FileManager, StorageLocal, StorageS3],
  exports: [FileManager],
})
export class FileManagerModule {}
