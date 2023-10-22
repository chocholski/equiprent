import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormComponent } from "../abstract/formComponent";
import { ConsoleMessageService } from "src/app/services/console-message.service";
import { ErrorService } from "src/app/services/error.service";
import { FormBuilder } from "@angular/forms";
import { DialogMessageService } from "src/app/services/dialog-message.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Routes } from "src/app/routes";
import { PngTreeColumn } from "src/app/interfaces/png";
import { ApiRoutes } from "src/app/api-routes";
import { UserPermissionsForUserRoleListItemModel, UserRoleCreationModel, UserRolePermissionForCreationListGroupModel, UserRolePermissionsForCreation } from "src/app/interfaces/user-role";
import { UserPermissionNode } from "src/app/interfaces/user-permission";
import { NameInLanguagesComponent } from "../name-in-languages/name-in-languages";
import { ApiResultEnum } from "src/app/enums/apiResultEnum";

@Component({
  selector: "user-role-create",
  templateUrl: "./user-role-create.html"
})
export class UserRoleCreationComponent
  extends FormComponent
  implements OnInit {

  private readonly _dataPopulator = {
    userPermissions: {
      get: () => this.httpClient.get<UserRolePermissionsForCreation>(ApiRoutes.userRole.getUserRolePermissionsForCreation),
      set: (userPermissions: UserRolePermissionsForCreation) => this.setUserRolePermissions(userPermissions.List)
    }
  }

  isNameInLanguagesValid: boolean = false;
  selectedUserPermissions: UserPermissionNode[] = [];
  userPermissionColumns: PngTreeColumn[] = [];
  userPermissionGroups: UserPermissionNode[] = [];

  @ViewChild('nameInLanguages') nameInLanguages: NameInLanguagesComponent;

  constructor(
    private consoleMessageService: ConsoleMessageService,
    private errorService: ErrorService,
    private dialogMessageService: DialogMessageService,
    protected override formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    public translate: TranslateService
  ) {

    super(formBuilder);

    this.createForm({});
  }

  ngOnInit() {
    this.userPermissionColumns = [
      {
        field: 'name',
        header: 'UserPermission.Name'
      }
    ];

    this._dataPopulator.userPermissions
      .get()
      .subscribe(result => this._dataPopulator.userPermissions.set(result));
  }

  public onBack() {
    this.router.navigate([Routes.userRoles.navigations.list]);
  }

  public onIsNameInLanguagesValid(value: boolean) {
    this.isNameInLanguagesValid = value;
  }

  public onPermissionSelected(permission: UserPermissionNode) {
    if (permission.data.linkedPermissionIds.length <= 0)
      return;

    for (const linkedPermissionId of permission.data.linkedPermissionIds) {
      const isPermissionAlreadySelected = this.selectedUserPermissions.find(p => p.data.id === linkedPermissionId);

      if (!isPermissionAlreadySelected) {
        const permissionToBeSelected = this.getPermissionToBeSelectedWithId(linkedPermissionId);

        if (permissionToBeSelected) {
          this.selectedUserPermissions.push(permissionToBeSelected);
        }
      }
    }
  }

  public onSubmit() {
    this.isExecuting = true;

    const userRole = <UserRoleCreationModel>{
      NameInLanguages: this.nameInLanguages.getNameInLanguages(),
      PermissionsSelected: []
    };

    for (const permissionNode of this.selectedUserPermissions) {
      if (permissionNode.children !== undefined && permissionNode.children.length > 0) {
        for (const childPermission of permissionNode.children!) {
          const permissionModel = <UserPermissionsForUserRoleListItemModel>{
            Id: childPermission.data.id
          };

          if (!userRole.PermissionsSelected.find(p => p.Id === permissionModel.Id)) {
            userRole.PermissionsSelected.push(permissionModel);
          }
        }
      }
      else {
        const permissionModel = <UserPermissionsForUserRoleListItemModel>{
          Id: permissionNode.data.id
        };

        if (!userRole.PermissionsSelected.find(p => p.Id === permissionModel.Id)) {
          userRole.PermissionsSelected.push(permissionModel);
        }
      }
    }

    this.postUserRole(userRole);
  }

  private findPermissionById(node: UserPermissionNode, idToFind: number): UserPermissionNode | undefined {
    if (node.data && node.data.id === idToFind)
      return node;

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const result = this.findPermissionById(child, idToFind);

        if (result)
          return result;
      }
    }

    return undefined;
  }

  private getPermissionToBeSelectedWithId(id: number): UserPermissionNode | undefined {
    let permission: UserPermissionNode | undefined;

    for (const userPermissionGroup of this.userPermissionGroups) {
      permission = this.findPermissionById(userPermissionGroup, id);

      if (permission)
        return permission;
    }

    return permission;
  }

  private postUserRole(userRole: UserRoleCreationModel) {
    this.httpClient
      .post<string>(ApiRoutes.userRole.post, userRole)
      .subscribe({
        next: result => {
          switch (result) {
            case ApiResultEnum[ApiResultEnum.OK]:
              this.router.navigate([Routes.userRoles.navigations.list]);
              this.dialogMessageService.addSuccess(this.translate.instant('UserRole.Created'));
              break;
            default:
              this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
              break;
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterCreation('UserRole', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        },
        complete: () => {
          this.isExecuting = false;
        }
      });
  }

  private setUserRolePermissions(groupedUserPermissions: UserRolePermissionForCreationListGroupModel[]) {
    for (const userPermissionGroup of groupedUserPermissions) {
      const userPermissionsGroupChildren: UserPermissionNode[] = [];

      for (const permission of userPermissionGroup.Permissions) {
        userPermissionsGroupChildren.push({
          data: {
            id: permission.Id,
            name: permission.Name,
            linkedPermissionIds: permission.LinkedUserPermissions
          }
        });
      }

      this.userPermissionGroups.push(<UserPermissionNode>{
        data: {
          id: null,
          name: userPermissionGroup.GroupName,
          linkedPermissionIds: []
        },
        children: userPermissionsGroupChildren
      });
    }
  }
}