import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { Router } from "@angular/router";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { UserCreationModel } from "src/app/interfaces/user";
import { API_ROUTES } from "src/app/constants/api-routes.constants";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { ROUTES } from "src/app/constants/routes.constants";
import { Form } from "../../abstract/forms/form";
import { FormModeEnum } from "src/app/enums/form-mode.enum";
import { USER_CREATE_CONTROL_NAMES } from "./user-create.constants";

@Component({
  selector: "user-create",
  templateUrl: "./user-create.component.html"
})
export class UserCreationComponent
  extends Form<UserCreationModel>
  implements OnInit {

  public override readonly beforeSubmitionCustomOperationsHandler = this.prepareUserCreationModel;

  languages: SelectItem<number>[];
  userRoles: SelectItem<number>[];

  constructor(
    protected override readonly consoleMessageService: ConsoleMessageService,
    protected override readonly dialogMessageService: DialogMessageService,
    protected override readonly errorService: ErrorService,
    protected override readonly formBuilder: FormBuilder,
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    private readonly selectOptionsService: SelectOptionsService,
    public override readonly translate: TranslateService) {

    super(
      consoleMessageService,
      dialogMessageService,
      'User',
      errorService,
      formBuilder,
      httpClient,
      FormModeEnum.Creation,
      router,
      API_ROUTES.user.post,
      translate,
      ROUTES.users.navigations.list);

    this.createForm({
      [USER_CREATE_CONTROL_NAMES.Email]: ['', Validators.pattern(RegexPatterns.emailPattern)],
      [USER_CREATE_CONTROL_NAMES.FirstName]: ['', Validators.required],
      [USER_CREATE_CONTROL_NAMES.IsActive]: false,
      [USER_CREATE_CONTROL_NAMES.Language]: null,
      [USER_CREATE_CONTROL_NAMES.LastName]: ['', Validators.required],
      [USER_CREATE_CONTROL_NAMES.Login]: ['', Validators.required],
      [USER_CREATE_CONTROL_NAMES.Password]: ['', Validators.pattern(RegexPatterns.passwordPattern)],
      [USER_CREATE_CONTROL_NAMES.UserRole]: null
    });
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([ROUTES.users.navigations.list]);
  }

  private populateDropdowns() {

    this.selectOptionsService
      .getLanguages()
      .subscribe(options => {
        this.languages = options;
      });

    this.selectOptionsService
      .getUserRoles()
      .subscribe(options => {
        this.userRoles = options;
      });
  }

  private prepareUserCreationModel(): UserCreationModel {
    const user = <UserCreationModel>{
      Email: this.form.value[USER_CREATE_CONTROL_NAMES.Email],
      FirstName: this.form.value[USER_CREATE_CONTROL_NAMES.FirstName],
      IsActive: this.form.value[USER_CREATE_CONTROL_NAMES.IsActive],
      LanguageId: this.form.value[USER_CREATE_CONTROL_NAMES.Language],
      LastName: this.form.value[USER_CREATE_CONTROL_NAMES.LastName],
      Login: this.form.value[USER_CREATE_CONTROL_NAMES.Login],
      Password: this.form.value[USER_CREATE_CONTROL_NAMES.Password],
      UserRoleId: this.form.value[USER_CREATE_CONTROL_NAMES.UserRole]
    };

    return user;
  }
}