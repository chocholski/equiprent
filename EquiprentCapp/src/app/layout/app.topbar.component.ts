import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { AppComponent } from '../app.component';
import { LayoutService } from "./services/app.layout.service";
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, Scroll } from '@angular/router';
import { SelectOptionsService } from '../services/select-options.service';
import { LanguageCodeEnum } from '../enums/languageCodeEnum';
import { Title } from "@angular/platform-browser";
import { AppSidebarComponent } from './app.sidebar.component';
import { AuthorizationService } from '../services/authorization.service';
import { UserChangeLanguageModel } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { ApiRoutes } from '../api-routes';
import { ApiResultEnum } from '../enums/apiResultEnum';
import { filter } from 'rxjs';
import { StringBuilder } from '../tools/stringBuilder';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    public readonly home = { icon: 'pi pi-home', url: 'home' };

    private languageId: number;

    breadcrumbItems: MenuItem[] = [];
    userMenuItems: MenuItem[] = [];

    @Input('appSidebar') appSidebar!: AppSidebarComponent;

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        private activatedRoute: ActivatedRoute,
        public app: AppComponent,
        public authenticationService: AuthenticationService,
        private config: PrimeNGConfig,
        private httpClient: HttpClient,
        public layoutService: LayoutService,
        private router: Router,
        private selectOptionsService: SelectOptionsService,
        private titleService: Title,
        public translate: TranslateService) {

        this.selectOptionsService
            .getLanguages()
            .subscribe(languages => {
                this.userMenuItems = [
                    {
                        label: this.translate.instant('Language.Plural'),
                        icon: 'fa fa-solid fa-language',
                        items: languages.map(l => <MenuItem>{ label: l.label, command: () => this.onLanguageChange(l.value) })
                    },
                    { label: this.translate.instant('General.LogOut'), icon: 'fa fa-power-off', command: () => this.logout() }
                ];

                const languageIdFromStorage = localStorage.getItem('languageId');

                if (languageIdFromStorage) {
                    this.languageId = Number(languageIdFromStorage);
                    this.setLanguage(this.languageId);
                }
            });

        this.feedBreadcrumb();
    }

    public setTheme(withDarkMode: boolean) {
        const theme = withDarkMode ? 'arya-blue' : 'saga-orange';
        const colorScheme = withDarkMode ? 'dark' : 'light';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);

        this.layoutService.config.colorScheme
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    private createBreadcrumbs(route: ActivatedRoute, urlBuilder = new StringBuilder(), breadcrumbs: MenuItem[] = []): MenuItem[] {
        const children: ActivatedRoute[] = route.children;

        if (children.length === 0)
            return breadcrumbs;

        for (const child of children) {
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            if (routeURL !== '') {
                urlBuilder.append(`/${routeURL}`);
            }

            const label = child.snapshot.data['breadcrumb'];

            if (label) {
                breadcrumbs.push(<MenuItem>{ label: this.translate.instant(label), url: urlBuilder.toString(), target: "_self" });
            }

            return this.createBreadcrumbs(child, urlBuilder, breadcrumbs);
        }

        return breadcrumbs;
    }

    private feedBreadcrumb() {
        this.router.events
            .pipe(filter(event => event instanceof Scroll || event instanceof NavigationEnd))
            .subscribe(() => this.breadcrumbItems = this.createBreadcrumbs(this.activatedRoute.root));
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

    private logout(): void {
        if (this.authenticationService.logout()) {
            this.router.navigate(['login']);
        }
    }

    private onLanguageChange(id: number) {
        const currentUserId = AuthorizationService.currentUserId;

        if (!currentUserId)
            return;

        this.languageId = Number(id);
        this.setLanguage(this.languageId);

        localStorage.setItem('languageId', this.languageId.toString());

        const model = <UserChangeLanguageModel>{
            Id: currentUserId,
            LanguageId: this.languageId
        };

        this.httpClient
            .put<string>(ApiRoutes.user.changeLanguage, model)
            .subscribe(
                result => {
                    if (result === ApiResultEnum[ApiResultEnum.OK])
                        this.setLanguage(this.languageId);
                }
            );
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

    private setLanguage(languageId: number) {
        const language = this.getLanguageCodeById(languageId);

        this.translate
            .use(language)
            .subscribe(() => {
                this.titleService.setTitle(this.translate.instant('AppName'));
                this.appSidebar?.appMenu?.buildMenu();
                this.translate
                    .get('primeng')
                    .subscribe(res => this.config.setTranslation(res));
            });
    }
}
