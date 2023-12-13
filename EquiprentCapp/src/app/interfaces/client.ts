import { ClientAddress } from "./address";

export interface ClientCreationModel {
  Addresses: ClientAddress[],
  FirstName?: string,
  LastName?: string,
  Name: string,
  TypeId: number,
}

export interface ClientDetailsModel {
  Addresses: ClientAddress[],
  FirstName?: string,
  Id: string,
  LastName?: string,
  Name: string,
  TypeId: number
}

export interface ClientListModel {
  List: ClientListItemModel[];
  TotalRowsCount: number;
}

export interface ClientListItemModel {
  FirstName?: string,
  Id: string,
  LastName?: string,
  Name: string,
  NationalId: string,
  TypeId: number,
  TypeName: string,
}