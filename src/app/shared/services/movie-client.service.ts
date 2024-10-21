import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { Movie } from '@admin/modules/movies/models/movie';
@Injectable({
  providedIn: 'root'
})
export class MovieClientService {
  constructor(private http:HttpClient) { }
  url=`${environment.API_SERVICE_ORQUESTADOR}/movies`

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.url}`)
  }
  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`);
  }
}
