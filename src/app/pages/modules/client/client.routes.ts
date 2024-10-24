import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { ProfileComponent } from './components/profile/profile.component';


export const clientRoutes: Routes = [
    {path: '', component: MovieListComponent},
    {
        path: 'movie/:id', // Asegúrate de que este es el path correcto
        loadComponent: () => import('./components/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent)
     },
     {
      path: 'profile', component: ProfileComponent
   }
];
