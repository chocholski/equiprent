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
  PricePerDay: number;
  SerialNumber: string,
  TypeId: number,
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