import { Data, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { UserListComponent } from './components/users/user-list';
import { UserRoleListComponent } from './components/user-roles/user-role-list';
import { LoginComponent } from './components/login/login';
import { LoginResetPasswordComponent } from './components/login/login-reset-password';
import { AuthGuard } from './services/auth-guard.service';
import { UserPermissionEnum } from './enums/userPermissionEnum';
import { UserDetailsComponent } from './components/users/user-details';
import { UserCreationComponent } from './components/users/user-create';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'home', component: AppLayoutComponent,
                data: {
                    breadcrumb: 'General.Dashboard'
                },
                children: [
                    {
                        path: 'users',
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.Users_CanList],
                            breadcrumb: 'User.List'
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
                                path: 'create',
                                component: UserCreationComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Users_CanModify],
                                    breadcrumb: 'User.Create'
                                }
                            },
                            {
                                path: 'edit/:id',
                                component: UserDetailsComponent,
                                canActivate: [AuthGuard],
                                data: <Data>{
                                    allowedPermissions: [UserPermissionEnum.Users_CanList],
                                    breadcrumb: 'User.Edit'
                                }
                            }
                        ]
                    },
                    {
                        path: 'user-roles',
                        component: UserRoleListComponent,
                        canActivate: [AuthGuard],
                        data: <Data>{
                            allowedPermissions: [UserPermissionEnum.UserRoles_CanList],
                            breadcrumb: 'UserRole.List'
                        }
                    }
                ]
            },
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    breadcrumb: null
                }
            },
            {
                path: 'login/reset-password',
                component: LoginResetPasswordComponent,
                data: {
                    breadcrumb: null
                }
            },
            {
                path: '**',
                redirectTo: 'home'
            },
            {
                path: '',
                redirectTo: 'home',
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
