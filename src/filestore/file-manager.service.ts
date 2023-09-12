import { Injectable } from "@nestjs/common";
import { StorageLocal } from "./local-storage";
import { StorageS3 } from "./s3-storage";
import { FileManagerConfig } from "./file-manager.config";

const storageTypes = {
  StorageLocal: new StorageLocal(),
  StorageS3: new StorageS3(),
};

@Injectable()
export class FileManager {
  private storageType: "StorageLocal" | "StorageS3";

  private storage: StorageLocal | StorageS3;

  constructor() {
    this.storageType = FileManagerConfig.storageType;
    this.storage = storageTypes[this.storageType];
  }

  async upload(file: Express.Multer.File): Promise<string> {
    return this.storage.upload(file);
  }
}
