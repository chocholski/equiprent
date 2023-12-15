import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ErrorService } from 'src/app/services/errors/error.service';
import { FormComponent } from '../abstract/form';

@Component({
  selector: "login-reset-password",
  templateUrl: "./login-reset-password.html"
})
export class LoginResetPasswordComponent
  extends FormComponent
  implements OnInit {

  token: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private errorService: ErrorService,
    protected override formBuilder: FormBuilder,
    public dialogMessageService: MessageService,
    public translate: TranslateService) {

    super(formBuilder);

    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];

      this.createForm({
        Email: ['', Validators.required]
      });
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    if (!this.form.value.Email) {
      this.dialogMessageService.add({ severity: 'error', summary: this.errorService.getDefaultErrorMessage(), detail: this.translate.instant('Messages.EnterEmailFirst') });
      return;
    }

    // const model = <ResetPasswordModel>{
    //   Email: this.form.value.Email,
    //   Language: this.translate.currentLang
    // };

    //[TODO]
    // this.http.put<string>(ApiRoutes.identity.resetPassword, model).subscribe(result => {
    //   if (result == "OK") {
    //     this.messageService.add({ key: 'tst', severity: 'success', summary: this.translate.instant('Messages.EmailWithPasswordResetInstructionsSent') });
    //   }
    //   else if (result == "WrongToken") {
    //     this.messageService.add({ key: 'tst', severity: 'error', summary: this.translate.instant('Messages.CantChangeUserPassword') });
    //   }
    //   else if (result == "EmailDoesntExist") {
    //     this.messageService.add({ severity: 'error', summary: this.translate.instant('Messages.ProvidedEmailDoesNotExist') });
    //   }

    //   console.log(`Reset password has been ended with result: ${result}`);
    // }, error => console.log(error));
  }
}