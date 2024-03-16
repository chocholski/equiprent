import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ErrorService } from "src/app/services/errors/error.service";
import { FormBuilder } from "@angular/forms";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ROUTES } from "src/app/constants/routes.constants";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { UserRoleCreationModel, UserRolePermissionsForCreation } from "src/app/interfaces/user-role";
import { PermissionGroupItemModel } from "src/app/interfaces/user-permission";
import { NameInLanguagesComponent } from "../../name-in-languages/name-in-languages.component";
import { ApiResultEnum } from "src/app/enums/api-result.enum";
import { UserRolePermissionsComponent } from "../permissions/user-role-permissions.component";
import { Form } from "../../abstract/forms/form";
import { FormModeEnum } from "src/app/enums/form-mode.enum";

@Component({
  selector: "user-role-create",
  templateUrl: "./user-role-create.component.html"
})
export class UserRoleCreationComponent
  extends Form<UserRoleCreationModel>
  implements OnInit {

  public override beforeSubmitionCustomOperationsHandler = this.prepareUserRoleCreationModel;

  private readonly _dataPopulator = {
    userPermissions: {
      get: () => this.httpClient.get<UserRolePermissionsForCreation>(API_ROUTES.userRole.getUserRolePermissionsForCreation),
      set: (userPermissions: UserRolePermissionsForCreation) => this.groupedUserPermissions = userPermissions.List
    }
  }

  groupedUserPermissions: PermissionGroupItemModel[];
  isNameInLanguagesValid: boolean = false;

  @ViewChild('nameInLanguages') nameInLanguages: NameInLanguagesComponent;
  @ViewChild('userRolePermissions') userRolePermissions: UserRolePermissionsComponent;

  constructor(
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    public override readonly translate: TranslateService
  ) {

    super(
      consoleMessageService,
      dialogMessageService,
      'UserRole',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Creation,
      router,
      API_ROUTES.userRole.post,
      translate,
      ROUTES.userRoles.navigations.list);

    this.createForm();
  }

  ngOnInit() {
    this._dataPopulator.userPermissions
      .get()
      .subscribe(result => this._dataPopulator.userPermissions.set(result));
  }

  public onBack() {
    this.router.navigate([ROUTES.userRoles.navigations.list]);
  }

  public onIsNameInLanguagesValid(value: boolean) {
    this.isNameInLanguagesValid = value;
  }

  private prepareUserRoleCreationModel(): UserRoleCreationModel {
    const userRole = new UserRoleCreationModel();
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