import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonModule } from '@angular/common';
import { ImagesService } from '../../../../../shared/services/images.service';
import { Movie } from '@admin/modules/movies/models/movie';
import { MovieClientService } from '../../../../../shared/services/movie-client.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponentMovie } from '../navbar/navbar.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent, CommonModule, RouterOutlet, NavbarComponentMovie],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit{
  movies: Movie[] = [];
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
    });
  }
}
