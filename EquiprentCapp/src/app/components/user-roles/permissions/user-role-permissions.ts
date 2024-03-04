import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { PngTreeColumn } from "src/app/interfaces/png";
import { PermissionGroupItemModel, PermissionItemModel, SelectedUserPermissionNodeArray } from "src/app/interfaces/user-permission";
import { UserRolePermissionsFillerFactory } from "./fillers/user-role-permissions-filler-factory";
import { UserRolePermissionsDestinations } from "src/app/interfaces/user-role";
import { UserPermissionNode } from "./models/user-permission-node";

@Component({
  selector: 'user-role-permissions',
  templateUrl: './user-role-permissions.html'
})
export class UserRolePermissionsComponent implements OnInit {

  selectedUserPermissionNodes = new SelectedUserPermissionNodeArray();
  userPermissionNodes: UserPermissionNode[] = [];
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
    UserRolePermissionsFillerFactory
      .makeFiller(
        this.formMode,
        this.groupedUserPermissions,
        <UserRolePermissionsDestinations>{ allItems: this.userPermissionNodes, selectedItems: this.selectedUserPermissionNodes })
      .fill();
  }

  public getPermissionsSubmitted() {
    const permissionsSubmitted: PermissionItemModel[] = [];
    for (const permissionNode of this.selectedUserPermissionNodes) {
      if (!permissionNode.hasChildren()) {
        permissionsSubmitted.push(<PermissionItemModel>{
          Id: permissionNode.data.id
        });
      }
      else {
        for (const childPermissionNode of permissionNode.children!) {
          permissionsSubmitted.push(<PermissionItemModel>{
            Id: childPermissionNode.data.id
          });
        }
      }
    }

    return permissionsSubmitted;
  }

  public onPermissionSelected(permissionNode: UserPermissionNode) {
    if (!permissionNode.hasLinkedPermissions())
      return;

    for (const linkedPermissionId of permissionNode.data.linkedPermissionIds) {
      const isPermissionAlreadySelected = this.selectedUserPermissionNodes.find(p => p.data.id === linkedPermissionId);

      if (!isPermissionAlreadySelected) {
        const permissionToBeSelected = this.getPermissionNodeToBeSelected(linkedPermissionId);

        if (permissionToBeSelected) {
          this.selectedUserPermissionNodes.push(permissionToBeSelected);
        }
      }
    }
  }

  private findPermissionById(permissionNode: UserPermissionNode, idToFind: number): UserPermissionNode | undefined {
    if (permissionNode.data && permissionNode.data.id === idToFind)
      return permissionNode;

    if (permissionNode.hasChildren()) {
      for (const nodeChild of permissionNode.children!) {
        const result = this.findPermissionById(nodeChild, idToFind);

        if (result)
          return result;
      }
    }

    return undefined;
  }

  private getPermissionNodeToBeSelected(permissionId: number): UserPermissionNode | undefined {
    let permission: UserPermissionNode | undefined;

    for (const userPermissionGroup of this.userPermissionNodes) {
      permission = this.findPermissionById(userPermissionGroup, permissionId);

      if (permission)
        return permission;
    }

    return permission;
  }
}