import { AuthorizationService } from './authorization.service';
import { SignInModel } from '../interfaces/authentication';
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";

@Injectable()
export class AuthenticationService {

    isLoggedIn$: Observable<boolean>

    constructor(private authorizationService: AuthorizationService, private httpClient: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any) {
    }

    // performs the login
    login(authData: SignInModel): Observable<string> {
        var url = "token/authenticate";
        var data = {
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
                    const token = res && res.token;
                    if (res.code == CustomResponeCode.NotActive) {
                        return "NotActive";
                    }
                    else if (res.code != 200) {
                        return "Error";
                    }

                    // if the token is there, login has been successful
                    if (token) {
                        // store username and jwt token
                        this.setAuth(res);
                        this.authorizationService.decodeTokenAndSetData();
                        // successful login
                        return "OK";
                    }
                    return "Error";
                    // failed login
                }),
                catchError(error => {
                    console.log(error);
                    return new Observable<any>(error);
                }));
    }

    // performs the logout
    logout(): boolean {
        this.setAuth(null);
        this.authorizationService.resetAllData();
        return true;
    }

    refreshToken(): Observable<string> {
        var url = "token/refreshToken";
        const tokenData = JSON.parse(localStorage.getItem(environment.auth_key) || '') as TokenResponse;

        var data = {
            Token: tokenData.token,
            RefreshToken: tokenData.refreshToken
        };

        return this.httpClient.post<TokenResponse>(url, data).pipe(
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

    // Persist auth into localStorage or removes it if a NULL argument is given
    setAuth(auth: TokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(
                    environment.auth_key,
                    JSON.stringify(auth));
                this.isLoggedIn$ = of(true);
            }
            else {
                localStorage.removeItem(environment.auth_key);
                this.isLoggedIn$ = of(false);
            }
        }
        return true;
    }

    // Retrieves the auth JSON object (or NULL if none)
    getAuth(): TokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            var key = localStorage.getItem(environment.auth_key);

            if (key) {
                return JSON.parse(key);
            }
        }
        return null;
    }

    // Returns TRUE if the user is logged in, FALSE otherwise.
    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(environment.auth_key) != null;
        }
        return false;
    }
}

interface TokenResponse {
    token: string;
    refreshToken: string;
    expiration: number;
    code: number;
}

enum CustomResponeCode {
    NotActive = 165
}