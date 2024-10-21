import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment.dev';
import { GenreModel } from '../models/genre.model';
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(private http:HttpClient) { }
  url=`${environment.API_SERVICE_ORQUESTADOR}/genres`

  getGenres():Observable<GenreModel[]>{
    return this.http.get<GenreModel[]>(`${this.url}`)
  }
  getGenreById(id: number): Observable<GenreModel> {
    return this.http.get<GenreModel>(`${this.url}/${id}`);
  }

  create(data: GenreModel): Observable<GenreModel> {
    return this.http.post<GenreModel>(`${this.url}/create`, data);
  }

  update(id:number, data: GenreModel): Observable<GenreModel> {
    return this.http.put<GenreModel>(`${this.url}/update/${id}`, data);
  }
}
