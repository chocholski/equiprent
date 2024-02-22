import { Data, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { UserListComponent } from './components/users/user-list';
import { UserRoleListComponent } from './components/user-roles/user-role-list';
import { LoginComponent } from './components/login/login';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { UserPermissionEnum } from './enums/user-permission-enum';
import { UserDetailsComponent } from './components/users/user-details';
import { UserCreationComponent } from './components/users/user-create';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Routes } from './routes';
import { UserRoleCreationComponent } from './components/user-roles/user-role-create';
import { UserRoleDetailsComponent } from './components/user-roles/user-role-details';
import { ClientListComponent } from './components/clients/client-list';
import { ClientCreationComponent } from './components/clients/client-create';
import { ClientDetailsComponent } from './components/clients/client-details';
import { ManufacturerListComponent } from './components/manufacturers/manufacturer-list';
import { ManufacturerCreationComponent } from './components/manufacturers/manufacturer-create';
import { ManufacturerDetailsComponent } from './components/manufacturers/manufacturer-details';
import { EquipmentListComponent } from './components/equipments/equipment-list';
import { EquipmentCreationComponent } from './components/equipments/equipment-create';
import { EquipmentDetailsComponent } from './components/equipments/equipment-details';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: Routes.home.paths.default, component: AppLayoutComponent,
                data: {
                    breadcrumb: Routes.home.breadcrumbs.default
                },
                children: [
                    {
                        path: Routes.clients.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Clients_CanList],
                            breadcrumb: Routes.clients.breadcrumbs.list
                        },
                        children: [
                            {
                                path: '',
                                component: ClientListComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Clients_CanList],
                                    breadcrumb: null
                                }
                            },
                            {
                                path: Routes.clients.paths.create,
                                component: ClientCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Clients_CanModify],
                                    breadcrumb: Routes.clients.breadcrumbs.creation
                                }
                            },
                            {
                                path: Routes.clients.paths.edit,
                                component: ClientDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Clients_CanModify],
                                    breadcrumb: Routes.clients.breadcrumbs.edition
                                }
                            }
                        ]
                    },
                    {
                        path: Routes.equipments.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Equipments_CanList],
                            breadcrumb: Routes.equipments.breadcrumbs.list
                        },
                        children: [
                            {
                                path: '',
                                component: EquipmentListComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Equipments_CanList],
                                    breadcrumb: null
                                }
                            },
                            {
                                path: Routes.equipments.paths.create,
                                component: EquipmentCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Equipments_CanModify],
                                    breadcrumb: Routes.equipments.breadcrumbs.creation
                                }
                            },
                            {
                                path: Routes.equipments.paths.edit,
                                component: EquipmentDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Equipments_CanModify],
                                    breadcrumb: Routes.equipments.breadcrumbs.edition
                                }
                            }
                        ]
                    },
                    {
                        path: Routes.manufacturers.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Manufacturers_CanList],
                            breadcrumb: Routes.manufacturers.breadcrumbs.list
                        },
                        children: [
                            {
                                path: '',
                                component: ManufacturerListComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Manufacturers_CanList],
                                    breadcrumb: null
                                }
                            },
                            {
                                path: Routes.manufacturers.paths.create,
                                component: ManufacturerCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Manufacturers_CanModify],
                                    breadcrumb: Routes.manufacturers.breadcrumbs.creation
                                }
                            },
                            {
                                path: Routes.manufacturers.paths.edit,
                                component: ManufacturerDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Manufacturers_CanModify],
                                    breadcrumb: Routes.manufacturers.breadcrumbs.edition
                                }
                            }
                        ]
                    },
                    {
                        path: Routes.users.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Users_CanList],
                            breadcrumb: Routes.users.breadcrumbs.list
                        },
                        children: [
                            {
                                path: '',
                                component: UserListComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Users_CanList],
                                    breadcrumb: null
                                }
                            },
                            {
                                path: Routes.users.paths.create,
                                component: UserCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Users_CanModify],
                                    breadcrumb: Routes.users.breadcrumbs.creation
                                }
                            },
                            {
                                path: Routes.users.paths.edit,
                                component: UserDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Users_CanList],
                                    breadcrumb: Routes.users.breadcrumbs.edition
                                }
                            }
                        ]
                    },
                    {
                        path: Routes.userRoles.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.UserRoles_CanList],
                            breadcrumb: Routes.userRoles.breadcrumbs.list
                        },
                        children: [
                            {
                                path: '',
                                component: UserRoleListComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.UserRoles_CanList],
                                    breadcrumb: null
                                }
                            },
                            {
                                path: Routes.userRoles.paths.create,
                                component: UserRoleCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.UserRoles_CanModify],
                                    breadcrumb: Routes.userRoles.breadcrumbs.creation
                                }
                            },
                            {
                                path: Routes.userRoles.paths.edit,
                                component: UserRoleDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.UserRoles_CanList],
                                    breadcrumb: Routes.userRoles.breadcrumbs.edition
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: Routes.login.paths.default,
                component: LoginComponent,
                data: {
                    breadcrumb: null
                }
            },
            {
                path: '**',
                redirectTo: Routes.home.paths.default
            },
            {
                path: '',
                redirectTo: Routes.home.paths.default,
                pathMatch: 'full'
            },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload', useHash: false })
    ],
    providers: [
        {
            provide: LocationStrategy, useClass: PathLocationStrategy
        }
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
