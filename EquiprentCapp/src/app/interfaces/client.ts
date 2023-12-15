import { Address, ClientAddress } from "./address";

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

export class ClientRepresentativeDialogConfigData {
  ClientId: string;

  constructor(clientId?: string) {
    if (clientId)
      this.ClientId = clientId;
  }
}

export interface ClientRepresentativeCreationModel {
  Address: Address,
  ClientId: string,
  FirstName: string,
  LastName: string
}

export interface ClientRepresentativeListModel {
  List: ClientRepresentativeListItemModel[];
  TotalRowsCount: number;
}

export interface ClientRepresentativeListItemModel {
  Email: string,
  FirstName: string,
  Id: string,
  LastName: string,
  PhoneNumber: string
}