import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment.dev';
import { GetGenreModel } from '../models/get-genre.model';
import { GenreModel } from '../models/genre.model';
import { UpdateGenreModel } from '../models/update-genre.model';
import { CreateGenreModel } from '../models/create-genre.model';
@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(private http:HttpClient) { }
  url=`${environment.API_SERVICE_MOVIE}/genres`

  getGenres():Observable<GetGenreModel[]>{
    return this.http.get<GetGenreModel[]>(`${this.url}/list`)
  }
  getGenreById(id: number): Observable<GetGenreModel> {
    return this.http.get<GetGenreModel>(`${this.url}/${id}`);
  }

  create(data: GenreModel): Observable<CreateGenreModel> {
    return this.http.post<CreateGenreModel>(`${this.url}/create`, data);
  }

  update(id: number,data: UpdateGenreModel): Observable<UpdateGenreModel> {
    return this.http.put<UpdateGenreModel>(`${this.url}/update/${id}`, data);
  }
}
