import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService, SelectItem } from "primeng/api";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { UserPermissionEnum } from "src/app/enums/user-permission.enum";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { PrimeNgHelper } from "src/app/tools/primeNgHelper";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ROUTES } from "src/app/constants/routes.constants";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { AccessControlForm } from "../../abstract/forms/access-control-form";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { StringBuilder } from "src/app/tools/stringBuilder";
import { UserDetailsModel } from "src/app/interfaces/user";
import { USER_DETAILS_CONTROL_NAMES } from "./user-details.constants";

@Component({
  selector: "user-details",
  templateUrl: "./user-details.component.html"
})
export class UserDetailsComponent
  extends AccessControlForm<UserDetailsModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareUserDetailsModel;

  protected override afterSubmitionCustomOperationsHandler = undefined;
  protected override deletedEntityInstanceIdentificationInitializer = this.getEntityInstanceName;
  protected override entityId: string;

  user: UserDetailsModel;
  userRoles: SelectItem<number>[];

  public override get shouldActionsBeDisabled(): boolean {
    return super.shouldActionsBeDisabled ||
      !this.user;
  }

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
      API_ROUTES.user.delete,
      dialogMessageService,
      'User',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      API_ROUTES.user.put,
      translate,
      [UserPermissionEnum.Users_CanModify],
      ROUTES.users.navigations.list);

    this.createForm({
      [USER_DETAILS_CONTROL_NAMES.CreatedOn]: [{ value: '', disabled: true }],
      [USER_DETAILS_CONTROL_NAMES.Email]: ['', Validators.pattern(RegexPatterns.emailPattern)],
      [USER_DETAILS_CONTROL_NAMES.FirstName]: ['', Validators.required],
      [USER_DETAILS_CONTROL_NAMES.IsActive]: false,
      [USER_DETAILS_CONTROL_NAMES.LastName]: ['', Validators.required],
      [USER_DETAILS_CONTROL_NAMES.Login]: [{ value: '', disabled: true }],
      [USER_DETAILS_CONTROL_NAMES.UserRole]: null,
      [USER_DETAILS_CONTROL_NAMES.Password]: ['', Validators.pattern(RegexPatterns.passwordPattern)]
    });

    this.loadUser();
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([ROUTES.users.navigations.list]);
  }

  private getEntityInstanceName(): string {
    return new StringBuilder(this.user.LastName)
      .append(' ')
      .append(this.user.FirstName)
      .toString();
  }

  private isPasswordFieldFilled() {
    return this.form.value[USER_DETAILS_CONTROL_NAMES.Password]?.length > 0;
  }

  private loadUser() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<UserDetailsModel>(API_ROUTES.user.getById(this.entityId))
      .subscribe(result => {
        this.user = result;
        this.updateForm({
          [USER_DETAILS_CONTROL_NAMES.CreatedOn]: PrimeNgHelper.getDateFromCalendarAsString(new Date(this.user.CreatedOn ?? "")),
          [USER_DETAILS_CONTROL_NAMES.Email]: this.user.Email,
          [USER_DETAILS_CONTROL_NAMES.FirstName]: this.user.FirstName,
          [USER_DETAILS_CONTROL_NAMES.IsActive]: this.user.IsActive,
          [USER_DETAILS_CONTROL_NAMES.LastName]: this.user.LastName,
          [USER_DETAILS_CONTROL_NAMES.Login]: this.user.Login,
          [USER_DETAILS_CONTROL_NAMES.UserRole]: this.user.UserRoleId.toString(),
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
      Email: this.form.value[USER_DETAILS_CONTROL_NAMES.Email],
      FirstName: this.form.value[USER_DETAILS_CONTROL_NAMES.FirstName],
      Id: this.user.Id,
      IsActive: this.form.value[USER_DETAILS_CONTROL_NAMES.IsActive],
      LastName: this.form.value[USER_DETAILS_CONTROL_NAMES.LastName],
      UserRoleId: this.form.value[USER_DETAILS_CONTROL_NAMES.UserRole],
    };

    if (this.isPasswordFieldFilled()) {
      user.Password = this.form.value[USER_DETAILS_CONTROL_NAMES.Password];
    }

    return user;
  }
}