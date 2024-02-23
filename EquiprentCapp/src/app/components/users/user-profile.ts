import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { ApiRoutes } from "src/app/api-routes";
import { UserDetailsModel, UserProfileModel } from "src/app/interfaces/user";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { Routes } from "src/app/routes";
import { MenuService } from "src/app/services/layout/menu.service";
import { FormComponent } from "../abstract/forms/form";
import { FormModeEnum } from "src/app/enums/form-mode-enum";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";

@Component({
  selector: "user-profile",
  templateUrl: "./user-profile.html"
})
export class UserProfileComponent
  extends FormComponent<UserProfileModel>
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
      ApiRoutes.user.saveProfile,
      translate,
      Routes.home.navigations.default);

    this.createForm({
      Email: ['', Validators.pattern(RegexPatterns.emailPattern)],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Login: [{ value: '', disabled: true }],
      UserRoleId: null,
      Password: ['', Validators.pattern(RegexPatterns.passwordPattern)]
    });

    this.entityId = AuthorizationService.currentUserId!;
    this.loadUser();
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    const firstMenuItemUserIsAuthorizedFor = this.menuService.getFirstMenuItemUserIsAuthorizedFor();
    this.router.navigate([Routes.home.navigations.default]);
  }

  private isPasswordFieldFilled() {
    return this.form.value.Password.length > 0;
  }

  private loadUser() {
    if (!this.entityId)
      return;

    this.httpClient
      .get<UserProfileModel>(ApiRoutes.user.getProfileById(this.entityId))
      .subscribe(result => {
        this.user = result;

        this.updateForm({
          Email: this.user.Email,
          FirstName: this.user.FirstName,
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

  private prepareUserProfileModel(): UserProfileModel {
    const user = <UserProfileModel>{
      Email: this.form.value.Email,
      FirstName: this.form.value.FirstName,
      Id: this.user.Id,
      LastName: this.form.value.LastName
    };

    if (this.isPasswordFieldFilled()) {
      user.Password = this.form.value.Password;
    }

    return user;
  }
}