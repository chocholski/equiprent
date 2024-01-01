import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { Router } from "@angular/router";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { UserCreationModel } from "src/app/interfaces/user";
import { ApiRoutes } from "src/app/api-routes";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { Routes } from "src/app/routes";
import { FormComponent } from "../abstract/forms/form";
import { FormModeEnum } from "src/app/enums/form-mode-enum";

@Component({
  selector: "user-create",
  templateUrl: "./user-create.html"
})
export class UserCreationComponent
  extends FormComponent<UserCreationModel>
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
      ApiRoutes.user.post,
      translate,
      Routes.users.navigations.list);

    this.createForm({
      Email: ['', Validators.pattern(RegexPatterns.emailPattern)],
      FirstName: ['', Validators.required],
      IsActive: false,
      LanguageId: null,
      LastName: ['', Validators.required],
      Login: ['', Validators.required],
      Password: ['', Validators.pattern(RegexPatterns.passwordPattern)],
      UserRoleId: null
    });
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  public onBack() {
    this.router.navigate([Routes.users.navigations.list]);
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
      Email: this.form.value.Email,
      FirstName: this.form.value.FirstName,
      IsActive: this.form.value.IsActive,
      LanguageId: this.form.value.LanguageId,
      LastName: this.form.value.LastName,
      Login: this.form.value.Login,
      Password: this.form.value.Password,
      UserRoleId: this.form.value.UserRoleId
    };

    return user;
  }
}