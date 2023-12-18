import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { Confirmation, ConfirmationService } from "primeng/api";
import { ErrorService } from "src/app/services/errors/error.service";
import { FormBuilder } from "@angular/forms";
import { AccessControlFormComponent } from "../abstract/access-control-form";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { TranslateService } from "@ngx-translate/core";
import { SelectedUserPermissionNodeArray } from "src/app/interfaces/user-permission";
import { PngTreeColumn } from "src/app/interfaces/png";
import { NameInLanguagesComponent } from "../name-in-languages/name-in-languages";
import { Routes } from "src/app/routes";
import { ApiRoutes } from "src/app/api-routes";
import { ApiResultEnum } from "src/app/enums/api-result-enum";
import { UserRoleDetailsModel } from "src/app/interfaces/user-role";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { UserRolePermissionsComponent } from "./user-role-permissions";
import { UserPermissionNode } from "./models/user-permission-node";

@Component({
  selector: 'user-role-details',
  templateUrl: './user-role-details.html'
})
export class UserRoleDetailsComponent
  extends AccessControlFormComponent
  implements OnInit {

  public override readonly deletionKey: string = 'deleteUserRole';

  private userRoleId: number;

  isNameInLanguagesValid: boolean = false;
  selectedUserPermissions = new SelectedUserPermissionNodeArray();
  userPermissionColumns: PngTreeColumn[] = [];
  userPermissionGroups: UserPermissionNode[] = [];
  userRole: UserRoleDetailsModel;

  @ViewChild('nameInLanguages') nameInLanguages: NameInLanguagesComponent;
  @ViewChild('userRolePermissions') userRolePermissions: UserRolePermissionsComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    protected override authorizationService: AuthorizationService,
    private confirmationService: ConfirmationService,
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private errorService: ErrorService,
    protected override formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    public translate: TranslateService
  ) {
    super(authorizationService, formBuilder, [UserPermissionEnum.UserRoles_CanModify]);

    this.userRoleId = this.activatedRoute.snapshot.params["id"];
    this.isDisabled = true;

    this.createForm();
    this.loadUserRole();
  }

  ngOnInit() {
  }

  public onBack() {
    this.router.navigate([Routes.userRoles.navigations.list]);
  }

  public onDelete() {
    this.confirmationService.confirm(<Confirmation>{
      key: this.deletionKey,
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

  public onSubmit() {
    this.isExecuting = true;

    const userRole = new UserRoleDetailsModel();

    userRole.Id = this.userRole.Id;
    userRole.NameInLanguages = this.nameInLanguages.getNameInLanguages();

    const permissionsSubmitted = this.userRolePermissions.getPermissionsSubmitted();

    for (const permission of permissionsSubmitted) {
      if (!userRole.doesPermissionExistWithinSelected(permission.Id)) {
        userRole.PermissionsSelected.push(permission);
      }
    }

    this.putUserRole(userRole);
  }

  private deleteUserRole() {
    this.httpClient
      .delete<string>(ApiRoutes.userRole.delete(this.userRole.Id))
      .subscribe({
        next: result => {
          switch (result) {
            case ApiResultEnum[ApiResultEnum.OK]:
              this.dialogMessageService.addSuccess(this.translate.instant('UserRole.Deleted'));
              this.router.navigate([Routes.userRoles.navigations.list]);
              break;

            case ApiResultEnum[ApiResultEnum.AssignedRoleDeletionAttempt]:
            case ApiResultEnum[ApiResultEnum.TheOnlyAssignedRoleDeletionAttempt]:
              this.dialogMessageService.addError(this.translate.instant('UserRole.AssignedRoleDeletionAttempt'));
              break;

            default:
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

  private loadUserRole() {
    if (!this.userRoleId)
      return;

    this.httpClient
      .get<UserRoleDetailsModel>(ApiRoutes.userRole.getById(this.userRoleId))
      .subscribe(result => {
        this.userRole = result;

        this.updateForm();
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

            case ApiResultEnum[ApiResultEnum.ExistsInDatabase]:
              this.dialogMessageService.addError(this.translate.instant('UserRole.ExistsInDatabase'));
              break;

            case ApiResultEnum[ApiResultEnum.NoUserPermissionAssigned]:
              this.dialogMessageService.addError(this.translate.instant('UserRole.NoUserPermissionAssigned'));
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

  protected override updateForm() {
    if (!this.userRole)
      return;

    super.updateForm();
  }
}