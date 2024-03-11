import { EquipmentPhoto, EquipmentPhotoBase, EquipmentPhotosUploadRequest, EquipmentPhotosUploadResponse } from "src/app/interfaces/equipment";
import { EquipmentPhotoUploader } from "./equipment-photo-uploader";
import { FileService } from "src/app/services/files/file.service";
import { ImageService } from "src/app/services/images/image.service";
import { HttpClient } from "@angular/common/http";
import { ApiRoutes } from "src/app/api-routes";
import { lastValueFrom } from "rxjs";

export class EquipmentPhotoOnEditionUploader extends EquipmentPhotoUploader {

  constructor(
    private readonly equipmentId: string,
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
      photos.push(<EquipmentPhoto>{
        File: encodedFile,
        FileName: file.name,
        SourceUrl: this.imageService.getImageUrlForEncodedFile(encodedFile)
      });
    }

    await this.UploadPhotosToApiAsync(photos);
  }

  private async UploadPhotosToApiAsync(photos: EquipmentPhoto[]) {
    const photosToUploadToApi = photos
      .filter(photo => photo.Id === undefined)
      .map(photo => <EquipmentPhotoBase>{
        File: photo.File,
        FileName: photo.FileName,
        Id: photo.Id,
      });

    const request = <EquipmentPhotosUploadRequest>{
      EquipmentId: this.equipmentId,
      Photos: photosToUploadToApi
    };

    const result = await lastValueFrom(this.httpClient
      .post<EquipmentPhotosUploadResponse>(ApiRoutes.equipment.file.photo.upload.multiple, request));

    for (const uploadedPhoto of result.UploadedPhotos) {
      const photo = photos.find(p => p.FileName === uploadedPhoto.FileName && !p.Id);
      if (photo) {
        photo.Id = uploadedPhoto.Id;
        if (uploadedPhoto.ThumbnailFile) {
          photo.ThumbnailFile = uploadedPhoto.ThumbnailFile;
          photo.ThumbnailUrl = this.imageService.getImageUrlForEncodedFile(photo.ThumbnailFile)!;
        }
      }
    }

    photos = photos.filter(photo => photo.Id);
  }
}