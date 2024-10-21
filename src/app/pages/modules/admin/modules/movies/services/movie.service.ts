import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http:HttpClient) { }
  url=`${environment.API_SERVICE_ORQUESTADOR}/movies`

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.url}`)
  }
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`);
  }

  create(data: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.url}/create`, data);
  }

  update(id: number,data: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.url}/update/${id}`, data);
  }
}
