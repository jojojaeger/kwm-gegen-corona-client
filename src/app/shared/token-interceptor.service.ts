import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
// müssen aber nun bei jedem REST-Aufruf unseren Token
// entsprechend im HTTP Header mitgeben, damit der Server diesen überprüfen kann. Dazu
// implementieren wir uns einen HTTP-Interceptor, der diesen Header immer automatisch
// einfügt.
export class TokenInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    //request klonen und zusätzlichen Header setzen
    req = req.clone({
      setHeaders:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    });
    return next.handle(req);
  }

}
