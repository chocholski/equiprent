import { TreeNode } from "primeng/api";
import { UserPermissionNodeData } from "src/app/interfaces/user-permission";

export class UserPermissionNode<T = any> implements TreeNode {
  children?: UserPermissionNode<T>[] = [];
  data: UserPermissionNodeData;
  expanded?: boolean | undefined;
  partialSelected?: boolean | undefined;

  constructor() {
  }

  public hasChildren(): boolean {
    return this.children !== undefined && this.children.length > 0
  }

  public hasLinkedPermissions() {
    return this.data.linkedPermissionIds.length > 0;
  }

  public isSelected(): boolean {
    return this.data.isSelected ?? false;
  }
}