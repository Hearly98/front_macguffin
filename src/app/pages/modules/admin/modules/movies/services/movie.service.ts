import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { GetMovie } from '../models/get-movie';
import { UpdateMovie } from '../models/update-movie';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment.dev';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http:HttpClient) { }
  url=`${environment.API_SERVICE_MOVIE}/movies`

  getMovies():Observable<GetMovie[]>{
    return this.http.get<GetMovie[]>(`${this.url}/list`)
  }
  getMovieById(id: number): Observable<GetMovie> {
    return this.http.get<GetMovie>(`${this.url}/${id}`);
  }

  create(data: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.url}/create`, data);
  }

  update(id: number,data: GetMovie): Observable<UpdateMovie> {
    return this.http.put<UpdateMovie>(`${this.url}/${id}`, data);
  }
}
