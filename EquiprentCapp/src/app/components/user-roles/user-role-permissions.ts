import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { Icons, LIST_ICON_NAME, MODIFY_ICON_NAME } from "src/app/icon-mapper";
import { PngTreeColumn } from "src/app/interfaces/png";
import { PermissionGroupItemModel, PermissionItemModel, SelectedUserPermissionNodeArray, UserPermissionNode } from "src/app/interfaces/user-permission";

@Component({
  selector: 'user-role-permissions',
  templateUrl: './user-role-permissions.html'
})
export class UserRolePermissionsComponent implements OnInit {

  selectedUserPermissions = new SelectedUserPermissionNodeArray();
  userPermissionGroups: UserPermissionNode[] = [];
  userRolePermissionColumns: PngTreeColumn[] = [];

  @Input() formMode: FormModeEnum = FormModeEnum.Creation;
  @Input() groupedUserPermissions: PermissionGroupItemModel[];

  constructor(
    public translate: TranslateService
  ) {
    this.userRolePermissionColumns = [
      {
        icon: 'icon',
        field: 'name',
        header: 'UserPermission.Name'
      }
    ];
  }

  ngOnInit() {
    if (this.formMode === FormModeEnum.Creation) {
      this.createUserRolePermissions();
    } else {
      this.updateUserRolePermissions();
    }
  }

  public getPermissionsSubmitted() {
    const permissionsSubmitted: PermissionItemModel[] = [];

    for (const permissionNode of this.selectedUserPermissions) {
      if (!this.hasChildren(permissionNode)) {
        permissionsSubmitted.push(<PermissionItemModel>{
          Id: permissionNode.data.id
        });
      }
      else {
        for (const childPermission of permissionNode.children!) {
          permissionsSubmitted.push(<PermissionItemModel>{
            Id: childPermission.data.id
          });
        }
      }
    }

    return permissionsSubmitted;
  }

  public onPermissionSelected(permission: UserPermissionNode) {
    if (permission.data.linkedPermissionIds.length <= 0)
      return;

    for (const linkedPermissionId of permission.data.linkedPermissionIds) {
      const isPermissionAlreadySelected = this.selectedUserPermissions.find(p => p.data.id === linkedPermissionId);

      if (!isPermissionAlreadySelected) {
        const permissionToBeSelected = this.getPermissionNodeToBeSelected(linkedPermissionId);

        if (permissionToBeSelected) {
          this.selectedUserPermissions.push(permissionToBeSelected);
        }
      }
    }
  }

  private createUserRolePermissions() {
    for (const userPermissionGroup of this.groupedUserPermissions) {
      const userPermissionsGroupChildren: UserPermissionNode[] = [];

      for (const permission of userPermissionGroup.Permissions) {
        userPermissionsGroupChildren.push(<UserPermissionNode>{
          data: {
            icon: permission.Name.endsWith('.CanList')
              ? LIST_ICON_NAME
              : permission.Name.endsWith('.CanModify')
                ? MODIFY_ICON_NAME
                : Icons[permission.Name],
            id: permission.Id,
            name: permission.Name,
            linkedPermissionIds: permission.LinkedPermissionsIds
          }
        });
      }

      this.userPermissionGroups.push(<UserPermissionNode>{
        children: userPermissionsGroupChildren,
        data: {
          icon: Icons[userPermissionGroup.Name],
          id: null,
          name: userPermissionGroup.Name,
          linkedPermissionIds: [],
        }
      });
    }
  }

  private findPermissionById(node: UserPermissionNode, idToFind: number): UserPermissionNode | undefined {
    if (node.data && node.data.id === idToFind)
      return node;

    if (this.hasChildren(node)) {
      for (const nodeChild of node.children!) {
        const result = this.findPermissionById(nodeChild, idToFind);

        if (result)
          return result;
      }
    }

    return undefined;
  }

  private getPermissionNodeToBeSelected(permissionId: number): UserPermissionNode | undefined {
    let permission: UserPermissionNode | undefined;

    for (const userPermissionGroup of this.userPermissionGroups) {
      permission = this.findPermissionById(userPermissionGroup, permissionId);

      if (permission)
        return permission;
    }

    return permission;
  }

  private hasChildren(node: UserPermissionNode) {
    return node.children !== undefined && node.children.length > 0;
  }

  private updateUserRolePermissions() {
    for (const userPermissionGroup of this.groupedUserPermissions) {
      const userPermissionGroupChildren: UserPermissionNode[] = [];

      for (const permission of userPermissionGroup.Permissions) {
        userPermissionGroupChildren.push({
          data: {
            icon: permission.Name.endsWith('.CanList')
              ? LIST_ICON_NAME
              : permission.Name.endsWith('.CanModify')
                ? MODIFY_ICON_NAME
                : Icons[permission.Name],
            id: permission.Id,
            isSelected: permission.IsSelected,
            linkedPermissionIds: permission.LinkedPermissionsIds,
            name: permission.Name
          },
          expanded: true,
          partialSelected: permission.IsSelected ? false : undefined
        });
      }

      this.userPermissionGroups.push(<UserPermissionNode>{
        children: userPermissionGroupChildren,
        data: {
          icon: Icons[userPermissionGroup.Name],
          id: null,
          isSelected: userPermissionGroupChildren.every(c => c.data.isSelected),
          linkedPermissionIds: [],
          name: userPermissionGroup.Name
        },
        expanded: true,
        partialSelected: !userPermissionGroupChildren.every(c => c.data.isSelected) && userPermissionGroupChildren.some(c => c.data.isSelected)
      });
    }

    this.updateUserRolePermissionsSelected();
  }

  private updateUserRolePermissionsSelected() {
    for (const parentPermissionNode of this.userPermissionGroups) {
      if (this.hasChildren(parentPermissionNode)) {
        for (const childPermission of parentPermissionNode.children!) {
          this.selectedUserPermissions.tryPush(childPermission);
        }
      }

      this.selectedUserPermissions.tryPush(parentPermissionNode);
    }
  }
}