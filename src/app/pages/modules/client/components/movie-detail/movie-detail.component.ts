import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from '@admin/modules/movies/models/movie';
import { MovieService } from '@admin/modules/movies/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
  movie = signal<Movie | null>(null);
  cover = signal('');
  videoUrl = signal<SafeResourceUrl | null>(null); // Cambiar el tipo a SafeResourceUrl
  private movieService = inject(MovieService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = +params['id']; // Convertir a número
      this.loadMovie(movieId);
    });
  }

  private loadMovie(movieId: number) {
    this.movieService.getMovieById(movieId).subscribe({
      next: (movie) => {
        this.movie.set(movie);
        if (movie.poster_url) {
          this.cover.set(movie.poster_url);
        }
       /* if (movie.video_url) {
          // Sanitizar la URL del video
          this.setVideoUrl(movie.video_url);
        }*/
      },
      error: (error) => {
        console.error('Error loading movie:', error);
      }
    });
  }

  private setVideoUrl(url: string) {
    this.videoUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }

  get movieDetails(): Movie | null {
    return this.movie();
  }
}
