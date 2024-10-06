import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'admin', loadChildren: () => import('@admin/admin.routes').then(m => m.adminRoutes)}
];
