import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authorizationService: AuthorizationService){
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedPermissions = next.data['allowedPermissions'];
    const isAuthorized = this.authorizationService.isAuthorized(allowedPermissions);
    if (!isAuthorized) {
      this.authorizationService.decodeTokenAndSetData();
      this.router.navigate(['login']);
    }
    this.authorizationService.decodeTokenAndSetData();
    return isAuthorized;
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const allowedPermissions = next.data['allowedPermissions'];
    const isAuthorized = this.authorizationService.isAuthorized(allowedPermissions);
  
    if (!isAuthorized) {
      this.authorizationService.resetAllData();
      this.router.navigate(['login']);
    }
    this.authorizationService.decodeTokenAndSetData();
    return isAuthorized
  }
}