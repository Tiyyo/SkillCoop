export interface UploadImageService {
  uploadImage(
    file: unknown,
    { height, width }: { height: number; width: number },
  ): Promise<{ key: string; link: string }>;
  invalidateCache(imageKey: string): Promise<void>;
  deleteImage(imageKey: string): Promise<void>;
}
