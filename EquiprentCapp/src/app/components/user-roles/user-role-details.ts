import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { ConfirmationService } from "primeng/api";
import { ErrorService } from "src/app/services/errors/error.service";
import { FormBuilder } from "@angular/forms";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { TranslateService } from "@ngx-translate/core";
import { SelectedUserPermissionNodeArray } from "src/app/interfaces/user-permission";
import { PngTreeColumn } from "src/app/interfaces/png";
import { NameInLanguagesComponent } from "../name-in-languages/name-in-languages";
import { Routes } from "src/app/routes";
import { ApiRoutes } from "src/app/api-routes";
import { UserRoleDetailsModel } from "src/app/interfaces/user-role";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { UserRolePermissionsComponent } from "./permissions/user-role-permissions";
import { UserPermissionNode } from "./permissions/models/user-permission-node";
import { AccessControlFormComponent } from "../abstract/forms/access-control-form";
import { FormModeEnum } from "src/app/enums/form-mode-enum";

@Component({
  selector: 'user-role-details',
  templateUrl: './user-role-details.html'
})
export class UserRoleDetailsComponent
  extends AccessControlFormComponent<UserRoleDetailsModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareUserRoleDetailsModel;

  protected override afterSubmitionCustomOperationsHandler = undefined;
  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
  protected override readonly entityId: number;

  isNameInLanguagesValid: boolean = false;
  selectedUserPermissions = new SelectedUserPermissionNodeArray();
  userPermissionColumns: PngTreeColumn[] = [];
  userPermissionGroups: UserPermissionNode[] = [];
  userRole: UserRoleDetailsModel;

  public override get shouldActionsBeDisabled(): boolean {
    return super.shouldActionsBeDisabled ||
      !this.userRole;
  }

  @ViewChild('nameInLanguages') nameInLanguages: NameInLanguagesComponent;
  @ViewChild('userRolePermissions') userRolePermissions: UserRolePermissionsComponent;

  constructor(
    protected override readonly activatedRoute: ActivatedRoute,
    protected override readonly authorizationService: AuthorizationService,
    protected override confirmationService: ConfirmationService,
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    public override readonly translate: TranslateService) {

    super(
      activatedRoute,
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteUserRole',
      ApiRoutes.userRole.delete,
      dialogMessageService,
      'UserRole',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      ApiRoutes.userRole.put,
      translate,
      [UserPermissionEnum.UserRoles_CanModify],
      Routes.userRoles.navigations.list);

    this.createForm();
    this.loadUserRole();
  }

  ngOnInit() {
  }

  public onBack() {
    this.router.navigate([Routes.userRoles.navigations.list]);
  }

  public onIsNameInLanguagesValid(value: boolean) {
    this.isNameInLanguagesValid = value;
  }

  private getEntityInstanceName(): string {
    return this.userRole.Name!;
  }

  private loadUserRole() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<UserRoleDetailsModel>(ApiRoutes.userRole.getById(this.entityId))
      .subscribe(result => {
        this.userRole = result;
        this.updateForm();
      });
  }

  protected override updateForm() {
    if (!this.userRole)
      return;

    super.updateForm();
  }

  private prepareUserRoleDetailsModel() {
    const userRole = new UserRoleDetailsModel();

    userRole.Id = this.userRole.Id;
    userRole.NameInLanguages = this.nameInLanguages.getNameInLanguages();

    const permissionsSubmitted = this.userRolePermissions.getPermissionsSubmitted();
    for (const permission of permissionsSubmitted) {
      if (!userRole.doesPermissionExistWithinSelected(permission.Id)) {
        userRole.PermissionsSelected.push(permission);
      }
    }

    return userRole;
  }
}