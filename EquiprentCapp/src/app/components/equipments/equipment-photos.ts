import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ApiRoutes } from "src/app/api-routes";
import { EquipmentPhoto } from "src/app/interfaces/equipment";
import { SimpleFileModel } from "src/app/interfaces/file";
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
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    if (!this.sourcePhotos)
      return;

    for (const photo of this.sourcePhotos) {
      this.addPhoto(photo);
    }
  }

  public getEquipmentPhotoSource(id: string) {
    if (!this.equipmentId)
      return;

    const equipmentPhoto = this.equipmentPhotos.find(p => p.Id === id);
    if (!equipmentPhoto || equipmentPhoto.IsBeingDownloaded)
      return;

    equipmentPhoto.IsBeingDownloaded = true;
    this.httpClient
      .get<SimpleFileModel>(ApiRoutes.equipment.file.photo.download(equipmentPhoto.Id))
      .subscribe(result => {
        equipmentPhoto.Source = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpg;base64, ${result.File}`);
        equipmentPhoto.IsBeingDownloaded = false;
      });
  }

  private addPhoto(photo: EquipmentPhoto) {
    this.equipmentPhotos.push(<EquipmentPhoto>{
      File: undefined,
      FileName: photo.FileName,
      Id: photo.Id,
      IsBeingDownloaded: false,
      IsMainThumbnail: photo.IsMainThumbnail,
      Source: undefined,
      Thumbnail: photo.Thumbnail,
    });
  }
}