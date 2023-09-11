import { Injectable } from "@nestjs/common";
import { StorageLocal } from "./local-storage";
import { StorageS3 } from "./s3-storage";
import { currentActiveStorage } from "./filestore.config";

@Injectable()
export class FileManager {
  private storage: StorageLocal | StorageS3;

  constructor() {
    if (currentActiveStorage === "StorageLocal") {
      this.storage = new StorageLocal();
    } else if (currentActiveStorage === "StorageS3") {
      this.storage = new StorageS3();
    } else {
      throw new Error("Invalid storage type");
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    return this.storage.upload(file);
  }
}
