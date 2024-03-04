import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { ApiRoutes } from "src/app/api-routes";
import { EquipmentPhoto } from "src/app/interfaces/equipment";
import { SimpleFileModel } from "src/app/interfaces/file";
import { ImageService } from "src/app/services/images/image.service";
import { PrimeNgHelper } from "src/app/tools/primeNgHelper";

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

  @Input() equipmentId: string;
  @Input() sourcePhotos: EquipmentPhoto[];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly imageService: ImageService
  ) {
  }

  ngOnInit() {
    if (!this.sourcePhotos)
      return;

    for (const photo of this.sourcePhotos) {
      this.equipmentPhotos.push(photo);
    }
  }

  public getEquipmentPhotoSource(item: EquipmentPhoto) {
    if (!this.equipmentId)
      return;

    const equipmentPhoto = this.equipmentPhotos.find(p => p.Id === item.Id);
    if (!equipmentPhoto || equipmentPhoto.IsBeingDownloaded)
      return;

    equipmentPhoto.IsBeingDownloaded = true;
    this.httpClient
      .get<SimpleFileModel>(ApiRoutes.equipment.file.photo.download(equipmentPhoto.Id))
      .subscribe({
        next: async result => {
          if (result && result.File !== undefined && result.File !== null) {
            equipmentPhoto.SourceUrl = this.imageService.getImageUrlForFile(result.File);
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