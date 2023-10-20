import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ApiRoutes } from "src/app/api-routes";
import { ResetPasswordModel } from 'src/app/interfaces/authentication';
import { ErrorService } from 'src/app/services/error.service';
import { FormValidator } from 'src/app/ui-controls/form-validator';

@Component({
  selector: "login-reset-password",
  templateUrl: "./login-reset-password.html"
})
export class LoginResetPasswordComponent implements OnInit {

  form: FormGroup;
  formValidator: FormValidator;
  token: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialogMessageService: MessageService,
    private errorService: ErrorService,
    public formBuilder: FormBuilder,
    private httpClient: HttpClient,
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
      this.dialogMessageService.add({ key: 'tst', severity: 'error', summary: this.errorService.getDefaultErrorMessage(), detail: this.translate.instant('Messages.EnterEmailFirst') });
      return;
    }

    const model = <ResetPasswordModel>{
      Email: this.form.value.Email,
      Language: this.translate.currentLang
    };

    //TODO
  }
}