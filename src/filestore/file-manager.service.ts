import { Injectable } from "@nestjs/common";
import { StorageLocal } from "./local-storage";
import { StorageS3 } from "./s3-storage";
import { FileManagerConfig } from "./file-manager.config";

@Injectable()
export class FileManager {
  private storage: StorageLocal | StorageS3;

  constructor() {
    if (FileManagerConfig.storageType === "StorageLocal") {
      this.storage = new StorageLocal();
    } else if (FileManagerConfig.storageType === "StorageS3") {
      this.storage = new StorageS3();
    } else {
      throw new Error("Invalid storage type");
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    return this.storage.upload(file);
  }
}
