import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenreModel } from './models/genre.model';
import { GetGenreModel } from './models/get-genre.model';
import { GenreService } from './services/genre.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UpdateGenreModel } from './models/update-genre.model';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent {
  genreId: number = 0;
  genreForm: FormGroup;
  selectedGenre?: GetGenreModel;
  updatedGenreData: UpdateGenreModel = new UpdateGenreModel();
  submitted = false;
  isOpenUpdateModal = false;
  isOpenModal = false;
  private fb = inject(FormBuilder);
  private genreService = inject(GenreService);
  errorMessage: string | null = null;
  genres: GetGenreModel[] = []; 
  constructor() {
    this.genreForm = this.fb.group({
      idGenre: [0],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchGenres()
  }

  openUpdateModal(genre: GetGenreModel): void {
    this.isOpenUpdateModal = true;
    this.selectedGenre = genre
    this.genreForm?.patchValue(genre);
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

  fetchGenres() {
    this.genreService.getGenres().subscribe(
      (data: GetGenreModel[]) => {
        this.genres = data; // Actualiza la lista de géneros
      },
      error => {
        console.error('Error al obtener géneros:', error);
      }
    );
  }
  
  //Dependiendo el id mostrará el detalle
  loadGenreDetails(id:number):void{
    this.genreService.getGenreById(id).subscribe((genre)=>{
      this.selectedGenre = genre;
    })
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
    this.genreService.update(this.genreId, this.updatedGenreData).subscribe(
      response => {
        console.log('Género actualizado:', response);
        this.fetchGenres();
      },
      error => {
        console.error('Error al actualizar el género:', error);
      }
    );
  }
  
}
