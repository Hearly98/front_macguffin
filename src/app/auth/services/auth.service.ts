import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { LoginRequest } from '../models/login';
import { catchError, map, Observable, throwError } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { LoginResponse } from '../models/login-response';
import { RegisterModel } from '../models/register';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   apiUrl = environment.API_SERVICE_ORQUESTADOR;
   username = `${environment.API_SERVICE_ORQUESTADOR}/users`
    public jwtHelperService: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient,
  ) { }
  
  isAuthenticated() {
    if (typeof localStorage === 'undefined') {
      return false;
  }
  const token = localStorage.getItem('token');
  return token !== null;
}
  
login(loginData: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData, {responseType: 'json'}).pipe(
    map(response => {
      // La respuesta ya debería ser un objeto JSON
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        return response;
      }
      throw new Error('Respuesta no válida del servidor');
    }),
    catchError(this.handleError)
  );

  
}


// Método para obtener los datos de un usuario por username
getUserByUsername(username: string): Observable<any> {
  const url = `${this.username}/${username}`; // URL de la API para obtener usuario por username
  return this.http.get<any>(url);
}


register(loginData: RegisterModel): Observable<any>{
  return this.http.post(`${this.apiUrl}/register`, loginData)
}


private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Ocurrió un error desconocido!';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error de red: ${error.error.message}`;
  } else {
    errorMessage = `El servidor devolvió el código ${error.status}, mensaje de error es: ${error.message}, cuerpo: ${error.error}`;
  }
  return throwError(() => new Error(errorMessage));
}

  }
