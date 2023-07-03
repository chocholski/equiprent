import { Injectable, Injector } from "@angular/core";
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { AuthenticationService } from "../authentication.service";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean;

    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var auth = this.injector.get(AuthenticationService);

        var token = (auth.isLoggedIn())
            ? auth.getAuth()!.token
            : null;

        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401 && !this.isRefreshingToken) {
                    this.isRefreshingToken = true;

                    console.log("refreshing token...");

                    auth.refreshToken().subscribe(result => {
                        console.log(`token refreshed with result: ${result}`);

                        this.isRefreshingToken = false;

                        if (result == "OK") {
                            window.location.reload();

                            return tap(() => "OK");
                        }
                        else {
                            console.error(error);

                            return throwError(error.message);
                        }
                    });
                }

                console.error(error);

                return throwError(error.message);
            })
        );
    }
}