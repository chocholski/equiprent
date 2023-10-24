import { Data, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { UserListComponent } from './components/users/user-list';
import { UserRoleListComponent } from './components/user-roles/user-role-list';
import { LoginComponent } from './components/login/login';
import { AuthGuard } from './services/auth-guard.service';
import { UserPermissionEnum } from './enums/user-permission-enum';
import { UserDetailsComponent } from './components/users/user-details';
import { UserCreationComponent } from './components/users/user-create';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Routes } from './routes';
import { UserRoleCreationComponent } from './components/user-roles/user-role-create';
import { UserRoleDetailsComponent } from './components/user-roles/user-role-details';

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
