import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.dev';
import { UserModel } from '../../../../pages/modules/client/components/profile/models/user.model';
import { SuscriptionModel } from '../models/suscription.model';
import { SubscriptionResponse } from '../models/subscription-response.model';

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {
  url=`${environment.API_SERVICE_ORQUESTADOR}/subscriptions`
  constructor(private http: HttpClient) { }

  suscribeUser(userId: number, body: SuscriptionModel): Observable<any> {
    return this.http.post<any>(`${this.url}/suscribe/${userId}`, body);
  }
  deactivateUser(userId: number, body: UserModel): Observable<any> {
    return this.http.patch<any>(`${this.url}/suscribe/${userId}`, body);
  }
  activateUser(userId: number, body: UserModel): Observable<any> {
    return this.http.patch<any>(`${this.url}/suscribe/${userId}`, body);
  }
  updateUser(userId: number, body: SuscriptionModel): Observable<any> {
    return this.http.put<any>(`${this.url}/suscribe/${userId}`, body);
  }
  hasActiveSubscription(userId: number): Observable<SubscriptionResponse> {
    return this.http.get<SubscriptionResponse>(`${this.url}/${userId}/verifyUserSubscription`);
  }
  
}