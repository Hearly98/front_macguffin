import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment.dev';
import { LoginRequest } from '../models/login';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   apiUrl = enviroment.API_SERVICE_AUTH;

  constructor(private http: HttpClient) { }
  
 
  login(loginData: LoginRequest): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, loginData)
  }
  register(loginData: LoginRequest): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, loginData)
  }

  
private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Ocurrió un error desconocido!';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error de red: ${error.error.message}`;
  } else {
    errorMessage = `El servidor devolvió el código ${error.status}, mensaje de error es: ${error.message}`;
  }
  console.error(errorMessage);
  return throwError(() => new Error(errorMessage));
}
  }
