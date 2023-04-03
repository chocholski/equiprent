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
            username: authData.Login,
            password: authData.Password,
            // required when signing up with username/password
            grant_type: "password",
            // space-separated list of scopes for which the token is issued
            scope: "offline_access profile email"
        };

        return this.httpClient.post<TokenResponse>(url, data).pipe(
            map(res => {
                let token = res && res.token;
                if (res.code == CustomResponeCode.NotActice) {
                    return "NotActice";
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
        const tokenData = JSON.parse(localStorage.getItem(environment.auth_key_name) || '') as TokenResponse;

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
                    environment.auth_key_name,
                    JSON.stringify(auth));
                this.isLoggedIn$ = of(true);
            }
            else {
                localStorage.removeItem(environment.auth_key_name);
                this.isLoggedIn$ = of(false);
            }
        }
        return true;
    }

    // Retrieves the auth JSON object (or NULL if none)
    getAuth(): TokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            var i = localStorage.getItem(environment.auth_key_name);
            if (i) {
                return JSON.parse(i);
            }
        }
        return null;
    }

    // Returns TRUE if the user is logged in, FALSE otherwise.
    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(environment.auth_key_name) != null;
        }
        return false;
    }

    // refreshToken(): Observable<boolean> {
    //     var url = "api/token/authenticate";
    //     var data = {
    //         client_id: this.clientId,
    //         // required when signing up with username/password
    //         grant_type: "refresh_token",
    //         refresh_token: this.getAuth()!.refresh_token,
    //         // space-separated list of scopes for which the token is issued
    //         scope: "offline_access profile email"
    //     };
    //     return this.getAuthFromServer(url, data);
    // }

    // // retrieve the access & refresh tokens from the server
    // getAuthFromServer(url: string, data: any): Observable<boolean> {
    //     return this.httpClient.post<TokenResponse>(url, data)
    //         .map((res) => {
    //             let token = res && res.token;
    //             // if the token is there, login has been successful
    //             if (token) {
    //                 // store username and jwt token
    //                 this.setAuth(res);
    //                 // successful login
    //                 return true;
    //             }
    //             // failed login
    //             return Observable.throw('Unauthorized');
    //         })
    //         .catch(error => {
    //             return new Observable<any>(error);
    //         });
    // }
}

interface TokenResponse {
    token: string;
    refreshToken: string;
    expiration: number;
    code: number;
}

enum CustomResponeCode {
    NotActice = 165
}