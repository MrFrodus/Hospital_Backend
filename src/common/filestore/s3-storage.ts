import { Injectable } from "@nestjs/common";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class StorageS3 {
  private s3Client: S3Client;

  private awsRegion: string; // Store the AWS region

  constructor(private readonly configService: ConfigService) {
    this.awsRegion = this.configService.get<string>("aws_region");

    this.s3Client = new S3Client({
      region: this.awsRegion,
    });
  }

  async upload(file: Express.Multer.File) {
    try {
      console.log(file.mimetype);

      const uploadParams = {
        Bucket: this.configService.get("aws_bucket_name"),
        Body: file.buffer,
        Key: file.originalname,
        ContentType: file.mimetype,
      };

      console.log(uploadParams);

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
        Bucket: this.configService.get("aws_bucket_name"),
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
        Bucket: this.configService.get("aws_bucket_name"),
        Key: fileName,
      };

      return await this.s3Client.send(new DeleteObjectCommand(deleteParams));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
