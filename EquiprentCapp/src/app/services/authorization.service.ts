import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private static _currentUserId?: string;
  private static _currentUserName?: string;
  private static _currentUserLanguageId?: number;
  private static _currentUserRoleId?: number;
  private static _currentUserRoleName?: string;
  private static _currentUserPermissions?: number[];
  private static _currentUserRoles?: string[];

  //property let to use static properties.
  AS = AuthorizationService;

  public static get currentUserId(): string | undefined {
    return this._currentUserId;
  }

  public static get currentUserName(): string | undefined {
    return this._currentUserName;
  }

  public static get currentUserRoles(): string[] | undefined {
    return this._currentUserRoles;
  }

  public static get currentUserLanguageId(): number | undefined {
    return this._currentUserLanguageId;
  }

  public static get currentUserRoleId(): number | undefined {
    return this._currentUserRoleId;
  }

  public static get currentUserRoleName(): string | undefined {
    return this._currentUserRoleName;
  }

  public static get currentUserPermissions(): number[] | undefined {
    return this._currentUserPermissions;
  }

  constructor(private jwtHelperService: JwtHelperService) {
  }

  isAuthorized(allowedPermissions: number[]): boolean {
    // check if the list of allowed permissions is empty, if empty, authorize the user to access the page
    if (allowedPermissions == null || allowedPermissions.length === 0) {
      return true;
    }
    const decodedToken = this.decodeToken();
    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodedToken) {
      console.log('Invalid token');
      return false;
    }
    // check if the user roles is in the list of allowed permissions, return true if allowed and false if not allowed
    var permissions: number[] = [];
    var permissionsStr = (decodedToken['permissions'] as string).split(',');

    permissionsStr.forEach(str => {
      permissions.push(Number(str))
    });

    return allowedPermissions.some(r => permissions.includes(r));
  }

  decodeToken() {
    const token = localStorage.getItem(environment.auth_key_name);
    return this.jwtHelperService.decodeToken(token || '');
  }

  decodeTokenAndSetData() {
    const decodedToken = this.decodeToken();
    if (decodedToken) {
      AuthorizationService._currentUserId = decodedToken['sub'];
      AuthorizationService._currentUserName = decodedToken['given_name'];
      AuthorizationService._currentUserLanguageId = decodedToken['userlanguageid'];
      AuthorizationService._currentUserRoleId = decodedToken['userroleid'];
      AuthorizationService._currentUserRoleName = decodedToken['userrolename'];
      AuthorizationService._currentUserRoles = decodedToken['role'];
      AuthorizationService._currentUserPermissions = [];
      var currentUserPermissionsStr = (decodedToken['permissions'] as string).split(',');
      currentUserPermissionsStr.forEach(str => {
        AuthorizationService._currentUserPermissions?.push(Number(str))
      });
    }
    else {
      this.resetAllData();
    }
  }

  resetAllData() {
    AuthorizationService._currentUserId = undefined;
    AuthorizationService._currentUserName = undefined;
    AuthorizationService._currentUserLanguageId = undefined;
    AuthorizationService._currentUserRoleId = undefined;
    AuthorizationService._currentUserRoleName = undefined;
    AuthorizationService._currentUserRoles = undefined;
    AuthorizationService._currentUserPermissions = undefined;
  }
}
