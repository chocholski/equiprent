//Angular
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
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
import { MenuService } from './services/layout/menu.service';
import { AuthorizationService } from './services/authorization/authorization.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthInterceptor } from './services/interceptors/auth-interceptor';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsoleMessageService } from './services/messages/console-message.service';
import { DialogMessageService } from './services/messages/dialog-message.service';
import { ErrorService } from './services/errors/error.service';
import { FilterService } from './services/filters/filter.service';
import { SelectOptionsService } from './services/select-options/select-options.service';

//Components
import { AddressComponent } from './components/addresses/address';
import { AuditListForEntityComponent } from './components/audits/audit-list-for-entity';
import { ClientCreationComponent } from './components/clients/client-create';
import { ClientDetailsComponent } from './components/clients/client-details';
import { ClientListComponent } from './components/clients/client-list';
import { CompanyClientAddressComponent } from './components/addresses/company-client-address';
import { LoginComponent } from './components/login/login';
import { LoginResetPasswordComponent } from './components/login/login-reset-password';
import { NameInLanguagesComponent } from './components/name-in-languages/name-in-languages';
import { PrivateClientAddressComponent } from './components/addresses/private-client-address';
import { PrivateClientComponent } from './components/clients/private-client';
import { UserCreationComponent } from './components/users/user-create';
import { UserDetailsComponent } from './components/users/user-details';
import { UserListComponent } from './components/users/user-list';
import { UserRoleCreationComponent } from './components/user-roles/user-role-create';
import { UserRoleDetailsComponent } from './components/user-roles/user-role-details';
import { UserRoleListComponent } from './components/user-roles/user-role-list';
import { UserRolePermissionsComponent } from './components/user-roles/user-role-permissions';

//PrimeNG
import { ApiUrlInterceptor } from './services/interceptors/api-url-interceptor';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TreeTableModule } from 'primeng/treetable';

registerLocaleData(localePl, 'pl');
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
    declarations: [
        //[start] app components
        AppComponent,
        //[end] app components
        //[start] custom components
        AddressComponent,
        AuditListForEntityComponent,
        ClientCreationComponent,
        ClientDetailsComponent,
        ClientListComponent,
        CompanyClientAddressComponent,
        LoginComponent,
        LoginResetPasswordComponent,
        NameInLanguagesComponent,
        PrivateClientAddressComponent,
        PrivateClientComponent,
        UserCreationComponent,
        UserDetailsComponent,
        UserListComponent,
        UserRoleCreationComponent,
        UserRoleDetailsComponent,
        UserRoleListComponent,
        UserRolePermissionsComponent,
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
        BreadcrumbModule,
        ButtonModule,
        CheckboxModule,
        ConfirmDialogModule,
        DropdownModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        PanelMenuModule,
        PasswordModule,
        SplitButtonModule,
        TableModule,
        TabViewModule,
        ToastModule,
        TreeTableModule,
        //[end] primeng Modules
    ],
    providers: [
        //[start] app services
        { provide: LocationStrategy, useClass: PathLocationStrategy },
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
        ConfirmationService,
        ConsoleMessageService,
        DialogMessageService,
        ErrorService,
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