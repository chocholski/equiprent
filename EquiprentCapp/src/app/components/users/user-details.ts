import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService, SelectItem } from "primeng/api";
import { ApiRoutes } from "src/app/api-routes";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { UserDetailsModel } from "src/app/interfaces/user";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { PrimeNgHelper } from "src/app/tools/primeNgHelper";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { Routes } from "src/app/routes";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { AccessControlFormComponent } from "../abstract/forms/access-control-form";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { StringBuilder } from "src/app/tools/stringBuilder";

@Component({
  selector: "user-details",
  templateUrl: "./user-details.html"
})
export class UserDetailsComponent
  extends AccessControlFormComponent<UserDetailsModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareUserDetailsModel;

  protected override afterSubmitionCustomOperationsHandler = undefined;
  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
  protected override readonly entityId: string;

  user: UserDetailsModel;
  userRoles: SelectItem<number>[];

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
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService
  ) {

    super(
      activatedRoute,
      authorizationService,
      confirmationService,
      consoleMessageService,
      'deleteUser',
      ApiRoutes.user.delete,
      dialogMessageService,
      'User',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      ApiRoutes.user.put,
      translate,
      [UserPermissionEnum.Users_CanModify],
      Routes.users.navigations.list);

    this.createForm({
      CreatedOn: [{ value: '', disabled: true }],
      Email: ['', Validators.pattern(RegexPatterns.emailPattern)],
      FirstName: ['', Validators.required],
      IsActive: false,
      LastName: ['', Validators.required],
      Login: [{ value: '', disabled: true }],
      UserRoleId: null,
      Password: ['', Validators.pattern(RegexPatterns.passwordPattern)]
    });

    this.loadUser();
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([Routes.users.navigations.list]);
  }

  private getEntityInstanceName(): string {
    return new StringBuilder(this.user.LastName)
      .append(' ')
      .append(this.user.FirstName)
      .toString();
  }

  private isPasswordFieldFilled() {
    return this.form.value.Password.length > 0;
  }

  private loadUser() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<UserDetailsModel>(ApiRoutes.user.getById(this.entityId))
      .subscribe(result => {
        this.user = result;

        this.updateForm({
          CreatedOn: PrimeNgHelper.getDateFromCalendarAsString(new Date(this.user.CreatedOn ?? "")),
          Email: this.user.Email,
          FirstName: this.user.FirstName,
          IsActive: this.user.IsActive,
          LastName: this.user.LastName,
          Login: this.user.Login,
          UserRoleId: this.user.UserRoleId.toString(),
        });
      });
  }

  private populateDropdowns() {
    this.selectOptionsService
      .getUserRoles()
      .subscribe(options => {
        this.userRoles = options;
      });
  }

  private prepareUserDetailsModel(): UserDetailsModel {
    const user = <UserDetailsModel>{
      Email: this.form.value.Email,
      FirstName: this.form.value.FirstName,
      Id: this.user.Id,
      IsActive: this.form.value.IsActive,
      LastName: this.form.value.LastName,
      UserRoleId: this.form.value.UserRoleId
    };

    if (this.isPasswordFieldFilled()) {
      user.Password = this.form.value.Password;
    }

    return user;
  }
}