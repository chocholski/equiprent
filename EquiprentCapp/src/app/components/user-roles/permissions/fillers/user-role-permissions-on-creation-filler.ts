import { PermissionGroupItemModel, PermissionItemModel, UserPermissionNodeData } from "src/app/interfaces/user-permission";
import { UserRolePermissionsDestinations } from "src/app/interfaces/user-role";
import { UserRolePermissionsFiller } from "./user-role-permissions-filler";
import { ICONS } from "src/app/constants/icons.constants";
import { UserPermissionNode } from "../models/user-permission-node";

export class UserRolePermissionsOnCreationFiller extends UserRolePermissionsFiller {

  constructor(private source: PermissionGroupItemModel[], private destinations: UserRolePermissionsDestinations) {
    super();
  }

  public override createChildNode(permission: PermissionItemModel): UserPermissionNode<any> {

    const result = new UserPermissionNode();

    result.data = <UserPermissionNodeData>{
      icon: this.getIconStyleClassNameForPermission(permission),
      id: permission.Id,
      name: permission.Name,
      linkedPermissionIds: permission.LinkedPermissionsIds
    };

    return result;
  }

  public override createParentNode(permissionsGroup: PermissionGroupItemModel, children: UserPermissionNode[]): UserPermissionNode<any> {

    const result = new UserPermissionNode();

    result.children = children;
    result.data = <UserPermissionNodeData>{
      icon: ICONS[permissionsGroup.Name],
      id: null,
      name: permissionsGroup.Name,
      linkedPermissionIds: [],
    };

    return result;
  }

  public override fill() {
    for (const permissionsGroup of this.source) {
      const permissionsGroupChildren: UserPermissionNode[] = [];

      for (const permission of permissionsGroup.Permissions) {
        permissionsGroupChildren.push(this.createChildNode(permission));
      }

      this.destinations.allItems.push(this.createParentNode(permissionsGroup, permissionsGroupChildren));
    }
  }
}