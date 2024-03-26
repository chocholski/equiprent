import { Data, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { UserListComponent } from './components/users/list/user-list.component';
import { UserRoleListComponent } from './components/user-roles/list/user-role-list.component';
import { LoginComponent } from './components/login/login/login.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { UserPermissionEnum } from './enums/user-permission.enum';
import { UserDetailsComponent } from './components/users/details/user-details.component';
import { UserCreationComponent } from './components/users/create/user-create.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ROUTES } from './constants/routes.constants';
import { UserRoleCreationComponent } from './components/user-roles/create/user-role-create.component';
import { UserRoleDetailsComponent } from './components/user-roles/details/user-role-details.component';
import { ClientListComponent } from './components/clients/list/client-list.component';
import { ClientCreationComponent } from './components/clients/create/client-create.component';
import { ClientDetailsComponent } from './components/clients/details/client-details.component';
import { ManufacturerListComponent } from './components/manufacturers/list/manufacturer-list.component';
import { ManufacturerCreationComponent } from './components/manufacturers/create/manufacturer-create.component';
import { ManufacturerDetailsComponent } from './components/manufacturers/details/manufacturer-details.component';
import { EquipmentListComponent } from './components/equipments/list/equipment-list.component';
import { EquipmentCreationComponent } from './components/equipments/create/equipment-create.component';
import { EquipmentDetailsComponent } from './components/equipments/details/equipment-details.component';
import { UserProfileComponent } from './components/users/profile/user-profile.component';
import { RentalListComponent } from './components/rentals/list/rental-list.component';
import { RentalCreationComponent } from './components/rentals/create/rental-create.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: ROUTES.home.paths.default, component: AppLayoutComponent,
                data: {
                    breadcrumb: ROUTES.home.breadcrumbs.default
                },
                children: [
                    {
                        path: ROUTES.users.paths.profile,
                        component: UserProfileComponent,
                        canActivate: [AuthGuard],
                        data: {
                            allowedPermissions: [UserPermissionEnum.ForAllLoggedIn],
                            breadcrumb: ROUTES.users.breadcrumbs.profile
                        }
                    },
                    {
                        path: ROUTES.clients.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Clients_CanList],
                            breadcrumb: ROUTES.clients.breadcrumbs.list
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
                                path: ROUTES.clients.paths.create,
                                component: ClientCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Clients_CanModify],
                                    breadcrumb: ROUTES.clients.breadcrumbs.creation
                                }
                            },
                            {
                                path: ROUTES.clients.paths.edit,
                                component: ClientDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Clients_CanModify],
                                    breadcrumb: ROUTES.clients.breadcrumbs.edition
                                }
                            }
                        ]
                    },
                    {
                        path: ROUTES.equipments.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Equipments_CanList],
                            breadcrumb: ROUTES.equipments.breadcrumbs.list
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
                                path: ROUTES.equipments.paths.create,
                                component: EquipmentCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Equipments_CanModify],
                                    breadcrumb: ROUTES.equipments.breadcrumbs.creation
                                }
                            },
                            {
                                path: ROUTES.equipments.paths.edit,
                                component: EquipmentDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Equipments_CanModify],
                                    breadcrumb: ROUTES.equipments.breadcrumbs.edition
                                }
                            }
                        ]
                    },
                    {
                        path: ROUTES.manufacturers.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Manufacturers_CanList],
                            breadcrumb: ROUTES.manufacturers.breadcrumbs.list
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
                                path: ROUTES.manufacturers.paths.create,
                                component: ManufacturerCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Manufacturers_CanModify],
                                    breadcrumb: ROUTES.manufacturers.breadcrumbs.creation
                                }
                            },
                            {
                                path: ROUTES.manufacturers.paths.edit,
                                component: ManufacturerDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Manufacturers_CanModify],
                                    breadcrumb: ROUTES.manufacturers.breadcrumbs.edition
                                }
                            }
                        ]
                    },
                    {
                        path: ROUTES.rentals.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Rentals_CanList],
                            breadcrumb: ROUTES.rentals.breadcrumbs.list
                        },
                        children: [
                            {
                                path: '',
                                component: RentalListComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Rentals_CanList],
                                    breadcrumb: null
                                }
                            },
                            {
                                path: ROUTES.rentals.paths.create,
                                component: RentalCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Rentals_CanModify],
                                    breadcrumb: ROUTES.rentals.breadcrumbs.creation
                                }
                            },
                            // {
                            //     path: ROUTES.rentals.paths.edit,
                            //     component: RentalDetailsComponent,
                            //     canActivate: [AuthGuard],
                            //     data: <Data>{
                            //         allowedPermissions: [UserPermissionEnum.Rentals_CanModify],
                            //         breadcrumb: ROUTES.rentals.breadcrumbs.edition
                            //     }
                            // }
                        ]
                    },
                    {
                        path: ROUTES.users.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Users_CanList],
                            breadcrumb: ROUTES.users.breadcrumbs.list
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
                                path: ROUTES.users.paths.create,
                                component: UserCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Users_CanModify],
                                    breadcrumb: ROUTES.users.breadcrumbs.creation
                                }
                            },
                            {
                                path: ROUTES.users.paths.edit,
                                component: UserDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Users_CanList],
                                    breadcrumb: ROUTES.users.breadcrumbs.edition
                                }
                            }
                        ]
                    },
                    {
                        path: ROUTES.userRoles.paths.list,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.UserRoles_CanList],
                            breadcrumb: ROUTES.userRoles.breadcrumbs.list
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
                                path: ROUTES.userRoles.paths.create,
                                component: UserRoleCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.UserRoles_CanModify],
                                    breadcrumb: ROUTES.userRoles.breadcrumbs.creation
                                }
                            },
                            {
                                path: ROUTES.userRoles.paths.edit,
                                component: UserRoleDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.UserRoles_CanList],
                                    breadcrumb: ROUTES.userRoles.breadcrumbs.edition
                                }
                            }
                        ]
                    }
                ]
            },
            {
                path: ROUTES.login.paths.default,
                component: LoginComponent,
                data: {
                    breadcrumb: null
                }
            },
            {
                path: '**',
                redirectTo: ROUTES.home.paths.default
            },
            {
                path: '',
                redirectTo: ROUTES.home.paths.default,
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
