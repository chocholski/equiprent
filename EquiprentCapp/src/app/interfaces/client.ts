export interface ClientListModel {
  List: ClientListItemModel[];
  TotalRowsCount: number;
}

export interface ClientListItemModel {
  FirstName: string,
  Id: string,
  LastName: string,
  Name: string,
  NationalId: string,
  TypeId: number,
  TypeName: string,
}