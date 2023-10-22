import { NameInLanguagesBase } from "./name-in-language";

export class UserRoleCreationModel extends NameInLanguagesBase {
  PermissionsSelected: UserPermissionsForUserRoleListItemModel[];
}

export class UserRoleDetailsModel extends NameInLanguagesBase {
  Id: number;
  Name?: string;
  Permissions: UserPermissionsForUserRoleListGroupItemModel[];
  PermissionsSelected: UserPermissionsForUserRoleListItemModel[];
}

export interface UserRoleListModel {
  List: UserRoleListItemModel[];
  TotalRowsCount: number;
}

export interface UserRoleListItemModel {
  Id: number;
  Name: string;
}

export interface UserRolePermissionForCreationListGroupModel {
  GroupName: string;
  Permissions: UserRolePermissionForCreationListItemModel[];
}

export interface UserRolePermissionForCreationListItemModel {
  Id: number;
  IsSelected: boolean;
  LinkedUserPermissions: number[];
  Name: string;
  SystemName: string;
}

export class UserPermissionsForUserRoleListGroupItemModel {
  GroupName: string;
  Permissions: UserPermissionsForUserRoleListItemModel[];
}

export class UserPermissionsForUserRoleListItemModel {
  Id: number;
  Name: string;
  IsSelected: boolean;
  LinkedUserPermissions: number[];
}

export interface UserRolePermissionsForCreation {
  List: UserRolePermissionForCreationListGroupModel[];
}