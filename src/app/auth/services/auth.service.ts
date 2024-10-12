import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment.dev';
import { LoginRequest } from '../models/login';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from './localStorage.service';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   apiUrl = enviroment.API_SERVICE_AUTH;
    public jwtHelperService: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }
  
  isAuthenticated() {
    const token = localStorage.getItem("token");
    return token && !this.jwtHelperService.isTokenExpired(token);
}

getDecodedToken() {
  const token = this.localStorageService.getItem("token");
  if (token) {
      return this.jwtHelperService.decodeToken(token);
  }
  return null;
}

  login(loginData: LoginRequest): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, loginData, {responseType: "text"})
  }
  register(loginData: LoginRequest): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, loginData)
  }

  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido!';
    if (error.error instanceof ErrorEvent) {
        errorMessage = `Error de red: ${error.error.message}`;
    } else if (error.status === 200 && error.message.includes('parsing')) {
        errorMessage = 'El formato de la respuesta no es válido o el Content-Type es incorrecto.';
    } else {
        errorMessage = `El servidor devolvió el código ${error.status}, mensaje de error es: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
}

  }
