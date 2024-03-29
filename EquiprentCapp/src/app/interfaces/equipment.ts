import { SafeUrl } from "@angular/platform-browser";
import { SimpleFileModel } from "./file";

export interface EquipmentCreationModel {
  Description?: string,
  ManufacturerId: string,
  MarketValue: number,
  Name: string,
  PricePerDay: number;
  SerialNumber: string,
  TypeId: number,
}

export interface EquipmentDetailsModel {
  Description?: string,
  Id: string,
  ManufacturerId: string,
  MarketValue: number,
  Name: string,
  Photos: EquipmentPhoto[];
  PricePerDay: number;
  SerialNumber: string,
  TypeId: number,
}

export class EquipmentPhotoBase implements SimpleFileModel {
  EquipmentId?: string;
  File?: string;
  FileName: string;
  Id?: string;
  IsMainThumbnail: boolean = false;
  ThumbnailFile?: string;
}

export class EquipmentPhoto extends EquipmentPhotoBase {
  IsBeingDownloaded: boolean = false;
  SourceUrl?: SafeUrl;
  ThumbnailUrl: SafeUrl;
}

export interface EquipmentPhotosUploadRequest {
  EquipmentId: string;
  Photos: EquipmentPhotoBase[];
}

export interface EquipmentPhotosUploadResponse {
  UploadedPhotos: EquipmentPhotoBase[];
}

export interface EquipmentListItemModel {
  Id: string,
  ManufacturerId: string,
  ManufacturerName: string,
  Name: string,
  PricePerDay: number,
  SerialNumber: string,
  TypeId: number,
  TypeName: string,
}

export interface EquipmentListModel {
  List: EquipmentListItemModel[];
  TotalRowsCount: number;
}