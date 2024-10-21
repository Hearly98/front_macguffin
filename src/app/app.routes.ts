import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { AuthGuard } from './auth/services/auth.guard';
import { MovieListComponent } from './pages/modules/client/components/movie-list/movie-list.component';
import { clientRoutes } from './pages/modules/client/client.routes';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegisterComponent},
    {path: 'admin', loadChildren: () => import('@admin/admin.routes').then(m => m.adminRoutes),canActivate: [AuthGuard]},
    { path: 'movies', children: clientRoutes },
];
                                                                                                            