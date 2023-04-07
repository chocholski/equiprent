//Angular
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';

//Application
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { environment } from 'src/environments/environment';

//Services
import { MenuService } from './services/menu.service';
import { AuthorizationService } from './services/authorization.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthInterceptor } from './services/interceptors/auth-interceptor';
import { AuthGuard } from './services/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectOptionsService } from './services/select-options.service';
import { FilterService } from './services/filter.service';

//Components
import { UserListComponent } from './components/users/user-list';
import { LoginComponent } from './components/login/login';
import { LoginResetPasswordComponent } from './components/login/login-reset-password';

//primeng
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ApiUrlInterceptor } from './services/interceptors/api-url-interceptor';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';

registerLocaleData(localePl, 'pl');
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        //[start] app components
        AppComponent,
        //[end] app components
        //[start] custom components
        LoginComponent,
        UserListComponent,
        LoginResetPasswordComponent,
        //[end] custom components
    ],
    imports: [
        //[start] app modules
        AppLayoutModule,
        BrowserModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: jwtTokenGetter
            }
        }),
        NgxMaskModule.forRoot(options),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        ReactiveFormsModule,
        //[end] app modules
        //[start] primeng Modules
        ButtonModule,
        CheckboxModule,
        PasswordModule,
        ToastModule,
        SplitButtonModule,
        PanelMenuModule,
        TableModule
        //[end] primeng Modules
    ],
    providers: [
        //[start] app services
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        MenuService,
        AuthorizationService,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiUrlInterceptor,
            multi: true
        },
        AuthGuard,
        MessageService,
        SelectOptionsService,
        FilterService
        //[end] app services
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function jwtTokenGetter() {
    return localStorage.getItem(environment.auth_key_name);
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}