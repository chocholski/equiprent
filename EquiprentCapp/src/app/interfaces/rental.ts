export interface RentalCreationModel {
  CategoryId: number;
  End: Date;
  EquipmentId: string;
  RenterId: string;
  RentierId: string;
  Start: Date;
  UserResponsibleForHandlingId?: string;
}

export interface RentalListItemModel {
  CategoryId: number;
  CategoryName: string;
  End: string;
  Id: string;
  Number: string;
  RenterId: string;
  RenterName: string;
  RentierId: string;
  RentierName: string;
  Start: string;
  UserResponsibleForHandlingId: string;
  UserResponsibleForHandlingName: string;
}

export interface RentalListModel {
  List: RentalListItemModel[];
  TotalRowsCount: number;
}