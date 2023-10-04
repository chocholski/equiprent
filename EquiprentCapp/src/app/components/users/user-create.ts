import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormComponent } from "../abstract/formComponent";
import { FormBuilder, Validators } from "@angular/forms";
import { Message, MessageService, SelectItem } from "primeng/api";
import { Router } from "@angular/router";
import { SelectOptionsService } from "src/app/services/select-options.service";
import { TranslateService } from "@ngx-translate/core";
import { RegexPatterns } from "src/app/tools/regexPatterns";
import { UserCreationModel } from "src/app/interfaces/user";
import { ApiRoutes } from "src/app/api-routes";

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
    protected override formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private messageService: MessageService,
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

    this.httpClient
      .post<string>(ApiRoutes.user.post, user)
      .subscribe({
        next: result => {
          if (result == "OK") {
            this.router.navigate(['home/users']);
            this.messageService.add(<Message>{ severity: 'success', summary: this.translate.instant('User.Created'), life: 3000 });
          }
          else if (result == "LoginExists") {
            this.messageService.add(<Message>{ severity: 'error', summary: this.translate.instant('User.LoginAlreadyExist') });
          }

          this.isExecuting = false;

          console.log(`User has been created with result: ${result}`);
        },
        error: e => {
          this.messageService.add(<Message>{ severity: 'error', summary: this.translate.instant('General.Error'), life: 2000 });
          this.isExecuting = false;
        }
      });
  }

  private populateDropdowns() {

    this.selectOptionsService.getLanguages().subscribe(options => {
      this.languages = options;
    });

    this.selectOptionsService.getUserRoles().subscribe(options => {
      this.userRoles = options;
    });
  }
}