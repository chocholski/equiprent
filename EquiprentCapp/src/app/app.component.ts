import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthorizationService } from './services/authorization/authorization.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    public isUserLoggedIn: boolean;

    constructor(private primengConfig: PrimeNGConfig,
        private translate: TranslateService,
        private authenticationService: AuthenticationService,
        private authorizationService: AuthorizationService,
        private titleService: Title) {
        this.translate.setDefaultLang('pl');
        this.isUserLoggedIn = this.authenticationService.isLoggedIn();
        this.authorizationService.decodeTokenAndSetData();
    }

    @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        event.preventDefault();
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.titleService.setTitle("Equiprent");
    }
}
