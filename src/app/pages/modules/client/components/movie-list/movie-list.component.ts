import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { ImagesService } from '../../../../../shared/services/images.service';
import { Movie } from '@admin/modules/movies/models/movie';
import { MovieClientService } from '../../../../../shared/services/movie-client.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{
  movies: Movie[] = []; // Cambia el tipo a Movie
  constructor(
    private movieClientService: MovieClientService,
    private imagesService: ImagesService
  ) {}
  ngOnInit() {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieClientService.getMovies().subscribe((movies) => {
      this.movies = movies;
      this.loadImagesForMovies();
    });
  }
  private loadImagesForMovies() {
    this.movies.forEach((movie) => {
      this.imagesService.getImages(movie.title).subscribe((data) => {
        if (data.hits && data.hits.length > 0) {
          movie.poster_url = data.hits[0].webformatURL;
        } else {
          movie.poster_url = 'ruta/a/imagen/por/defecto.jpg';
        }
      });
    });
  }
}
