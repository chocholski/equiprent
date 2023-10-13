import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormComponent } from "../abstract/formComponent";
import { FormBuilder, Validators } from "@angular/forms";
import { SelectItem } from "primeng/api";
import { Router } from "@angular/router";
import { SelectOptionsService } from "src/app/services/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { UserCreationModel } from "src/app/interfaces/user";
import { ApiRoutes } from "src/app/api-routes";
import { ErrorService } from "src/app/services/error.service";
import { DialogMessageService } from "src/app/services/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/console-message.service";
import { ApiResultEnum } from "src/app/enums/apiResultEnum";

@Component({
  selector: "user-create",
  templateUrl: "./user-create.html"
})
export class UserCreationComponent
  extends FormComponent
  implements OnInit {

  languages: SelectItem<number>[];
  userRoles: SelectItem<number>[];

  constructor(
    private consoleMessageService: ConsoleMessageService,
    private errorService: ErrorService,
    protected override formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private dialogMessageService: DialogMessageService,
    private router: Router,
    private selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {

    super(formBuilder);

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

  onBack() {
    this.router.navigate(['home/users']);
  }

  onSubmit() {
    this.isExecuting = true;

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

    this.postUser(user);
  }

  private populateDropdowns() {

    this.selectOptionsService.getLanguages().subscribe(options => {
      this.languages = options;
    });

    this.selectOptionsService.getUserRoles().subscribe(options => {
      this.userRoles = options;
    });
  }

  private postUser(user: UserCreationModel) {
    this.httpClient
      .post<string>(ApiRoutes.user.post, user)
      .subscribe({
        next: result => {
          switch (result) {
            case ApiResultEnum[ApiResultEnum.OK]:
              this.router.navigate(['home/users']);
              this.dialogMessageService.addSuccess(this.translate.instant('User.Created'));
              break;
            case ApiResultEnum[ApiResultEnum.LoginExists]:
              this.dialogMessageService.addError(this.translate.instant('User.LoginAlreadyExists'));
              break;
            default:
              this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
              break;
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterCreation('User', result));
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