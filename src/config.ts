import { TStorageType } from "src/constants";

export const FileManagerConfig: {
  STORAGE_TYPE: TStorageType;
  APP_HOST: string;
} = {
  STORAGE_TYPE: "StorageS3",
  APP_HOST: "http://localhost:3000",
};
