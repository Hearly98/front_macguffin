import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { MoviesComponent } from './modules/movies/movies.component';
import { GenresComponent } from './modules/genres/genres.component';

export const adminRoutes: Routes = [
    {path: '', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
            {path: 'dashboard', component: DashboardComponent},
            {path: 'peliculas', component: MoviesComponent},
            {path: 'generos', component: GenresComponent}
        ]
    },
  
];
