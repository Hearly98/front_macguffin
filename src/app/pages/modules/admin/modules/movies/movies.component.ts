import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from './services/movie.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GenreService } from '../genres/services/genre.service';
import { GenreModel } from '../genres/models/genre.model';
import { Movie } from './models/movie';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movieForm: FormGroup;
  genres: GenreModel[] = [];
  movies: Movie[] = [];
  selectedMovie?: Movie;
  submitted = false;
  isOpenUpdateModal = false;
  isOpenModal = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private movieService: MovieService, private genresService: GenreService) {
    this.movieForm = this.fb.group({
      movie_id: [null],
      title: [null, Validators.required],
      description: [null, Validators.required],
      release_year: [null, Validators.required],
      genre: this.fb.group({
        genre_id: [null, Validators.required],
      }),
      poster_url: '',
    });
    
  }

  ngOnInit() {
    this.fetchMovies();
  }

  openUpdateModal(movie: Movie): void {
    this.loadGenres();            
    this.selectedMovie = movie;
    this.movieForm.patchValue({
      movie_id: movie.movie_id,
      title: movie.title,
      description: movie.description,
      release_year: movie.release_year,
      genre: { genre_id: movie.genre?.genre_id },
      poster_url: ''
    });                     
    this.isOpenUpdateModal = true;
  }

  openModal() {
    if (!this.isOpenModal) {
      this.isOpenModal = true;
      this.loadGenres(); 
    }
  }

  closeModal() {
    this.isOpenModal = false;
    this.movieForm.reset();
  }

  closeUpdateModal() {
    this.isOpenUpdateModal = false;
    this.movieForm.reset();
  }

  loadGenres() {
      this.genresService.getGenres().subscribe({
        next: (genres) => {
          this.genres = genres;
        },
        error: (err: any) => {
          console.error('Error loading genres:', err);
          this.errorMessage = 'No se pueden cargar los géneros en este momento';
        },
      });
    }

  fetchMovies() {
      this.movieService.getMovies().subscribe({
        next: (movies) => {
          this.movies = movies;
        },
        error: (err) => {
          this.errorMessage = 'No se pueden cargar las películas en estos momentos';
        },
      });
  }

  loadMovieDetails(id: number): void {
    this.movieService.getMovieById(id).subscribe((movie) => {
      this.selectedMovie = movie;
    });
  }

  addMovie(): void {
    if (this.movieForm.valid) {
        const formValue = this.movieForm.value;
        const newMovie: Movie = {
          title: formValue.title,
          description: formValue.description,
          release_year: formValue.release_year,
          genre: {
            genre_id: formValue.genre.genre_id,
            name: formValue.genre.name
          },
          poster_url: formValue.poster_url || '',
          movie_id: 0
        };

        this.movieService.create(newMovie).subscribe(
            (response) => {
                this.submitted = true;
                this.fetchMovies();
                this.closeModal();
                this.movieForm.reset();
            },
            (error) => {
                this.errorMessage = 'Error al registrar una película.';
            }
        );
    } else {
        this.errorMessage = "Por favor completa todos los campos correctamente.";
    }
  }
  updateMovie(): void {
      const updateMovie = this.movieForm.value;
      const id = this.selectedMovie?.movie_id;
      if (id !== undefined) {
        const movieToUpdate: Movie = {
          movie_id: updateMovie.movie_id,
          title: updateMovie.title,
          description: updateMovie.description,
          release_year: updateMovie.release_year,
          genre: { genre_id: updateMovie.genre.genre_id,
            name: updateMovie.genre.name
           },
          poster_url: updateMovie.poster_url || '',
        };
      this.movieService.update(id, movieToUpdate).subscribe(
        (response) => {
          this.submitted = true;
          this.fetchMovies();
          this.closeUpdateModal();
          this.movieForm.reset();
                },
        (err) => {
          this.errorMessage = 'Error al actualizar película.';
        },
      );
    } else {
      this.errorMessage = "Por favor completa todos los campos correctamente.";
    }
  }
}
