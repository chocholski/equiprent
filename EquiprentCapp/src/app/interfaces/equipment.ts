import { SafeUrl } from "@angular/platform-browser";

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

export interface EquipmentPhoto {
  File?: string;
  FileName: string;
  Id: string;
  IsBeingDownloaded?: boolean;
  IsMainThumbnail: boolean;
  Source?: SafeUrl;
  Thumbnail: SafeUrl;
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