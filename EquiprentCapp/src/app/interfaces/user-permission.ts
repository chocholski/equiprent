import { TreeNode } from "primeng/api";

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

export interface UserPermissionNode<T = any> extends TreeNode {
  children?: UserPermissionNode<T>[];
  data: UserPermissionNodeData;
}

export interface UserPermissionNodeData {
  id: number | null,
  isSelected?: boolean,
  linkedPermissionIds: number[],
  name: string
}