//Angular
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectOptionsService } from './services/select-options.service';
import { FilterService } from './services/filter.service';

//Components
import { LoginComponent } from './components/login/login';
import { LoginResetPasswordComponent } from './components/login/login-reset-password';
import { UserListComponent } from './components/users/user-list';
import { UserRoleListComponent } from './components/user-roles/user-role-list';

//primeng
import { ApiUrlInterceptor } from './services/interceptors/api-url-interceptor';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

registerLocaleData(localePl, 'pl');
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        //[start] app components
        AppComponent,
        //[end] app components
        //[start] custom components
        LoginComponent,
        LoginResetPasswordComponent,
        UserListComponent,
        UserRoleListComponent
        //[end] custom components
    ],
    imports: [
        //[start] app modules
        AppLayoutModule,
        AppRoutingModule,
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: jwtTokenGetter
            }
        }),
        NgxMaskModule.forRoot(options),
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        //[end] app modules
        //[start] primeng Modules
        ButtonModule,
        CheckboxModule,
        MultiSelectModule,
        PanelMenuModule,
        PasswordModule,
        SplitButtonModule,
        TableModule,
        ToastModule,
        //[end] primeng Modules
    ],
    providers: [
        //[start] app services
        { provide: LocationStrategy, useClass: HashLocationStrategy },
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
        AuthenticationService,
        AuthGuard,
        AuthorizationService,
        FilterService,
        MessageService,
        MenuService,
        SelectOptionsService,
        //[end] app services
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

export function jwtTokenGetter() {
    return localStorage.getItem(environment.auth_key);
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}