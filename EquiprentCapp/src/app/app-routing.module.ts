import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';
import { UserListComponent } from './components/users/user-list';
import { UserRoleListComponent } from './components/user-roles/user-role-list';
import { LoginComponent } from './components/login/login';
import { LoginResetPasswordComponent } from './components/login/login-reset-password';
import { AuthGuard } from './services/auth-guard.service';
import { UserPermissionEnum } from './enums/userPermissionEnum';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'home', component: AppLayoutComponent,
                children: [
                    { path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: { allowedPermissions: [UserPermissionEnum.Users_CanList] } },
                    { path: 'administration/user-roles', component: UserRoleListComponent, canActivate: [AuthGuard], data: { allowedPermissions: [UserPermissionEnum.UserRoles_CanList] } }
                ]
            },
            { path: 'login', component: LoginComponent },
            { path: 'login/reset-password', component: LoginResetPasswordComponent },
            { path: '**', redirectTo: 'home' },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
