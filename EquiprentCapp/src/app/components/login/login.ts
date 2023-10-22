import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { LanguageCodeEnum } from 'src/app/enums/languageCodeEnum';
import { SignInModel } from 'src/app/interfaces/authentication';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ErrorService } from 'src/app/services/error.service';
import { DialogMessageService } from 'src/app/services/dialog-message.service';
import { SelectOptionsService } from 'src/app/services/select-options.service';
import { FormValidator } from 'src/app/ui-controls/form-validator';
import { ApiResultEnum } from 'src/app/enums/apiResultEnum';
import { Routes } from 'src/app/routes';

@Component({
  selector: "login",
  templateUrl: "./login.html"
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formValidator: FormValidator;
  languageId: number;
  languages: SelectItem[];

  constructor(private app: AppComponent,
    private authenticationService: AuthenticationService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private dialogMessageService: DialogMessageService,
    private router: Router,
    private selectOptionsService: SelectOptionsService,
    private titleService: Title,
    public translate: TranslateService) {

    this.translate.setDefaultLang('pl');
    this.titleService.setTitle(translate.instant('AppName'));
    this.createForm();
    this.formValidator = new FormValidator(this.form);
  }

  ngOnInit(): void {
    this.selectOptionsService
      .getLanguages()
      .subscribe(options => {
        this.languages = options;

        const languageIdFromStorage = localStorage.getItem('languageId');

        if (languageIdFromStorage) {
          this.languageId = Number(languageIdFromStorage);
          this.setLanguage(this.languageId);
        }
      });
  }

  onSubmit() {
    if (!this.form.value.Login) {
      this.dialogMessageService.addError(this.errorService.getDefaultErrorMessage());
      return;
    }

    const data = <SignInModel>{
      Login: this.form.value.Login,
      Password: this.form.value.Password
    };

    this.authenticationService
      .login(data)
      .subscribe((result) => {
        switch (result) {
          case ApiResultEnum[ApiResultEnum.OK]:
            this.app.isUserLoggedIn = true;
            this.router.navigate([Routes.home.navigations.default]);
            break;

          case ApiResultEnum[ApiResultEnum.NotActive]:
            this.dialogMessageService.addError(this.translate.instant('Messages.AccountNotActive'));
            this.dialogMessageService.addError(this.translate.instant('Messages.PleaseContactAdmin'));
            break;

          default:
            this.dialogMessageService.addError(this.translate.instant('Messages.InvalidLoginData'));
            break;
        }
      });
  }

  private createForm() {
    this.form = this.formBuilder.group({
      Login: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  private getLanguageCodeById(id: number): string {
    switch (id) {
      case LanguageCodeEnum.Pl.valueOf():
        return "pl";
      case LanguageCodeEnum.En.valueOf():
        return "en";
      default:
        return "---";
    }
  }

  private setLanguage(languageId: number) {
    const lang = this.getLanguageCodeById(languageId);

    this.translate.use(lang).subscribe(x => {
      this.titleService.setTitle(this.translate.instant('AppName'));
    });
  }
}