import {HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export function addAuthToken(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);

  if (localStorage.getItem('token') !== null) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return next(authReq);
  }

  return next(req);
}
