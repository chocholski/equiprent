import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SelectItem } from "primeng/api";
import { ApiRoutes } from "src/app/api-routes";
import { UserPermissionEnum } from "src/app/enums/userPermissionEnum";
import { UserDetailsModel } from "src/app/interfaces/user";
import { ButtonAccessService } from "src/app/services/buttonAccessService";
import { SelectOptionsService } from "src/app/services/select-options.service";
import { PrimeNgHelper } from "src/app/tools/primeNgHelper";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { FormValidator } from "src/app/ui-controls/form-validator";

@Component({
  selector: "user-details",
  templateUrl: "./user-details.html"
})
export class UserDetailsComponent implements OnInit {

  form: FormGroup;
  formValidator: FormValidator;
  isDisabled: boolean;
  user: UserDetailsModel;
  userId: string;
  userRoles: SelectItem[];
  selectedUserRole: SelectItem;

  constructor(
    private activatedRoute: ActivatedRoute,
    private buttonAccessService: ButtonAccessService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private selectOptionsService: SelectOptionsService,
    public translate: TranslateService) {

    this.userId = this.activatedRoute.snapshot.params["id"];
    this.isDisabled = true;
    this.createForm();
    this.formValidator = new FormValidator(this.form);
    this.buttonAccessService.assignPermissions([UserPermissionEnum.Users_CanModify]);
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
        this.buttonAccessService.setAccess(this.form, this.isDisabled);

        this.updateForm();

        if (!this.form.disabled) {
          this.formValidator.updateAllControlsToTouched();
        }
      })
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