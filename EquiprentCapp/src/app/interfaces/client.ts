import { DialogConfigData } from "../components/abstract/dialogs/dialog-config-data";
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

export class ClientRepresentativeDialogConfigData implements DialogConfigData {
  ClientId: string;
  Id?: string;
}

export interface ClientRepresentativeCreationModel {
  Address: Address,
  ClientId: string,
  FirstName: string,
  LastName: string
}

export interface ClientRepresentativeDetailsModel {
  Address: Address,
  ClientId: string,
  FirstName: string,
  Id: string,
  LastName: string
}

export interface ClientRepresentativeListModel {
  List: ClientRepresentativeListItemModel[];
  TotalRowsCount: number;
}

export interface ClientRepresentativeListItemModel {
  ClientId: string,
  Email: string,
  FirstName: string,
  Id: string,
  LastName: string,
  PhoneNumber: string
}

export interface ClientSelectListItemModel {
  FirstName?: string,
  Id: string,
  LastName?: string,
  Name: string,
  NationalId: string,
  TypeId: number,
  TypeName: string,
}

export interface ClientSelectListModel {
  List: ClientSelectListItemModel[];
  TotalRowsCount: number;
}