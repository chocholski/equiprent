import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Confirmation, ConfirmationService, SelectItem } from "primeng/api";
import { ApiRoutes } from "src/app/api-routes";
import { UserPermissionEnum } from "src/app/enums/user-permission-enum";
import { UserDetailsModel } from "src/app/interfaces/user";
import { SelectOptionsService } from "src/app/services/select-options/select-options.service";
import { PrimeNgHelper } from "src/app/tools/primeNgHelper";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { AccessControlFormComponent } from "../abstract/access-control-form";
import { StringBuilder } from "src/app/tools/stringBuilder";
import { ErrorService } from "src/app/services/errors/error.service";
import { DialogMessageService } from "src/app/services/messages/dialog-message.service";
import { ConsoleMessageService } from "src/app/services/messages/console-message.service";
import { Routes } from "src/app/routes";
import { ApiResultEnum } from "src/app/enums/api-result-enum";
import { AuthorizationService } from "src/app/services/authorization/authorization.service";

@Component({
  selector: "user-details",
  templateUrl: "./user-details.html"
})
export class UserDetailsComponent
  extends AccessControlFormComponent
  implements OnInit {

  private userId: string;

  user: UserDetailsModel;
  userRoles: SelectItem<number>[];

  constructor(
    private activatedRoute: ActivatedRoute,
    protected override authorizationService: AuthorizationService,
    private confirmationService: ConfirmationService,
    private consoleMessageService: ConsoleMessageService,
    private dialogMessageService: DialogMessageService,
    private errorService: ErrorService,
    protected override formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private selectOptionsService: SelectOptionsService,
    public translate: TranslateService
  ) {

    super(authorizationService, formBuilder, [UserPermissionEnum.Users_CanModify]);

    this.userId = this.activatedRoute.snapshot.params["id"];
    this.isDisabled = true;

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

  public onDelete() {
    this.confirmationService.confirm(<Confirmation>{
      key: 'deleteUser',
      message: `${this.translate.instant('User.DeletionConfirmation')} '${new StringBuilder(this.user.LastName).append(' ').append(this.user.FirstName).toString()}'?`,
      accept: () => {
        this.isExecuting = true;
        this.deleteUser();
      }
    });
  }

  public onSubmit() {
    this.isExecuting = true;

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

    this.putUser(user);
  }

  private deleteUser() {
    this.httpClient
      .delete<string>(ApiRoutes.user.delete(this.user.Id))
      .subscribe({
        next: result => {
          if (result === ApiResultEnum[ApiResultEnum.OK]) {
            this.dialogMessageService.addSuccess(this.translate.instant('User.Deleted'));
            this.router.navigate([Routes.users.navigations.list]);
          }
          else {
            this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
          }

          console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterDeletion('User', result));
        },
        error: e => {
          this.dialogMessageService.addError(this.errorService.getFirstTranslatedErrorMessage(e));
        },
        complete: () => {
          this.isExecuting = false;
        }
      });
  }

  private isPasswordFieldFilled() {
    return this.form.value.Password.length > 0;
  }

  private loadUser() {
    if (!this.userId)
      return;

    this.httpClient
      .get<UserDetailsModel>(ApiRoutes.user.getById(this.userId))
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

  private putUser(user: UserDetailsModel) {
    this.httpClient
      .put<string>(ApiRoutes.user.put, user)
      .subscribe(
        {
          next: result => {
            if (result === ApiResultEnum[ApiResultEnum.OK]) {
              this.router.navigate([Routes.users.navigations.list]);
              this.dialogMessageService.addSuccess(this.translate.instant('User.Updated'));
            }

            console.log(this.consoleMessageService.getConsoleMessageWithResultForEntityAfterUpdate('User', result));
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