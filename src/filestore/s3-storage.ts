import { Injectable } from "@nestjs/common";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import "dotenv/config";

const region = process.env.AWS_BUCKET_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({ region });

@Injectable()
export class StorageS3 {
  async upload(file: Express.Multer.File) {
    try {
      const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: file.originalname,
        ContentType: file.mimetype,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      return file.originalname;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
