import { Injectable } from "@nestjs/common";
import { FileManagerConfig } from "src/config";
import { StorageLocal } from "./local-storage";
import { StorageS3 } from "./s3-storage";

const storageTypes = {
  StorageLocal: new StorageLocal(),
  StorageS3: new StorageS3(),
};

@Injectable()
export class FileManager {
  private storageType: "StorageLocal" | "StorageS3";

  private storage: StorageLocal | StorageS3;

  constructor() {
    this.storageType = FileManagerConfig.STORAGE_TYPE;
    this.storage = storageTypes[this.storageType];
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
