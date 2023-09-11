import { Injectable, PipeTransform } from "@nestjs/common";
import sharp from "sharp";

@Injectable()
export class SharpPipe implements PipeTransform<Express.Multer.File> {
  async transform(image: Express.Multer.File) {
    const fileBuffer = await sharp(image.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    const uniqueImageName = `${Date.now()}-${image.originalname}`;

    image.buffer = fileBuffer;
    image.originalname = uniqueImageName;

    return image;
  }
}
