import { EquipmentPhoto } from "src/app/interfaces/equipment";

export abstract class EquipmentPhotoUploader {
  public abstract uploadToPhotosAsync(files: File[], photos: EquipmentPhoto[]): Promise<void>;
}