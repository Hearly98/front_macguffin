import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '../category/models/category';
import { CommonModule } from '@angular/common';
import { MovieService } from './services/movie.service';
import { CategoryService } from '../category/services/category.service';
import { GetMovie } from './models/get-movie';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GenreService } from '../genres/services/genre.service';
import { GenreModel } from '../genres/models/genre.model';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit{
  movieForm: FormGroup;
  genres = signal<GenreModel[]>([]);
  movies = signal<GetMovie[]>([]);
  selectedMovie?: GetMovie;
  submitted = false;
  isOpenUpdateModal = false;
  isOpenModal = false;
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);
  private genresService = inject(GenreService);
  errorMessage: string | null = null;

  constructor() {
    this.movieForm = this.fb.group({
      idMovie: [0],
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      genre: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.nullValidator]
    });
  }

  ngOnInit() {
    this.loadGenres();
    this.fetchMovies();
  }

  openUpdateModal(movie: GetMovie): void {
    this.isOpenUpdateModal = true;
    this.selectedMovie = movie
    this.movieForm?.patchValue(movie);
  }

  openModal() {
    this.isOpenModal = true;
  }
  closeModal() {
    this.isOpenModal = false;
  }
  closeUpdateModal() {
    this.isOpenUpdateModal = false;
  }

  loadGenres() {
    this.genresService.getGenres().subscribe({
      next: (genres: GenreModel[]) => {
        this.genres.set(genres);
      },
      error: (err: any) => {
        console.error('Error loading géneros:', err);
        this.errorMessage =
          'No se pueden cargar los géneros en este momento';
      },
    });
  }

  fetchMovies() {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies.set(movies);
      },
      error: (err) => {
        this.errorMessage =
          'No se puede cargar las películas en estos momentos';
      },
    });
  }
  loadMovieDetails(id:number):void{
    this.movieService.getMovieById(id).subscribe((movie)=>{
      this.selectedMovie = movie;
    })
  }
  addMovie(): void {
    if(this.movieForm.valid){
      const newMovie = this.movieForm.value;
      this.movieService.create(newMovie).subscribe(
        (response) => {
          this.submitted = true;
          this.fetchMovies();
          this.closeModal();
        },
        (error) => {
          this.errorMessage = 'Error al registrar una Película.';
        }
      );
    }else{
        this.errorMessage = "Por favor completa todos los campos correctamente.";
    }
  }
  updateMovie(): void {
    if(this.movieForm.valid){
       const updateMovie = this.movieForm.value;
       const id = this.movieForm.value
      this.movieService.update(updateMovie, id).subscribe({
        next: (response) => {
          this.submitted = true;
          this.fetchMovies();
          this.closeUpdateModal();
        },
        error: (err) => {
          this.errorMessage = 'Error al actualizar película.';
        },
      });
    }else{
      this.errorMessage = "Por favor completa todos los campos correctamente."
    }
  }
}
