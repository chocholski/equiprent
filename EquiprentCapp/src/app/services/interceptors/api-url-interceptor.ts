import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var apiReq = undefined;
        if (req.url.includes('assets/i18n')) {
            if (location.protocol == 'https:') {
                apiReq = req.clone({ url: `https://${window.location.host}${req.url}` });
            }
            else {
                apiReq = req.clone({ url: `http://${window.location.host}${req.url}` });
            }
        }
        else {
            apiReq = req.clone({ url: `${environment.apiUrl}${req.url}` });
        }
        return next.handle(apiReq);
    }
}