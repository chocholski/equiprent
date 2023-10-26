import { UserPermissionNode } from "../components/user-roles/models/user-permission-node";
import { NameInLanguagesBase } from "./name-in-language";
import { PermissionGroupItemModel, PermissionItemModel, SelectedUserPermissionNodeArray } from "./user-permission";

export class UserRoleCreationModel extends NameInLanguagesBase {
  PermissionsSelected: PermissionItemModel[] = [];

  public doesPermissionExistWithinSelected(permissionId: number) {
    return this.PermissionsSelected.find(p => p.Id === permissionId);
  }
}

export class UserRoleDetailsModel extends NameInLanguagesBase {
  Id: number;
  Name?: string;
  GroupedPermissions: PermissionGroupItemModel[] = [];
  PermissionsSelected: PermissionItemModel[] = [];

  public doesPermissionExistWithinSelected(permissionId: number) {
    return this.PermissionsSelected.find(p => p.Id === permissionId);
  }
}

export interface UserRoleListModel {
  List: UserRoleListItemModel[];
  TotalRowsCount: number;
}

export interface UserRoleListItemModel {
  Id: number;
  Name: string;
}

export interface UserRolePermissionsDestinations {
  allItems: UserPermissionNode<any>[];
  selectedItems: SelectedUserPermissionNodeArray;
}

export interface UserRolePermissionsForCreation {
  List: PermissionGroupItemModel[];
}