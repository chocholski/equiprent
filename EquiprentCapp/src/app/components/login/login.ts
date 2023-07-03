import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { LanguageCodeEnum } from 'src/app/enums/languageCodeEnum';
import { SignInModel } from 'src/app/interfaces/authentication';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SelectOptionsService } from 'src/app/services/select-options.service';
import { FormValidator } from 'src/app/ui-controls/form-validator';

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
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private selectOptionsService: SelectOptionsService,
    private titleService: Title,
    public translate: TranslateService) {

    this.translate.setDefaultLang('pl');
    this.titleService.setTitle(translate.instant("AppName"));

    this.createForm();
    this.formValidator = new FormValidator(this.form);
  }

  ngOnInit(): void {
    this.selectOptionsService.getLanguages().subscribe(options => {
      this.languages = options;
      var languageIdFromStorage = localStorage.getItem('languageId');

      if (languageIdFromStorage) {
        this.languageId = Number(languageIdFromStorage);
        this.setLanguage(this.languageId);
      }
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      Login: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.form.value.Login) {
      this.messageService.add({ key: 'tst', severity: 'error', summary: this.translate.instant('General.Error'), detail: this.translate.instant('Messages.EnterLoginFirst') });
      return;
    }

    var data = <SignInModel>{};
    data.Login = this.form.value.Login;
    data.Password = this.form.value.Password;

    this.authenticationService
      .login(data)
      .subscribe((result) => {
        if (result == "OK") {
          this.app.isUserLoggedIn = true;
          this.router.navigate(['home']);
        }
        else if (result == "NotActive") {
          this.messageService.add({ severity: 'error', summary: this.translate.instant('Messages.AccountNotActive') });
          this.messageService.add({ severity: 'error', summary: this.translate.instant('Messages.PleaseContactAdmin') });
        }
        else {
          this.messageService.add({ severity: 'error', summary: this.translate.instant('Messages.InvalidLoginData') });
        }
      });
  }

  setLanguage(languageId: number) {
    var lang = this.getLanguageCodeById(languageId);

    this.translate.use(lang).subscribe(x => {
      this.titleService.setTitle(this.translate.instant("AppName"));
    });
  }

  resetPassword() {
    this.router.navigate(['login/reset-password'], { queryParams: { 'token': '' } });
  }

  getLanguageCodeById(id: number): string {
    switch (id) {
      case LanguageCodeEnum.Pl.valueOf():
        return "pl";
      case LanguageCodeEnum.En.valueOf():
        return "en";
      default:
        return "---";
    }
  }
}