import { UserPermissionNode } from "../components/user-roles/models/user-permission-node";

export class PermissionGroupItemModel {
  Name: string;
  Permissions: PermissionItemModel[];
}

export class PermissionItemModel {
  Id: number;
  Name: string;
  IsSelected: boolean;
  LinkedPermissionsIds: number[];
}

export class SelectedUserPermissionNodeArray extends Array<UserPermissionNode<any>> {
  public tryPush(item: UserPermissionNode<any>) {
    if (item.data.isSelected)
      this.push(item);
  }
}

export interface UserPermissionNodeData {
  icon?: string;
  id: number | null,
  isSelected?: boolean,
  linkedPermissionIds: number[],
  name: string
}