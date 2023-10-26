import { Icons, LIST_ICON_NAME, MODIFY_ICON_NAME } from "src/app/icon-mapper";
import { PermissionGroupItemModel, PermissionItemModel } from "src/app/interfaces/user-permission";
import { UserPermissionNode } from "../models/user-permission-node";

export abstract class UserRolePermissionsFiller {

  public abstract createChildNode(permission: PermissionItemModel): UserPermissionNode;
  public abstract createParentNode(permissionsGroup: PermissionGroupItemModel, children: UserPermissionNode[]): UserPermissionNode;
  public abstract fill(): void;

  protected getIconStyleClassNameForPermission(permission: PermissionItemModel) {
    return permission.Name.endsWith('.CanList')
      ? LIST_ICON_NAME
      : permission.Name.endsWith('.CanModify')
        ? MODIFY_ICON_NAME
        : Icons[permission.Name]
  }
}