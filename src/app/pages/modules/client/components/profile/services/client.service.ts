import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileModel } from '../models/client.model';
import { environment } from '../../../../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.API_SERVICE_ORQUESTADOR}/users`;

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(`${this.apiUrl}/${username}`);
  }
}
