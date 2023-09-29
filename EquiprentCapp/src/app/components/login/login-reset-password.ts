import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ResetPasswordModel } from 'src/app/interfaces/authentication';
import { FormValidator } from 'src/app/ui-controls/form-validator';

@Component({
  selector: "login-reset-password",
  templateUrl: "./login-reset-password.html"
})
export class LoginResetPasswordComponent implements OnInit {

  form: FormGroup;
  formValidator: FormValidator;
  token: string;

  constructor(private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public messageService: MessageService,
    public translate: TranslateService) {

    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      this.createForm();
      this.formValidator = new FormValidator(this.form);
    });

    this.formValidator = new FormValidator(this.form);
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      Email: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.form.value.Email) {
      this.messageService.add({ key: 'tst', severity: 'error', summary: this.translate.instant('General.Error'), detail: this.translate.instant('Messages.EnterEmailFirst') });
      return;
    }

    var model = <ResetPasswordModel>{
      Email: this.form.value.Email,
      Language: this.translate.currentLang
    };

    //[TODO]
    // this.http.put<string>(`identity/resetpassword`, model).subscribe(result => {
    //   if (result == "OK") {
    //     this.messageService.add({ key: 'tst', severity: 'success', summary: this.translate.instant("Messages.EmailWithPasswordResetInstructionsSent") });
    //   }
    //   else if (result == "WrongToken") {
    //     this.messageService.add({ key: 'tst', severity: 'error', summary: this.translate.instant("Messages.CantChangeUserPassword") });
    //   }
    //   else if (result == "EmailDoesntExist") {
    //     this.messageService.add({ severity: 'error', summary: this.translate.instant("Messages.ProvidedEmailDoesNotExist") });
    //   }

    //   console.log(`Reset password has been ended with result: ${result}`);
    // }, error => console.log(error));
  }
}