import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenreModel } from './models/genre.model';
import { GenreService } from './services/genre.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent {
  genreForm: FormGroup;
  selectedGenre: number = 0;
  updatedGenreData: GenreModel = new GenreModel();
  submitted = false;
  isOpenUpdateModal = false;
  isOpenModal = false;
  private fb = inject(FormBuilder);
  private genreService = inject(GenreService);
  errorMessage: string | null = null;
  genres: GenreModel[] = []; 
  constructor() {
    this.genreForm = this.fb.group({
      idGenre: [null],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchGenres()
  }

  openUpdateModal(genre: GenreModel): void {
    this.isOpenUpdateModal = true;
    this.selectedGenre = genre.idGenre
    this.genreForm.patchValue({
      idGenre: genre.idGenre,
      name: genre.name
    });
  }

  openModal() {
    this.isOpenModal = true;
  }
  closeModal() {
    this.isOpenModal = false;
    this.genreForm.reset();
    this.errorMessage = null;
  }
  closeUpdateModal() {
    this.isOpenUpdateModal = false;
    this.genreForm.reset();
    this.errorMessage = null;
  }

  fetchGenres() {
    this.genreService.getGenres().subscribe(
      (data: GenreModel[]) => {
        this.genres = data; // Actualiza la lista de géneros
      },
      error => {
        console.error('Error al obtener géneros:', error);
      }
    );
  }
  
  addGenre(): void {
    if(this.genreForm.valid){
      //validamos que todos los datos se hayan colocado correctamente
      const newGenre = this.genreForm.value;
      this.genreService.create(newGenre).subscribe(
        (response) => {
          console.log(response)
          this.submitted = true;
          this.fetchGenres();
          this.closeModal();
        },
        (error) => {
          console.log(error)
          this.errorMessage = 'Error al registrar un Género.';
        }
      );
    }else{
        this.errorMessage = "Por favor completa todos los campos correctamente.";
    }
  }
  updateGenre(): void {
    const updatedGenre: GenreModel = this.genreForm.value;
    this.genreService.update(this.selectedGenre, updatedGenre).subscribe(
      response => {
        console.log('Género actualizado:', response);
        this.fetchGenres();
        this.closeUpdateModal();
      },
      error => {
        console.error('Error al actualizar el género:', error);
      }
    );
  }
}
