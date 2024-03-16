import { Injectable, Injector } from "@angular/core";
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "../authentication/authentication.service";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ApiResultEnum } from "src/app/enums/api-result.enum";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean;

    constructor(private readonly injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authenticationService = this.injector.get(AuthenticationService);

        const token = (authenticationService.isLoggedIn())
            ? authenticationService.getAuth()!.Token
            : null;

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    ApiKey: '5f97f178-1fb8-4a24-a71c-0b145a3709c4'
                }
            });
        }

        return next.handle(request).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                if (errorResponse.status === 401 && !this.isRefreshingToken) {
                    this.isRefreshingToken = true;

                    console.log("refreshing token...");

                    authenticationService.refreshToken().subscribe(result => {
                        console.log(`token refreshed with result: ${result}`);

                        if (result === ApiResultEnum[ApiResultEnum.OK]) {
                            this.isRefreshingToken = false;

                            window.location.reload();

                            return tap(() => ApiResultEnum[ApiResultEnum.OK]);
                        }
                        else {
                            console.error(errorResponse);

                            return throwError(() => errorResponse.error);
                        }
                    });
                }

                console.error(errorResponse);

                return throwError(() => errorResponse.error);
            })
        );
    }
}