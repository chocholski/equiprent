import { ManufacturerAddress } from "./address";

export interface ManufacturerCreationModel {
  Address: ManufacturerAddress;
  IsOperational: boolean;
  Name: string;
}

export interface ManufacturerDetailsModel {
  Address: ManufacturerAddress;
  Id: string;
  IsDeleted: boolean;
  IsOperational: boolean;
  Name: string;
}

export interface ManufacturerListItemModel {
  AddressSummary: string;
  Id: string;
  IsDeleted: boolean;
  IsOperational: boolean;
  Name: string;
  NationalId: string;
}

export interface ManufacturerListModel {
  List: ManufacturerListItemModel[];
  TotalRowsCount: number;
}