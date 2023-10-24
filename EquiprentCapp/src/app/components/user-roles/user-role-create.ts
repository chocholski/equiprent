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
import { ApiRoutes } from "src/app/api-routes";
import { UserRoleCreationModel, UserRolePermissionsForCreation } from "src/app/interfaces/user-role";
import { PermissionGroupItemModel } from "src/app/interfaces/user-permission";
import { NameInLanguagesComponent } from "../name-in-languages/name-in-languages";
import { ApiResultEnum } from "src/app/enums/api-result-enum";
import { UserRolePermissionsComponent } from "./user-role-permissions";

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
      set: (userPermissions: UserRolePermissionsForCreation) => this.groupedUserPermissions = userPermissions.List
    }
  }

  groupedUserPermissions: PermissionGroupItemModel[];
  isNameInLanguagesValid: boolean = false;

  @ViewChild('nameInLanguages') nameInLanguages: NameInLanguagesComponent;
  @ViewChild('userRolePermissions') userRolePermissions: UserRolePermissionsComponent;

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

    this.createForm();
  }

  ngOnInit() {
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

  public onSubmit() {
    this.isExecuting = true;

    const userRole = new UserRoleCreationModel();

    userRole.NameInLanguages = this.nameInLanguages.getNameInLanguages();

    const permissionsSubmitted = this.userRolePermissions.getPermissionsSubmitted();

    for (const permission of permissionsSubmitted) {
      if (!userRole.doesPermissionExistWithinSelected(permission.Id)) {
        userRole.PermissionsSelected.push(permission);
      }
    }

    this.postUserRole(userRole);
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

            case ApiResultEnum[ApiResultEnum.ExistsInDatabase]:
              this.dialogMessageService.addError(this.translate.instant('UserRole.ExistsInDatabase'));
              break;

            case ApiResultEnum[ApiResultEnum.NoUserPermissionAssigned]:
              this.dialogMessageService.addError(this.translate.instant('UserRole.NoUserPermissionAssigned'));
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
}