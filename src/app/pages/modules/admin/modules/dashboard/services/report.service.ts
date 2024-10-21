import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  url=`${environment.API_SERVICE_ORQUESTADOR}/reports`
  constructor(private http: HttpClient) { }

  getDashboardDataClient(): Observable<number> {
    return this.http.get<number>(`${this.url}/totalClients`);
  }
  getDashboardDataMovie(): Observable<number> {
    return this.http.get<number>(`${this.url}/totalMovies`);
  }
  getDashboardDataGenre(): Observable<number> {
    return this.http.get<number>(`${this.url}/totalGenres`);
  }
  getDashboardDataInactive(): Observable<number> {
    return this.http.get<number>(`${this.url}/totalInactive`);
  }
  getDashboardDataActive(): Observable<number> {
    return this.http.get<number>(`${this.url}/totalActive`);
  }
}
