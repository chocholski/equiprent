import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Message, MessageService, SelectItem } from "primeng/api";
import { ApiRoutes } from "src/app/api-routes";
import { UserPermissionEnum } from "src/app/enums/userPermissionEnum";
import { UserDetailsModel } from "src/app/interfaces/user";
import { ButtonAccessService } from "src/app/services/buttonAccessService";
import { SelectOptionsService } from "src/app/services/select-options.service";
import { PrimeNgHelper } from "src/app/tools/primeNgHelper";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { FormValidator } from "src/app/ui-controls/form-validator";
import { ButtonAccessComponent } from "../abstract/buttonAccessComponent";

@Component({
  selector: "user-details",
  templateUrl: "./user-details.html"
})
export class UserDetailsComponent
  extends ButtonAccessComponent
  implements OnInit {

  user: UserDetailsModel;
  userId: string;
  userRoles: SelectItem<number>[];

  constructor(
    private activatedRoute: ActivatedRoute,
    protected override buttonAccessService: ButtonAccessService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {

    super(buttonAccessService, [UserPermissionEnum.Users_CanModify]);

    this.userId = this.activatedRoute.snapshot.params["id"];
    this.isDisabled = true;
    this.createForm();
    this.formValidator = new FormValidator(this.form);
    this.loadUser();
  }

  ngOnInit() {
    this.populateDropdowns();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      CreatedOn: [{ value: '', disabled: true }],
      Email: ['', Validators.pattern(RegexPatterns.emailPattern)],
      FirstName: ['', Validators.required],
      IsActive: false,
      LastName: ['', Validators.required],
      Login: [{ value: '', disabled: true }],
      UserRoleId: null,
      Password: ['', Validators.pattern(RegexPatterns.passwordPattern)]
    });
  }

  private loadUser() {
    if (!this.userId)
      return;

    this.httpClient
      .get<UserDetailsModel>(ApiRoutes.user.getById(this.userId))
      .subscribe(result => {
        this.user = result;
        this.setAccess();

        this.updateForm();

        if (!this.form.disabled) {
          this.formValidator.updateAllControlsToTouched();
        }
      })
  }

  onBack() {
    this.router.navigate(['home/users']);
  }

  onSubmit() {
    this.isExecuting = true;

    const user = <UserDetailsModel>{
      Email: this.form.value.Email,
      FirstName: this.form.value.FirstName,
      Id: this.user.Id,
      LastName: this.form.value.LastName,
      UserRoleId: this.form.value.UserRoleId
    };

    if (this.form.value.Password.length > 0) {
      user.Password = this.form.value.Password;
    }

    this.httpClient
      .put<string>(ApiRoutes.user.put, user)
      .subscribe(
        {
          next: result => {
            if (result == "OK") {
              this.router.navigate(['home/users']);
              this.messageService.add(<Message>{ severity: 'success', summary: this.translate.instant('User.Updated'), life: 5000 });
            }

            this.isExecuting = false;

            console.log(`User has been updated with result: ${result}`);
          },
          error: e => {
            this.messageService.add(<Message>{ severity: 'error', summary: this.translate.instant('General.Error'), life: 2000 });
            this.isExecuting = false
          }
        });
  }

  private populateDropdowns() {
    this.selectOptionsService.getUserRoles().subscribe(options => {
      this.userRoles = options;
    });
  }

  private updateForm() {
    this.form.patchValue({
      CreatedOn: PrimeNgHelper.getDateFromCalendarAsString(new Date(this.user.CreatedOn ?? "")),
      Email: this.user.Email,
      FirstName: this.user.FirstName,
      IsActive: this.user.IsActive,
      LastName: this.user.LastName,
      Login: this.user.Login,
      UserRoleId: this.user.UserRoleId,
    });
  }
}