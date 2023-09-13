import { Injectable } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import "dotenv/config";

const region = process.env.AWS_BUCKET_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;

@Injectable()
export class StorageS3 {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({ region });
  }

  async upload(file: Express.Multer.File) {
    try {
      const uploadParams = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: file.originalname,
        ContentType: file.mimetype,
      };

      await this.s3Client.send(new PutObjectCommand(uploadParams));

      return file.originalname;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getFile(fileName: string) {
    try {
      const getParams = {
        Bucket: bucketName,
        Key: fileName,
      };

      const fileUrl = await getSignedUrl(
        this.s3Client,
        new GetObjectCommand(getParams)
      );

      return fileUrl;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteFile(fileName: string) {
    try {
      const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
      };

      return await this.s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
