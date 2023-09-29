import { TStorageType } from "src/constants";
import "dotenv/config";

export const FileManagerConfig: {
  STORAGE_TYPE: TStorageType;
  APP_HOST: string;
} = {
  STORAGE_TYPE: "StorageS3",
  APP_HOST: process.env.APP_HOST,
};
