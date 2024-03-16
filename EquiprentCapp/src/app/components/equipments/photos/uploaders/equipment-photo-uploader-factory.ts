import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { EquipmentPhotoUploader } from "./equipment-photo-uploader";
import { EquipmentPhotoOnCreationUploader } from "./equipment-photo-on-creation-uploader";
import { EquipmentPhotoOnEditionUploader } from "./equipment-photo-on-edition-uploader";
import { FileService } from "src/app/services/files/file.service";
import { ImageService } from "src/app/services/images/image.service";
import { HttpClient } from "@angular/common/http";

export class EquipmentPhotoUploaderFactory {

  constructor(
    private readonly fileService: FileService,
    private readonly httpClient: HttpClient,
    private readonly imageService: ImageService,
    private readonly equipmentId?: string,
  ) {
  }

  public makeUploader(formMode: FormModeEnum) {

    let uploader: EquipmentPhotoUploader;

    switch (formMode) {
      case FormModeEnum.Creation:
        uploader = new EquipmentPhotoOnCreationUploader(this.fileService, this.httpClient, this.imageService);
        break;

      case FormModeEnum.Edition:
        uploader = new EquipmentPhotoOnEditionUploader(this.equipmentId!, this.fileService, this.httpClient, this.imageService);
        break;

      default:
        throw new Error(`[${this.constructor.name}] Unsupported form mode.`);
    }

    return uploader;
  }
}