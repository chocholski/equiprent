import { AuthorizationService } from '../authorization/authorization.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTES } from '../../constants/routes.constants';

@Injectable()
export class AuthGuard {

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.getCanActivateResult(false, next);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.getCanActivateResult(true, next);
  }

  private getCanActivateResult(checkForChild: boolean, next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedPermissions = next.data['allowedPermissions'];
    const isAuthorized = this.authorizationService.isAuthorized(allowedPermissions);

    if (!isAuthorized) {
      if (checkForChild)
        this.authorizationService.resetAllData();
      else
        this.authorizationService.decodeTokenAndSetData();

      this.router.navigate([ROUTES.login.navigations.default]);
    }

    this.authorizationService.decodeTokenAndSetData();

    return isAuthorized;
  }
}