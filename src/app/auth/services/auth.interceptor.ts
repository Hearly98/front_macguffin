import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private router: Router) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) { // Si el token es inválido o caducado
                    localStorage.removeItem('token'); // Eliminar el token
                    this.router.navigate(['/login']); // Redirigir a la página de login
                }
                return throwError(() => err); // Volver a lanzar el error
            })
        );
    }
}
