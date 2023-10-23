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
import { UserRoleCreationModel, UserRolePermissionsForCreation } from "src/app/interfaces/user-role";
import { PermissionGroupItemModel, PermissionItemModel, UserPermissionNode } from "src/app/interfaces/user-permission";
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
        const permissionToBeSelected = this.getPermissionNodeToBeSelected(linkedPermissionId);

        if (permissionToBeSelected) {
          this.selectedUserPermissions.push(permissionToBeSelected);
        }
      }
    }
  }

  public onSubmit() {
    this.isExecuting = true;

    const userRole = new UserRoleCreationModel();

    userRole.NameInLanguages = this.nameInLanguages.getNameInLanguages();

    const permissionsSubmitted = this.getPermissionsSubmitted();

    for (const permission of permissionsSubmitted) {
      if (!userRole.doesPermissionExistWithinSelected(permission.Id)) {
        userRole.PermissionsSelected.push(permission);
      }
    }

    this.postUserRole(userRole);
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

  private getPermissionsSubmitted() {
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

  private setUserRolePermissions(groupedUserPermissions: PermissionGroupItemModel[]) {
    for (const userPermissionGroup of groupedUserPermissions) {
      const userPermissionsGroupChildren: UserPermissionNode[] = [];

      for (const permission of userPermissionGroup.Permissions) {
        userPermissionsGroupChildren.push(<UserPermissionNode>{
          data: {
            id: permission.Id,
            name: permission.Name,
            linkedPermissionIds: permission.LinkedPermissionsIds
          }
        });
      }

      this.userPermissionGroups.push(<UserPermissionNode>{
        data: {
          id: null,
          name: userPermissionGroup.Name,
          linkedPermissionIds: [],
        },
        children: userPermissionsGroupChildren
      });
    }
  }
}