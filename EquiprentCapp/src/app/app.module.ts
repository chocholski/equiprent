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
import { AssetService } from './services/assets/asset.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { AuthInterceptor } from './services/interceptors/auth-interceptor';
import { AuthorizationService } from './services/authorization/authorization.service';
import { ConsoleMessageService } from './services/messages/console-message.service';
import { DialogMessageService } from './services/messages/dialog-message.service';
import { ErrorService } from './services/errors/error.service';
import { FileService } from './services/files/file.service';
import { FilterService } from './services/filters/filter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageService } from './services/images/image.service';
import { MenuService } from './layout/services/menu.service';
import { SelectOptionsService } from './services/select-options/select-options.service';

//Components
import { AddressComponent } from './components/addresses/address/address.component';
import { AuditListForEntityComponent } from './components/audits/audit-list-for-entity/audit-list-for-entity.component';
import { ClientCreationComponent } from './components/clients/create/client-create.component';
import { ClientDetailsComponent } from './components/clients/details/client-details.component';
import { ClientListComponent } from './components/clients/list/client-list.component';
import { ClientRepresentativeCreationComponent } from './components/representatives/client-representatives/create/client-representative-create.component';
import { ClientRepresentativeDetailsComponent } from './components/representatives/client-representatives/details/client-representative-details.component';
import { ClientRepresentativeListComponent } from './components/representatives/client-representatives/list/client-representative-list.component';
import { CompanyClientAddressComponent } from './components/addresses/company-client-address/company-client-address.component';
import { DeletionDialogComponent } from './components/dialogs/deletion/deletion-dialog.component';
import { EquipmentCreationComponent } from './components/equipments/create/equipment-create.component';
import { EquipmentDetailsComponent } from './components/equipments/details/equipment-details.component';
import { EquipmentListComponent } from './components/equipments/list/equipment-list.component';
import { EquipmentPhotosComponent } from './components/equipments/photos/equipment-photos.component';
import { LoginComponent } from './components/login/login/login.component';
import { LoginResetPasswordComponent } from './components/login/reset-password/login-reset-password.component';
import { ManufacturerAddressComponent } from './components/addresses/manufacturer-address/manufacturer-address.component';
import { ManufacturerCreationComponent } from './components/manufacturers/create/manufacturer-create.component';
import { ManufacturerDetailsComponent } from './components/manufacturers/details/manufacturer-details.component';
import { ManufacturerListComponent } from './components/manufacturers/list/manufacturer-list.component';
import { NameInLanguagesComponent } from './components/name-in-languages/name-in-languages.component';
import { PrivateClientAddressComponent } from './components/addresses/private-client-address/private-client-address.component';
import { PrivateClientComponent } from './components/clients/private-client/private-client.component';
import { UserCreationComponent } from './components/users/create/user-create.component';
import { UserDetailsComponent } from './components/users/details/user-details.component';
import { UserListComponent } from './components/users/list/user-list.component';
import { UserProfileComponent } from './components/users/profile/user-profile.component';
import { UserRoleCreationComponent } from './components/user-roles/create/user-role-create.component';
import { UserRoleDetailsComponent } from './components/user-roles/details/user-role-details.component';
import { UserRoleListComponent } from './components/user-roles/list/user-role-list.component';
import { UserRolePermissionsComponent } from './components/user-roles/permissions/user-role-permissions.component';

//PrimeNG
import { ApiUrlInterceptor } from './services/interceptors/api-url-interceptor';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
        ClientRepresentativeCreationComponent,
        ClientRepresentativeDetailsComponent,
        ClientRepresentativeListComponent,
        CompanyClientAddressComponent,
        DeletionDialogComponent,
        EquipmentCreationComponent,
        EquipmentDetailsComponent,
        EquipmentListComponent,
        EquipmentPhotosComponent,
        LoginComponent,
        LoginResetPasswordComponent,
        ManufacturerAddressComponent,
        ManufacturerCreationComponent,
        ManufacturerDetailsComponent,
        ManufacturerListComponent,
        NameInLanguagesComponent,
        PrivateClientAddressComponent,
        PrivateClientComponent,
        UserCreationComponent,
        UserDetailsComponent,
        UserListComponent,
        UserProfileComponent,
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
        DynamicDialogModule,
        FileUploadModule,
        GalleriaModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        PanelMenuModule,
        PasswordModule,
        ProgressSpinnerModule,
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
        AssetService,
        AuthenticationService,
        AuthGuard,
        AuthorizationService,
        ConfirmationService,
        ConsoleMessageService,
        DialogMessageService,
        DialogService,
        ErrorService,
        FileService,
        FilterService,
        ImageService,
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