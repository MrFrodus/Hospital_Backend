import { Injectable } from "@nestjs/common";
import { FileManagerConfig } from "src/config";
import { ConfigService } from "@nestjs/config";
import { StorageLocal } from "./local-storage";
import { StorageS3 } from "./s3-storage";

@Injectable()
export class FileManager {
  private storage: StorageLocal | StorageS3;

  constructor(private readonly configService: ConfigService) {
    if (FileManagerConfig.STORAGE_TYPE === "StorageLocal") {
      this.storage = new StorageLocal();
    } else if (FileManagerConfig.STORAGE_TYPE === "StorageS3") {
      this.storage = new StorageS3(configService);
    } else {
      throw new Error("Invalid STORAGE_TYPE configuration.");
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    return this.storage.upload(file);
  }

  async getFile(fileName: string): Promise<string> {
    return this.storage.getFile(fileName);
  }

  async deleteFile(fileName: string) {
    return this.storage.deleteFile(fileName);
  }
}
