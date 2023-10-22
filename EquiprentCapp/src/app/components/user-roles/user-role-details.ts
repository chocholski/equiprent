import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ConsoleMessageService } from "src/app/services/console-message.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ButtonAccessService } from "src/app/services/buttonAccessService";
import { UserPermissionEnum } from "src/app/enums/userPermissionEnum";
import { Confirmation, ConfirmationService } from "primeng/api";
import { ErrorService } from "src/app/services/error.service";
import { FormBuilder } from "@angular/forms";
import { ButtonAccessComponent } from "../abstract/buttonAccessComponent";
import { DialogMessageService } from "src/app/services/dialog-message.service";
import { TranslateService } from "@ngx-translate/core";
import { UserPermissionsForUserRoleListItemModel, UserRoleDetailsModel } from "src/app/interfaces/user-role";
import { UserPermissionNode } from "src/app/interfaces/user-permission";
import { PngTreeColumn } from "src/app/interfaces/png";
import { NameInLanguagesComponent } from "../name-in-languages/name-in-languages";
import { Routes } from "src/app/routes";
import { ApiRoutes } from "src/app/api-routes";
import { ApiResultEnum } from "src/app/enums/apiResultEnum";

@Component({
  selector: 'user-role-details',
  templateUrl: './user-role-details.html'
})
export class UserRoleDetailsComponent
  extends ButtonAccessComponent
  implements OnInit {

  private userRoleId: number;

  isNameInLanguagesValid: boolean = false;
  selectedUserPermissions: UserPermissionNode[] = [];
  userPermissionColumns: PngTreeColumn[] = [];
  userPermissionGroups: UserPermissionNode[] = [];
  userRole: UserRoleDetailsModel;

  @ViewChild('nameInLanguages') nameInLanguages: NameInLanguagesComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected override buttonAccessService: ButtonAccessService,
    private confirmationService: ConfirmationService,
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private errorService: ErrorService,
    protected override formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    public translate: TranslateService
  ) {
    super(buttonAccessService, formBuilder, [UserPermissionEnum.UserRoles_CanModify]);

    this.userRoleId = this.activatedRoute.snapshot.params["id"];
    this.isDisabled = true;

    this.createForm({});
    this.loadUserRole();
  }

  ngOnInit() {
    this.userPermissionColumns = [
      {
        field: 'name',
        header: 'UserPermission.Name'
      }
    ];
  }

  public onBack() {
    this.router.navigate([Routes.userRoles.navigations.list]);
  }

  public onDelete() {
    this.confirmationService.confirm(<Confirmation>{
      key: 'deleteUserRole',
      message: `${this.translate.instant('UserRole.DeletionConfirmation')} '${this.userRole.Name}'?`,
      accept: () => {
        this.isExecuting = true;
        this.deleteUserRole();
      }
    });
  }

  public onIsNameInLanguagesValid(value: boolean) {
    this.isNameInLanguagesValid = value;
  }

  public onPermissionSelected(permission: UserPermissionNode) {
    console.log(this.userPermissionGroups);

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

    const userRole = <UserRoleDetailsModel>{
      Id: this.userRole.Id,
      NameInLanguages: this.nameInLanguages.getNameInLanguages(),
      Permissions: this.userRole.Permissions,
      PermissionsSelected: [],
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

    this.putUserRole(userRole);
  }

  private deleteUserRole() {
    this.httpClient
      .delete<string>(ApiRoutes.userRole.delete(this.userRole.Id))
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant('UserRole.Deleted'));
            this.router.navigate([Routes.userRoles.navigations.list]);
          }
          else {
            this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion('UserRole', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        },
        complete: () => {
          this.isExecuting = false;
        }
      });
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

  private loadUserRole() {
    if (!this.userRoleId)
      return;

    this.httpClient
      .get<UserRoleDetailsModel>(ApiRoutes.userRole.getById(this.userRoleId))
      .subscribe(result => {
        this.userRole = result;

        this.setAccess();
        this.updateForm();

        if (!this.form.disabled) {
          this.formValidator.updateAllControlsToTouched();
        }
      });
  }

  private putUserRole(userRole: UserRoleDetailsModel) {
    this.httpClient
      .put<string>(ApiRoutes.userRole.put, userRole)
      .subscribe({
        next: result => {
          switch (result) {
            case ApiResultEnum[ApiResultEnum.OK]:
              this.router.navigate([Routes.userRoles.navigations.list]);
              this.dialogMessageService.addSuccess(this.translate.instant('UserRole.Updated'));
              break;
            default:
              break;
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterUpdate('UserRole', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        },
        complete: () => {
          this.isExecuting = false;
        }
      });
  }

  private updateForm() {
    if (!this.userRole)
      return;

    for (const userPermissionGroup of this.userRole.Permissions) {
      const userPermissionGroupChildren: UserPermissionNode[] = [];

      for (const permission of userPermissionGroup.Permissions) {
        userPermissionGroupChildren.push({
          expanded: true,
          data: {
            id: permission.Id,
            isSelected: permission.IsSelected,
            linkedPermissionIds: permission.LinkedUserPermissions,
            name: permission.Name
          },
          partialSelected: permission.IsSelected ? false : undefined
        });
      }

      this.userPermissionGroups.push(<UserPermissionNode>{
        expanded: true,
        data: {
          id: null,
          isSelected: userPermissionGroupChildren.every(c => c.data.isSelected),
          linkedPermissionIds: [],
          name: userPermissionGroup.GroupName
        },
        children: userPermissionGroupChildren,
        partialSelected: !userPermissionGroupChildren.every(c => c.data.isSelected) && userPermissionGroupChildren.some(c => c.data.isSelected)
      });
    }

    for (const permissionNode of this.userPermissionGroups) {
      if (permissionNode.children !== undefined && permissionNode.children.length > 0) {
        for (const childPermission of permissionNode.children!) {
          if (childPermission.data.isSelected) {
            this.selectedUserPermissions.push(childPermission);
          }
        }

        if (permissionNode.data.isSelected) {
          this.selectedUserPermissions.push(permissionNode);
        }
      }
      else {
        if (permissionNode.data.isSelected) {
          this.selectedUserPermissions.push(permissionNode);
        }
      }
    }
  }
}