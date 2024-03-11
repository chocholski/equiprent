import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ApiRoutes } from "src/app/api-routes";
import { EquipmentPhoto } from "src/app/interfaces/equipment";
import { SimpleFileModel } from "src/app/interfaces/file";
import { ImageService } from "src/app/services/images/image.service";
import { FileUploadEvent } from "src/app/tools/events/file-upload-event";
import { PrimeNgHelper } from "src/app/tools/primeNgHelper";
import { EquipmentPhotoUploaderFactory } from "./uploaders/equipment-photo-uploader-factory";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { FileService } from "src/app/services/files/file.service";
import { FileUpload } from "primeng/fileupload";

@Component({
  selector: 'equipment-photos',
  templateUrl: 'equipment-photos.html'
})
export class EquipmentPhotosComponent
  implements OnInit {

  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(newValue) {
    if (this.equipmentPhotos && 0 <= newValue && newValue <= this.equipmentPhotos.length - 1) {
      this._activeIndex = newValue;
    }
  }

  _activeIndex: number = 0;

  equipmentPhotos: EquipmentPhoto[] = [];
  galleriaResponsiveOptions: any[] = PrimeNgHelper.galleriaResponsiveOptions;

  @Input() equipmentId?: string;
  @Input() sourcePhotos: EquipmentPhoto[] = [];

  @ViewChild('equipmentPhotoUpload') equipmentPhotoUpload: FileUpload;

  constructor(
    private readonly fileService: FileService,
    private readonly httpClient: HttpClient,
    private readonly imageService: ImageService,
    public readonly translate: TranslateService
  ) {
  }

  ngOnInit() {
    if (!this.sourcePhotos)
      return;

    for (const photo of this.sourcePhotos) {
      this.equipmentPhotos.push(photo);
    }
  }

  public async equipmentPhotoUploadAsync(event: FileUploadEvent) {
    const uploader = new EquipmentPhotoUploaderFactory(this.fileService, this.httpClient, this.imageService, this.equipmentId)
      .makeUploader(!this.equipmentId ? FormModeEnum.Creation : FormModeEnum.Edition);

    const uploadedEquipmentPhotos: EquipmentPhoto[] = [];
    await uploader.uploadToPhotosAsync(event.files, uploadedEquipmentPhotos);
    uploadedEquipmentPhotos.splice(0, 0, ...this.equipmentPhotos);

    this.equipmentPhotos = [...uploadedEquipmentPhotos];
    this.activeIndex = this.equipmentPhotos.length - 1;
    this.equipmentPhotoUpload.clear();
  }

  public getEquipmentPhotoSource(item: EquipmentPhoto) {
    if (!this.equipmentId)
      return;

    const equipmentPhoto = this.equipmentPhotos.find(p => p.Id === item.Id);
    if (!equipmentPhoto || equipmentPhoto.IsBeingDownloaded)
      return;

    equipmentPhoto.IsBeingDownloaded = true;
    this.httpClient
      .get<SimpleFileModel>(ApiRoutes.equipment.file.photo.download(equipmentPhoto.Id!))
      .subscribe({
        next: async result => {
          if (result && result.File !== undefined && result.File !== null) {
            equipmentPhoto.SourceUrl = this.imageService.getImageUrlForEncodedFile(result.File);
          }
          else {
            equipmentPhoto.SourceUrl = await this.imageService.getNotFoundImageUrlAsync();
          }

          equipmentPhoto.IsBeingDownloaded = false;
        },
        error: async () => {
          equipmentPhoto.SourceUrl = await this.imageService.getNotFoundImageUrlAsync();
          equipmentPhoto.IsBeingDownloaded = false;
        }
      });
  }
}