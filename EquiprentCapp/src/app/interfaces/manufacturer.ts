export interface ManufacturerListItemModel {
  AddressSummary: string;
  Id: string;
  IsOperational: boolean;
  Name: string;
  NationalId: string;
}

export interface ManufacturerListModel {
  List: ManufacturerListItemModel[];
  TotalRowsCount: number;
}