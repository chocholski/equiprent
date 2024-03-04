import { EquipmentPhoto } from "src/app/interfaces/equipment";
import { EquipmentPhotoUploader } from "./equipment-photo-uploader";
import { FileService } from "src/app/services/files/file.service";
import { ImageService } from "src/app/services/images/image.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { SimpleFileModel } from "src/app/interfaces/file";
import { ApiRoutes } from "src/app/api-routes";

export class EquipmentPhotoOnCreationUploader extends EquipmentPhotoUploader {

  constructor(
    private readonly fileService: FileService,
    private readonly httpClient: HttpClient,
    private readonly imageService: ImageService,
  ) {
    super();
  }

  public override async uploadToPhotosAsync(files: File[], photos: EquipmentPhoto[]) {
    for (const file of files) {
      const fileArrayBuffer = await this.fileService.getArrayBuffer(file);
      if (!fileArrayBuffer) {
        return;
      }

      const encodedFile = this.fileService.convertFileToBase64String(fileArrayBuffer);
      const thumbnail = await lastValueFrom(this.httpClient.post<SimpleFileModel>(
        ApiRoutes.equipment.file.photo.makeThumbnailForFile,
        <SimpleFileModel>{
          File: encodedFile,
          FileName: file.name,
        }));

      photos.push(<EquipmentPhoto>{
        File: encodedFile,
        FileName: file.name,
        SourceUrl: this.imageService.getImageUrlForEncodedFile(encodedFile),
        ThumbnailUrl: this.imageService.getImageUrlForEncodedFile(thumbnail.File),
        ThumbnailFile: thumbnail.File
      });
    }
  }
}