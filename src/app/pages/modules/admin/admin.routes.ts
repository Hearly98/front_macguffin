import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { SalesComponent } from './modules/sales/sales.component';

export const adminRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'ventas', component: SalesComponent}
];
