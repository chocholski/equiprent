import { TreeNode } from "primeng/api";

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