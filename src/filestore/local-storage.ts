import { Injectable } from "@nestjs/common";
import * as fs from "fs";

@Injectable()
export class StorageLocal {
  async upload(file: Express.Multer.File): Promise<string> {
    const uploadPath = "public/";
    const filename = file.originalname;

    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      const filePath = `${uploadPath}/${filename}`;
      await fs.promises.writeFile(filePath, file.buffer);

      return filename;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
