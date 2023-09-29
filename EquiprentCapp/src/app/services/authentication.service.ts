import { AuthorizationService } from './authorization.service';
import { SignInModel } from '../interfaces/authentication';
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";
import { TokenResponse } from '../interfaces/identity';

@Injectable()
export class AuthenticationService {

    isLoggedIn$: Observable<boolean>;

    constructor(
        private authorizationService: AuthorizationService,
        private httpClient: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any) {
    }

    getAuth(): TokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            const key = localStorage.getItem(environment.auth_key);

            if (key) {
                return JSON.parse(key);
            }
        }

        return null;
    }

    isLoggedIn(): boolean {
        return isPlatformBrowser(this.platformId) && localStorage.getItem(environment.auth_key) != null;
    }

    // performs the login
    login(authData: SignInModel): Observable<string> {
        const url = "identity/authenticate";
        const data = {
            UserName: authData.Login,
            Password: authData.Password,
            // required when signing up with username/password
            GrantType: "password",
            // space-separated list of scopes for which the token is issued
            Scope: "offline_access profile email"
        };

        return this.httpClient
            .post<TokenResponse>(url, data)
            .pipe(
                map(res => {
                    const token = res && res.Token;

                    if (res.Code == 165) {
                        return "NotActive";
                    }
                    else if (res.Code !== 200) {
                        return "Error";
                    }

                    if (token) {
                        // store username and jwt token
                        this.setAuth(res);
                        this.authorizationService.decodeTokenAndSetData();

                        return "OK";
                    }

                    return "Error";
                }),
                catchError(error => {
                    console.log(error);
                    return new Observable<any>(error);
                }));
    }

    logout() {
        this.setAuth(null);
        this.authorizationService.resetAllData();

        return true;
    }

    refreshToken(): Observable<string> {
        const url = "identity/refreshToken";
        const tokenData = JSON.parse(localStorage.getItem(environment.auth_key) || '') as TokenResponse;

        const data = {
            Token: tokenData.Token,
            RefreshToken: tokenData.RefreshToken
        };

        return this.httpClient
            .post<TokenResponse>(url, data)
            .pipe(
                map(res => {
                    this.setAuth(res);
                    this.authorizationService.decodeTokenAndSetData();

                    return "OK";
                }),
                catchError(error => {
                    console.log(error);

                    return new Observable<any>(error);
                }));
    }

    setAuth(auth: TokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(environment.auth_key, JSON.stringify(auth));

                this.isLoggedIn$ = of(true);
            }
            else {
                localStorage.removeItem(environment.auth_key);

                this.isLoggedIn$ = of(false);
            }
        }

        return true;
    }
}