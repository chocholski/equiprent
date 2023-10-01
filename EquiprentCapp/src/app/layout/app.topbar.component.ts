import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from '../app.component';
import { LayoutService } from "./services/app.layout.service";
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { SelectOptionsService } from '../services/select-options.service';
import { LanguageCodeEnum } from '../enums/languageCodeEnum';
import { Title } from "@angular/platform-browser";
import { AppSidebarComponent } from './app.sidebar.component';
import { AuthorizationService } from '../services/authorization.service';
import { UserChangeLanguageModel } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../api-routes';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    userMenuItems: MenuItem[] = [];
    languageItems: MenuItem[] = [];
    languageId: number;

    @Input('appSidebar') appSidebar!: AppSidebarComponent;

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
        public app: AppComponent,
        public translate: TranslateService,
        public authService: AuthenticationService,
        private router: Router,
        private selectOptionsService: SelectOptionsService,
        private titleService: Title,
        private config: PrimeNGConfig,
        private httpClient: HttpClient) {

        selectOptionsService.getLanguages().subscribe(languages => {
            this.userMenuItems = [
                {
                    label: this.translate.instant('Language.Plural'),
                    icon: 'fa fa-solid fa-language',
                    items: languages.map(l => <MenuItem>{ label: l.label, command: () => this.onLanguageChange(l.value) })
                },
                { label: this.translate.instant('General.LogOut'), icon: 'fa fa-power-off', command: () => this.logout() }
            ];

            var languageIdFromStorage = localStorage.getItem('languageId');
            if (languageIdFromStorage) {
                this.languageId = Number(languageIdFromStorage);
                this.setLanguage(this.languageId);
            }
        });
    }

    private logout(): void {
        if (this.authService.logout()) {
            this.router.navigate(['login']);
        }
    }

    private onLanguageChange(id: number) {
        var currentUserId = AuthorizationService.currentUserId;
        if (!currentUserId) {
            return;
        }

        this.languageId = Number(id);
        this.setLanguage(this.languageId);
        localStorage.setItem('languageId', this.languageId.toString());

        var model = new UserChangeLanguageModel();

        model.Id = currentUserId;
        model.LanguageId = this.languageId;

        this.httpClient
            .put<string>(ApiRoutes.user.changeLanguage, model)
            .subscribe(
                result => {
                    if (result == "OK") {
                        this.setLanguage(this.languageId);
                    }
                }
            );
    }

    private setLanguage(languageId: number) {
        var lang = this.getLanguageCodeById(languageId);
        this.translate.use(lang).subscribe(x => {
            this.titleService.setTitle(this.translate.instant("AppName"));
            this.appSidebar?.appMenu?.buildMenu();
            this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
        });
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
