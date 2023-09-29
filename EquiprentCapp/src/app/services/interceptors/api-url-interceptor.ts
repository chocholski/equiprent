import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const baseAddress = req.url.includes('assets/i18n')
            ? `${location.protocol === 'https:' ? 'https' : 'http'}://${window.location.host}`
            : environment.apiUrl;

        const apiRequest = req.clone({ url: `${baseAddress}${req.url}` });

        return next.handle(apiRequest);
    }
}