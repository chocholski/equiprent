import { Data, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { UserListComponent } from './components/users/user-list';
import { UserRoleListComponent } from './components/user-roles/user-role-list';
import { LoginComponent } from './components/login/login';
import { AuthGuard } from './services/auth-guard.service';
import { UserPermissionEnum } from './enums/userPermissionEnum';
import { UserDetailsComponent } from './components/users/user-details';
import { UserCreationComponent } from './components/users/user-create';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Routes } from './routes';

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
                        component: UserRoleListComponent,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.UserRoles_CanList],
                            breadcrumb: Routes.userRoles.breadcrumbs.list
                        }
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
