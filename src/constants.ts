const FILE_STORAGE_TYPES = {
  S3: "StorageS3",
  Local: "StorageLocal",
} as const;

type Keys = keyof typeof FILE_STORAGE_TYPES;
export type TStorageType = (typeof FILE_STORAGE_TYPES)[Keys];

export const CONSTANTS = {
  FILE_STORAGE_TYPES,
};
