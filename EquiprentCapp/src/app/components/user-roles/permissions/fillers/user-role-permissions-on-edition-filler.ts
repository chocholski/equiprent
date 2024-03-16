import { ICONS } from "src/app/constants/icons.constants";
import { PermissionGroupItemModel, PermissionItemModel, UserPermissionNodeData } from "src/app/interfaces/user-permission";
import { UserRolePermissionsDestinations } from "src/app/interfaces/user-role";
import { UserRolePermissionsFiller } from "./user-role-permissions-filler";
import { UserPermissionNode } from "../models/user-permission-node";

export class UserRolePermissionsOnEditionFiller extends UserRolePermissionsFiller {

  constructor(private source: PermissionGroupItemModel[], private destinations: UserRolePermissionsDestinations) {
    super();
  }

  public override createChildNode(permission: PermissionItemModel): UserPermissionNode<any> {

    const result = new UserPermissionNode();

    result.data = <UserPermissionNodeData>{
      icon: this.getIconStyleClassNameForPermission(permission),
      id: permission.Id,
      isSelected: permission.IsSelected,
      linkedPermissionIds: permission.LinkedPermissionsIds,
      name: permission.Name
    };
    result.expanded = true;
    result.partialSelected = permission.IsSelected ? false : undefined;

    return result;
  }

  public override createParentNode(permissionsGroup: PermissionGroupItemModel, children: UserPermissionNode<any>[]): UserPermissionNode<any> {

    const result = new UserPermissionNode();

    result.children = children;
    result.data = <UserPermissionNodeData>{
      icon: ICONS[permissionsGroup.Name],
      id: null,
      isSelected: children.every(c => c.isSelected()),
      linkedPermissionIds: [],
      name: permissionsGroup.Name
    };
    result.expanded = true;
    result.partialSelected = !children.every(c => c.isSelected()) && children.some(c => c.isSelected());

    return result;
  }

  public override fill() {
    this.updateUserRolePermissions();
    this.updateUserRolePermissionsSelected();
  }

  private updateUserRolePermissions() {
    for (const permissionsGroup of this.source) {
      const permissionsGroupChildren: UserPermissionNode[] = [];

      for (const permission of permissionsGroup.Permissions) {
        permissionsGroupChildren.push(this.createChildNode(permission));
      }

      this.destinations.allItems.push(this.createParentNode(permissionsGroup, permissionsGroupChildren));
    }
  }

  private updateUserRolePermissionsSelected() {
    for (const permissionNode of this.destinations.allItems) {
      if (permissionNode.hasChildren()) {
        for (const childPermissionNode of permissionNode.children!) {
          this.destinations.selectedItems.tryPush(childPermissionNode);
        }
      }

      this.destinations.selectedItems.tryPush(permissionNode);
    }
  }
}