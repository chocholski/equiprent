import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { UserProfileModel } from "src/app/interfaces/user";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ROUTES } from "src/app/constants/routes.constants";
import { MenuService } from "src/app/layout/services/menu.service";
import { Form } from "../../abstract/forms/form";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";
import { USER_PROFILE_CONTROL_NAMES } from "./user-profile.constants";

@Component({
  selector: "user-profile",
  templateUrl: "./user-profile.component.html"
})
export class UserProfileComponent
  extends Form<UserProfileModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareUserProfileModel;

  protected override afterSubmitionCustomOperationsHandler = undefined;

  private readonly entityId: string;

  user: UserProfileModel;
  userRoles: SelectItem<number>[];

  constructor(
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    private readonly menuService: MenuService,
    protected override readonly router: Router,
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService
  ) {

    super(
      consoleMessageService,
      dialogMessageService,
      'User',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Edition,
      router,
      API_ROUTES.user.saveProfile,
      translate,
      ROUTES.home.navigations.default);

    this.createForm({
      [USER_PROFILE_CONTROL_NAMES.Email]: ['', Validators.pattern(RegexPatterns.emailPattern)],
      [USER_PROFILE_CONTROL_NAMES.FirstName]: ['', Validators.required],
      [USER_PROFILE_CONTROL_NAMES.LastName]: ['', Validators.required],
      [USER_PROFILE_CONTROL_NAMES.Login]: [{ value: '', disabled: true }],
      [USER_PROFILE_CONTROL_NAMES.UserRole]: null,
      [USER_PROFILE_CONTROL_NAMES.Password]: ['', Validators.pattern(RegexPatterns.passwordPattern)]
    });

    this.entityId = AuthorizationService.currentUserId!;
    this.loadUser();
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    const firstMenuItemUserIsAuthorizedFor = this.menuService.getFirstMenuItemUserIsAuthorizedFor();
    this.router.navigate([ROUTES.home.navigations.default]);
  }

  private isPasswordFieldFilled() {
    return this.form.value[USER_PROFILE_CONTROL_NAMES.Password]?.length > 0;
  }

  private loadUser() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<UserProfileModel>(API_ROUTES.user.getProfileById(this.entityId))
      .subscribe(result => {
        this.user = result;

        this.updateForm({
          [USER_PROFILE_CONTROL_NAMES.Email]: this.user.Email,
          [USER_PROFILE_CONTROL_NAMES.FirstName]: this.user.FirstName,
          [USER_PROFILE_CONTROL_NAMES.LastName]: this.user.LastName,
          [USER_PROFILE_CONTROL_NAMES.Login]: this.user.Login,
          [USER_PROFILE_CONTROL_NAMES.UserRole]: this.user.UserRoleId.toString(),
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

  private prepareUserProfileModel(): UserProfileModel {
    const user = <UserProfileModel>{
      Email: this.form.value[USER_PROFILE_CONTROL_NAMES.Email],
      FirstName: this.form.value[USER_PROFILE_CONTROL_NAMES.FirstName],
      Id: this.user.Id,
      LastName: this.form.value[USER_PROFILE_CONTROL_NAMES.LastName]
    };

    if (this.isPasswordFieldFilled()) {
      user.Password = this.form.value[USER_PROFILE_CONTROL_NAMES.Password];
    }

    return user;
  }
}