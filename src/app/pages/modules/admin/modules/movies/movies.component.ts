import { Component, OnInit } from '@angular/core';
import { Category } from '../category/models/category';
import { CommonModule } from '@angular/common';
import { MovieService } from './services/movie.service';
import { CategoryService } from '../category/services/category.service';
import { GetMovie } from './models/get-movie';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GenreService } from '../genres/services/genre.service';
import { GenreModel } from '../genres/models/genre.model';
import { Movie } from './models/movie';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'], // Corregido el nombre de la propiedad
})
export class MoviesComponent implements OnInit {
  movieForm: FormGroup;
  genres: GenreModel[] = []; // Cambiado de signal a array normal
  movies: GetMovie[] = []; // Cambiado de signal a array normal
  selectedMovie?: GetMovie;
  submitted = false;
  isOpenUpdateModal = false;
  isOpenModal = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private movieService: MovieService, private genresService: GenreService) {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      idGenre: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.nullValidator]
    });
  }

  ngOnInit() {
    this.fetchMovies();
  }

  openUpdateModal(movie: GetMovie): void {
    this.isOpenUpdateModal = true;
    this.selectedMovie = movie;
    this.movieForm.patchValue(movie);
  }

  openModal() {
    if (!this.isOpenModal) {
      this.isOpenModal = true;
      this.loadGenres();
    }
  }

  closeModal() {
    this.isOpenModal = false;
  }

  closeUpdateModal() {
    this.isOpenUpdateModal = false;
  }

  loadGenres() {
    if (this.genres.length === 0) {
      this.genresService.getGenres().subscribe({
        next: (genres) => {
          this.genres = genres; // Guardar géneros directamente en el array
        },
        error: (err: any) => {
          console.error('Error loading géneros:', err);
          this.errorMessage = 'No se pueden cargar los géneros en este momento';
        },
      });
    }
  }

  fetchMovies() {
    if (this.movies.length === 0) {  // Verificar si ya se cargaron las películas
      this.movieService.getMovies().subscribe({
        next: (movies) => {
          this.movies = movies; // Guardar películas directamente en el array
        },
        error: (err) => {
          this.errorMessage = 'No se pueden cargar las películas en estos momentos';
        },
      });
    }
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
            title: formValue.name,
            description: formValue.description,
            release_year: '',  // Asigna el año de lanzamiento si lo necesitas
            idGenre: formValue.idGenre,  // Asegúrate de que esto sea un ID válido
            poster_url: formValue.image || '',  // O la lógica que estés utilizando
        };

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
    } else {
        this.errorMessage = "Por favor completa todos los campos correctamente.";
    }
}

  
  
  

  updateMovie(): void {
    if (this.movieForm.valid) {
      const updateMovie = this.movieForm.value;
      const id = this.movieForm.value.idMovie; // Asegúrate de obtener el ID correcto
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
    } else {
      this.errorMessage = "Por favor completa todos los campos correctamente.";
    }
  }
}
