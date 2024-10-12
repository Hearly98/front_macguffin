import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '../category/models/category';
import { CommonModule } from '@angular/common';
import { MovieService } from './services/movie.service';
import { CategoryService } from '../category/services/category.service';
import { GetMovie } from './models/get-movie';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit{
  movieForm: FormGroup;
  categories = signal<Category[]>([]);
  movies = signal<GetMovie[]>([]);
  selectedMovie?: GetMovie;
  submitted = false;
  isOpenUpdateModal = false;
  isOpenModal = false;
  private fb = inject(FormBuilder);
  private movieService = inject(MovieService);
  private categoryService = inject(CategoryService);
  errorMessage: string | null = null;

  constructor() {
    this.movieForm = this.fb.group({
      idMovie: [0],
      name: ['', Validators.required],
      descripcion: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.nullValidator]
    });
  }

  ngOnInit() {
    this.loadCategories();
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

  //Cargará los datos para el select de Categorías
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories.set(categories);
      },
      error: (err: any) => {
        console.error('Error loading categories:', err);
        this.errorMessage =
          'No se pueden cargar las categorías en este momento';
      },
    });
  }
  //Cargará las películas al momento de cargar la páginas
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
  //Dependiendo el id mostrará el detalle
  loadMovieDetails(id:number):void{
    this.movieService.getMovieById(id).subscribe((movie)=>{
      this.selectedMovie = movie;
    })
  }
  addMovie(): void {
    if(this.movieForm.valid){
      //validamos que todos los datos se hayan colocado correctamente
      const newMovie = this.movieForm.value;
      this.movieService.create(newMovie).subscribe(
        (response) => {
          this.submitted = true;
          this.fetchMovies();
          this.closeModal();
        },
        (error) => {
          this.errorMessage = 'Error al registrar un Producto.';
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
          console.error('Error al actualizar película:', err);
          this.errorMessage = 'Error al actualizar película.';
        },
      });
    }else{
      this.errorMessage = "Por favor completa todos los campos correctamente."
    }
  }
}
