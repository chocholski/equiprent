import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LayoutService } from "./services/app.layout.service";
import { API_ROUTES } from '../constants/api-routes.constants';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { UserChangeThemeModel } from '../interfaces/user';
import { ApiResultEnum } from '../enums/api-result.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {

    isDarkModeThemeSelected: boolean = false;

    constructor(
        private readonly httpClient: HttpClient,
        public readonly layoutService: LayoutService,
        public readonly translate: TranslateService) {

        const isDarkModeThemeSelectedFromStorage = localStorage.getItem('isDarkModeThemeSelected');

        if (isDarkModeThemeSelectedFromStorage) {
            this.isDarkModeThemeSelected = Boolean(isDarkModeThemeSelectedFromStorage);
        }

        this.httpClient
            .get<boolean>(API_ROUTES.user.getTheme(AuthorizationService.currentUserId!))
            .subscribe({
                next: result => {
                    this.isDarkModeThemeSelected = result;
                    this.changeTheme();
                }
            });
    }

    changeUserTheme() {
        localStorage.setItem('isDarkModeThemeSelected', this.isDarkModeThemeSelected.toString());

        const model = <UserChangeThemeModel>{
            Id: AuthorizationService.currentUserId
        };

        this.httpClient
            .post<string>(API_ROUTES.user.changeTheme, model)
            .subscribe({
                next: result => {
                    if (result === ApiResultEnum[ApiResultEnum.OK]) {
                        this.changeTheme();
                    }
                }
            });
    }

    private changeTheme() {
        const theme = this.isDarkModeThemeSelected ? 'arya-blue' : 'saga-orange';
        const colorScheme = this.isDarkModeThemeSelected ? 'dark' : 'light';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);

        this.layoutService.config.colorScheme
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    private replaceThemeLink(href: string, onComplete: Function) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }
}
